import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import MasonryGallery from "../components/MasonryGallery";
import { IoCamera, IoLogOut, IoCalendar, IoHeart, IoImage } from "react-icons/io5";
import { TbSparkles } from "react-icons/tb";

function Home() {
  const { user, profile, signOut } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ photos: 0, events: 0, memories: 0 });

  useEffect(() => {
    if (user) {
      fetchPhotos();
      fetchStats();
    }
  }, [user]);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      const formattedPhotos = data.map(photo => ({
        id: photo.id,
        img: photo.image_url,
        title: photo.caption,
        height: 250,
      }));

      setPhotos(formattedPhotos);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const [photosCount, eventsCount, memoriesCount] = await Promise.all([
        supabase.from('photos').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('events').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('memories').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      ]);

      setStats({
        photos: photosCount.count || 0,
        events: eventsCount.count || 0,
        memories: memoriesCount.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSnapPhoto = async () => {
    // For now, simulate adding a photo - in production, you'd upload to Supabase storage
    const demoImageUrl = `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/600/800`;

    try {
      const { data, error } = await supabase
        .from('photos')
        .insert([
          {
            user_id: user.id,
            image_url: demoImageUrl,
            caption: 'New snap from today',
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Add to local state
      setPhotos([{
        id: data.id,
        img: data.image_url,
        title: data.caption,
        height: 250,
      }, ...photos]);

      setStats({ ...stats, photos: stats.photos + 1 });
    } catch (error) {
      console.error('Error adding photo:', error);
      alert('Error adding photo. Please try again.');
    }
  };

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      await signOut();
    }
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen flex flex-col p-6 pb-24 bg-[#1A1625]">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DBA39A] to-[#C9A961] p-1">
                <div className="w-full h-full rounded-full bg-[#252235] flex items-center justify-center text-2xl font-bold text-[#C9A961]">
                  {profile?.username?.[0]?.toUpperCase() || 'U'}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#C9A961] rounded-full flex items-center justify-center border-2 border-[#1A1625]">
                <TbSparkles size={14} className="text-[#1A1625]" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#F8F6F1]">
                Welcome, {profile?.full_name || profile?.username || 'User'}
              </h2>
              <p className="text-sm text-[#B8B8C8]">{today}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#C9A961] hover:text-[#1A1625] hover:bg-[#C9A961] px-4 py-2 rounded-xl transition-all duration-300 border-2 border-[#C9A961]/30"
          >
            <IoLogOut size={20} />
            <span className="hidden sm:inline font-medium">Logout</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#252235] rounded-xl p-4 border-2 border-[#C9A961]/20 text-center">
            <IoImage className="mx-auto mb-2 text-[#C9A961]" size={24} />
            <div className="text-2xl font-bold text-[#C9A961]">{stats.photos}</div>
            <div className="text-xs text-[#B8B8C8]">Photos</div>
          </div>
          <div className="bg-[#252235] rounded-xl p-4 border-2 border-[#DBA39A]/20 text-center">
            <IoCalendar className="mx-auto mb-2 text-[#DBA39A]" size={24} />
            <div className="text-2xl font-bold text-[#DBA39A]">{stats.events}</div>
            <div className="text-xs text-[#B8B8C8]">Events</div>
          </div>
          <div className="bg-[#252235] rounded-xl p-4 border-2 border-[#9BA3D4]/20 text-center">
            <IoHeart className="mx-auto mb-2 text-[#9BA3D4]" size={24} />
            <div className="text-2xl font-bold text-[#9BA3D4]">{stats.memories}</div>
            <div className="text-xs text-[#B8B8C8]">Memories</div>
          </div>
        </div>
      </div>

      {/* Snap Button */}
      <button
        onClick={handleSnapPhoto}
        className="flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-bold text-[#1A1625] bg-gradient-to-r from-[#DBA39A] to-[#C9A961] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-2 border-[#DBA39A]/30 mb-6"
      >
        <IoCamera size={24} className="text-[#1A1625]" />
        <span className="text-lg">Snap a Photo</span>
      </button>

      {/* Gallery Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#C9A961]">
            Recent Snaps
          </h2>
          {photos.length > 0 && (
            <span className="text-sm text-[#B8B8C8]">
              {photos.length} photo{photos.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#C9A961] border-t-transparent"></div>
            <p className="text-[#B8B8C8] mt-4">Loading photos...</p>
          </div>
        ) : photos.length > 0 ? (
          <MasonryGallery items={photos} />
        ) : (
          <div className="text-center py-16 bg-[#252235] rounded-xl border-2 border-dashed border-[#C9A961]/20">
            <IoCamera className="mx-auto mb-4 text-[#C9A961] opacity-50" size={48} />
            <p className="text-[#B8B8C8] mb-2">No photos yet</p>
            <p className="text-sm text-[#B8B8C8]/70">Tap the button above to add your first snap!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
