import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { TbGift, TbHeart, TbSparkles, TbStar } from "react-icons/tb";
import { IoAdd, IoTrash } from "react-icons/io5";

function WishList() {
  const { user } = useAuth();
  const [selectedPerson, setSelectedPerson] = useState("");
  const [wishlistItems, setWishlistItems] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPersonModal, setShowPersonModal] = useState(false);
  const [newItem, setNewItem] = useState({
    item_name: '',
    priority: 'medium',
    icon: 'TbGift'
  });
  const [newPerson, setNewPerson] = useState('');

  useEffect(() => {
    if (user) {
      fetchWishlistItems();
    }
  }, [user]);

  useEffect(() => {
    // Get unique people from wishlist items
    const uniquePeople = [...new Set(wishlistItems.map(item => item.person_name))];
    setPeople(uniquePeople);

    // Set first person as selected if not already set
    if (!selectedPerson && uniquePeople.length > 0) {
      setSelectedPerson(uniquePeople[0]);
    }
  }, [wishlistItems]);

  const fetchWishlistItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('wishlist_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWishlistItems(data || []);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.item_name.trim() || !selectedPerson) return;

    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .insert([
          {
            user_id: user.id,
            person_name: selectedPerson,
            item_name: newItem.item_name,
            priority: newItem.priority,
            icon: newItem.icon,
            completed: false,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setWishlistItems([data, ...wishlistItems]);
      setNewItem({ item_name: '', priority: 'medium', icon: 'TbGift' });
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error adding wishlist item:', error);
      alert('Failed to add item. Please try again.');
    }
  };

  const handleAddPerson = async (e) => {
    e.preventDefault();
    if (!newPerson.trim()) return;

    setSelectedPerson(newPerson);
    setNewPerson('');
    setShowPersonModal(false);
  };

  const handleToggleComplete = async (itemId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('wishlist_items')
        .update({ completed: !currentStatus })
        .eq('id', itemId);

      if (error) throw error;

      setWishlistItems(wishlistItems.map(item =>
        item.id === itemId ? { ...item, completed: !currentStatus } : item
      ));
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item. Please try again.');
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  const currentWishList = wishlistItems.filter(item => item.person_name === selectedPerson);

  const priorityStyles = {
    high: {
      border: "border-[#C9A961]",
      badge: "bg-[#C9A961] text-[#1A1625]"
    },
    medium: {
      border: "border-[#DBA39A]",
      badge: "bg-[#DBA39A] text-[#1A1625]"
    },
    low: {
      border: "border-[#9BA3D4]",
      badge: "bg-[#9BA3D4] text-[#1A1625]"
    },
  };

  const iconComponents = {
    TbGift,
    TbHeart,
    TbSparkles,
    TbStar,
  };

  const iconOptions = [
    { name: 'Gift', value: 'TbGift' },
    { name: 'Heart', value: 'TbHeart' },
    { name: 'Sparkles', value: 'TbSparkles' },
    { name: 'Star', value: 'TbStar' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1625] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#C9A961] border-t-transparent"></div>
          <p className="text-[#B8B8C8] mt-4">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1625] p-6 pb-24 flex flex-col gap-5">
      <h1 className="text-3xl font-semibold text-[#C9A961] text-center">
        WishList
      </h1>

      {/* Person Selector */}
      <div className="flex gap-3 justify-center flex-wrap">
        {people.map((person) => (
          <button
            key={person}
            onClick={() => setSelectedPerson(person)}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              selectedPerson === person
                ? "bg-gradient-to-r from-[#DBA39A] to-[#C9A961] text-[#1A1625] shadow-lg scale-105"
                : "bg-[#252235] text-[#C9A961] border-2 border-[#C9A961]/30 hover:border-[#C9A961]"
            }`}
          >
            {person}
          </button>
        ))}
        <button
          onClick={() => setShowPersonModal(true)}
          className="px-6 py-3 rounded-xl font-bold transition-all duration-300 bg-[#252235] text-[#C9A961] border-2 border-[#C9A961]/30 hover:border-[#C9A961] flex items-center gap-2"
        >
          <IoAdd size={20} />
          Add Person
        </button>
      </div>

      {/* Add Wish Button */}
      {selectedPerson && (
        <button
          onClick={() => setShowCreateModal(true)}
          className="rounded-xl px-6 py-3 text-md font-bold text-[#1A1625] bg-gradient-to-r from-[#DBA39A] to-[#C9A961] hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-[#DBA39A]/30 flex items-center justify-center gap-2"
        >
          <TbGift size={24} />
          Add New Wish
        </button>
      )}

      {/* Wish List Items */}
      {selectedPerson ? (
        <div className="flex flex-col gap-4">
          {currentWishList.length > 0 ? (
            currentWishList.map((wish) => {
              const Icon = iconComponents[wish.icon] || TbGift;
              const styles = priorityStyles[wish.priority];
              return (
                <div
                  key={wish.id}
                  className={`bg-[#252235] rounded-xl p-5 border-2 ${styles.border} shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                    wish.completed ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`p-2 rounded-lg ${styles.badge}`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`text-[#F8F6F1] text-lg font-medium ${
                            wish.completed ? "line-through" : ""
                          }`}
                        >
                          {wish.item_name}
                        </h3>
                        <span className={`text-xs ${styles.badge} px-2 py-1 rounded-full capitalize font-medium mt-1 inline-block`}>
                          {wish.priority} priority
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={wish.completed}
                        onChange={() => handleToggleComplete(wish.id, wish.completed)}
                        className="w-5 h-5 rounded accent-[#C9A961] cursor-pointer"
                      />
                      <button
                        onClick={() => handleDeleteItem(wish.id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-2"
                      >
                        <IoTrash size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-[#252235] rounded-xl border-2 border-dashed border-[#C9A961]/20">
              <TbGift size={48} className="mx-auto mb-3 text-[#C9A961] opacity-40" />
              <p className="text-[#B8B8C8] mb-2">No wishes yet for {selectedPerson}</p>
              <p className="text-sm text-[#B8B8C8]/70">Add your first wish using the button above</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#252235] rounded-xl border-2 border-dashed border-[#C9A961]/20">
          <TbGift size={48} className="mx-auto mb-3 text-[#C9A961] opacity-40" />
          <p className="text-[#B8B8C8] mb-2">No people added yet</p>
          <p className="text-sm text-[#B8B8C8]/70">Add a person to start creating wishlist items</p>
        </div>
      )}

      {/* Stats */}
      {selectedPerson && currentWishList.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-[#252235] rounded-xl p-4 border-2 border-[#C9A961]/20 text-center">
            <div className="text-3xl font-bold text-[#C9A961]">
              {currentWishList.filter((w) => !w.completed).length}
            </div>
            <div className="text-sm text-[#B8B8C8]">Pending</div>
          </div>
          <div className="bg-[#252235] rounded-xl p-4 border-2 border-[#C9A961]/20 text-center">
            <div className="text-3xl font-bold text-[#C9A961]">
              {currentWishList.filter((w) => w.completed).length}
            </div>
            <div className="text-sm text-[#B8B8C8]">Completed</div>
          </div>
        </div>
      )}

      {/* Create Wish Item Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-[#252235] rounded-2xl p-6 w-full max-w-md border-2 border-[#C9A961]/20 shadow-2xl">
            <h2 className="text-xl font-semibold text-[#C9A961] mb-4">Add New Wish</h2>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-[#F8F6F1] text-sm font-medium mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  value={newItem.item_name}
                  onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
                  className="w-full bg-[#1A1625] border-2 border-[#C9A961]/30 rounded-xl px-4 py-3 text-[#F8F6F1] placeholder-[#B8B8C8] focus:border-[#C9A961] focus:outline-none transition-all"
                  placeholder="e.g., Gaming Console"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[#F8F6F1] text-sm font-medium mb-2">
                  Person
                </label>
                <div className="text-[#C9A961] bg-[#1A1625] border-2 border-[#C9A961]/30 rounded-xl px-4 py-3">
                  {selectedPerson}
                </div>
              </div>

              <div>
                <label className="block text-[#F8F6F1] text-sm font-medium mb-2">
                  Priority
                </label>
                <div className="flex gap-2">
                  {['high', 'medium', 'low'].map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => setNewItem({ ...newItem, priority })}
                      className={`flex-1 px-4 py-2 rounded-lg capitalize font-medium transition-all ${
                        newItem.priority === priority
                          ? `${priorityStyles[priority].badge} ring-2 ring-[#F8F6F1] ring-offset-2 ring-offset-[#252235]`
                          : 'bg-[#1A1625] text-[#B8B8C8] border-2 border-[#B8B8C8]/30'
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#F8F6F1] text-sm font-medium mb-2">
                  Icon
                </label>
                <div className="flex gap-2">
                  {iconOptions.map((icon) => {
                    const IconComponent = iconComponents[icon.value];
                    return (
                      <button
                        key={icon.value}
                        type="button"
                        onClick={() => setNewItem({ ...newItem, icon: icon.value })}
                        className={`flex-1 p-3 rounded-lg transition-all ${
                          newItem.icon === icon.value
                            ? 'bg-[#C9A961] text-[#1A1625] ring-2 ring-[#F8F6F1] ring-offset-2 ring-offset-[#252235]'
                            : 'bg-[#1A1625] text-[#B8B8C8] border-2 border-[#B8B8C8]/30 hover:border-[#C9A961]'
                        }`}
                      >
                        <IconComponent size={24} className="mx-auto" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewItem({ item_name: '', priority: 'medium', icon: 'TbGift' });
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#1A1625] text-[#B8B8C8] border-2 border-[#B8B8C8]/30 font-semibold hover:border-[#B8B8C8] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#DBA39A] to-[#C9A961] text-[#1A1625] font-bold hover:shadow-lg transition-all"
                >
                  Add Wish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Person Modal */}
      {showPersonModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-[#252235] rounded-2xl p-6 w-full max-w-md border-2 border-[#C9A961]/20 shadow-2xl">
            <h2 className="text-xl font-semibold text-[#C9A961] mb-4">Add New Person</h2>
            <form onSubmit={handleAddPerson} className="space-y-4">
              <div>
                <label className="block text-[#F8F6F1] text-sm font-medium mb-2">
                  Person Name
                </label>
                <input
                  type="text"
                  value={newPerson}
                  onChange={(e) => setNewPerson(e.target.value)}
                  className="w-full bg-[#1A1625] border-2 border-[#C9A961]/30 rounded-xl px-4 py-3 text-[#F8F6F1] placeholder-[#B8B8C8] focus:border-[#C9A961] focus:outline-none transition-all"
                  placeholder="e.g., John"
                  required
                  autoFocus
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPersonModal(false);
                    setNewPerson('');
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#1A1625] text-[#B8B8C8] border-2 border-[#B8B8C8]/30 font-semibold hover:border-[#B8B8C8] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#DBA39A] to-[#C9A961] text-[#1A1625] font-bold hover:shadow-lg transition-all"
                >
                  Add Person
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default WishList;
