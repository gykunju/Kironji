import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { IoAdd, IoTrash, IoImages } from "react-icons/io5";
import '../App.css';

function Memories() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newMemory, setNewMemory] = useState({ title: '' });

  useEffect(() => {
    if (user) {
      fetchMemories();
    }
  }, [user]);

  const fetchMemories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedMemories = data.map(memory => ({
        id: memory.id,
        thumbnail: memory.thumbnail_url || `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/400/400`,
        title: memory.title,
        date: new Date(memory.created_at),
      }));

      setMemories(formattedMemories);
    } catch (error) {
      console.error('Error fetching memories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMemory = async (e) => {
    e.preventDefault();
    if (!newMemory.title.trim()) return;

    try {
      // Generate a random thumbnail for demo purposes
      const thumbnailUrl = `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/400/400`;

      const { data, error } = await supabase
        .from('memories')
        .insert([
          {
            user_id: user.id,
            title: newMemory.title,
            thumbnail_url: thumbnailUrl,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      const formattedMemory = {
        id: data.id,
        thumbnail: data.thumbnail_url,
        title: data.title,
        date: new Date(data.created_at),
      };

      setMemories([formattedMemory, ...memories]);
      setNewMemory({ title: '' });
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error adding memory:', error);
      alert('Failed to add memory. Please try again.');
    }
  };

  const handleDeleteMemory = async (memoryId) => {
    if (!confirm('Are you sure you want to delete this memory?')) return;

    try {
      const { error } = await supabase
        .from('memories')
        .delete()
        .eq('id', memoryId);

      if (error) throw error;

      setMemories(memories.filter(m => m.id !== memoryId));
    } catch (error) {
      console.error('Error deleting memory:', error);
      alert('Failed to delete memory. Please try again.');
    }
  };

  const filteredMemories = memories.filter((mem) =>
    mem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col pb-24 p-6 gap-3 bg-[#1A1625]">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-2xl font-semibold text-[#C9A961] text-center">
          Memories
        </h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="ml-4 text-md absolute right-4 px-4 py-2 rounded-xl bg-gradient-to-r from-[#DBA39A] to-[#C9A961] text-[#1A1625] font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-[#DBA39A]/30 flex items-center gap-2"
        >
          <IoAdd size={20} />
          Add
        </button>
      </div>

      <div className="w-full mb-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-2 border-[#C9A961]/30 rounded-xl p-3 text-lg focus:border-[#C9A961] focus:ring-2 focus:ring-[#C9A961]/20 outline-none bg-[#252235] text-[#F8F6F1] placeholder-[#B8B8C8] transition-all"
          placeholder="🔍 Search Memory"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#C9A961] border-t-transparent"></div>
          <p className="text-[#B8B8C8] mt-4">Loading memories...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 overflow-y-auto vertical-scroll">
          {filteredMemories.length > 0 ? (
            filteredMemories.map((mem) => (
              <div
                className="col-span-1 rounded-xl flex flex-col items-center group relative"
                key={mem.id}
              >
                <div className="relative w-full">
                  <img
                    src={mem.thumbnail}
                    className="rounded-xl w-full mb-2 shadow-lg border-2 border-[#C9A961]/20 group-hover:scale-105 transition-all duration-300"
                    alt={mem.title}
                  />
                  <div className="absolute top-2 right-2 bg-[#DBA39A] text-[#1A1625] text-xs px-2 py-1 rounded-full font-semibold">
                    {mem.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <button
                    onClick={() => handleDeleteMemory(mem.id)}
                    className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                  >
                    <IoTrash size={16} />
                  </button>
                </div>
                <div className="w-full">
                  <h2 className="text-md font-semibold text-[#C9A961]">
                    {mem.title}
                  </h2>
                </div>
              </div>
            ))
          ) : searchTerm ? (
            <div className="col-span-2 text-center py-12 bg-[#252235] rounded-xl border-2 border-dashed border-[#C9A961]/20">
              <p className="text-[#B8B8C8]">No memories found matching "{searchTerm}"</p>
            </div>
          ) : (
            <div className="col-span-2 text-center py-16 bg-[#252235] rounded-xl border-2 border-dashed border-[#C9A961]/20">
              <IoImages className="mx-auto mb-4 text-[#C9A961] opacity-50" size={48} />
              <p className="text-[#B8B8C8] mb-2">No memories yet</p>
              <p className="text-sm text-[#B8B8C8]/70">Create your first memory album!</p>
            </div>
          )}
        </div>
      )}

      {/* Create Memory Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-[#252235] rounded-2xl p-6 w-full max-w-md border-2 border-[#C9A961]/20 shadow-2xl">
            <h2 className="text-xl font-semibold text-[#C9A961] mb-4">Create New Memory</h2>
            <form onSubmit={handleAddMemory} className="space-y-4">
              <div>
                <label className="block text-[#F8F6F1] text-sm font-medium mb-2">
                  Memory Title
                </label>
                <input
                  type="text"
                  value={newMemory.title}
                  onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
                  className="w-full bg-[#1A1625] border-2 border-[#C9A961]/30 rounded-xl px-4 py-3 text-[#F8F6F1] placeholder-[#B8B8C8] focus:border-[#C9A961] focus:outline-none transition-all"
                  placeholder="e.g., Summer Vacation 2024"
                  required
                  autoFocus
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewMemory({ title: '' });
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#1A1625] text-[#B8B8C8] border-2 border-[#B8B8C8]/30 font-semibold hover:border-[#B8B8C8] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#DBA39A] to-[#C9A961] text-[#1A1625] font-bold hover:shadow-lg transition-all"
                >
                  Create Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Memories;
