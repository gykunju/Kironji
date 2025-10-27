import { Calendar } from "../components/ui/calendar";
import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { IoAdd, IoTrash, IoCalendar } from "react-icons/io5";
import "react-day-picker/style.css";

function Events() {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    color: 'bg-[#C9A961]'
  });

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', user.id)
        .order('event_date', { ascending: true });

      if (error) throw error;

      const formattedEvents = data.map(event => ({
        id: event.id,
        date: new Date(event.event_date),
        title: event.title,
        description: event.description,
        color: event.color || 'bg-[#C9A961]',
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title.trim() || !date) return;

    try {
      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            user_id: user.id,
            title: newEvent.title,
            description: newEvent.description,
            event_date: date.toISOString().split('T')[0],
            color: newEvent.color,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      const formattedEvent = {
        id: data.id,
        date: new Date(data.event_date),
        title: data.title,
        description: data.description,
        color: data.color,
      };

      setEvents([...events, formattedEvent]);
      setNewEvent({ title: '', description: '', color: 'bg-[#C9A961]' });
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      setEvents(events.filter(e => e.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again.');
    }
  };

  const getEventsForDate = (date) => {
    return events.filter(
      (event) =>
        event.date.toDateString() === date.toDateString()
    );
  };

  const selectedDateEvents = date ? getEventsForDate(date) : [];

  const colorOptions = [
    { name: 'Gold', value: 'bg-[#C9A961]' },
    { name: 'Rose', value: 'bg-[#DBA39A]' },
    { name: 'Lavender', value: 'bg-[#9BA3D4]' },
    { name: 'Pink', value: 'bg-pink-400' },
    { name: 'Purple', value: 'bg-purple-400' },
  ];

  return (
    <div className="min-h-screen gap-5 bg-[#1A1625] p-6 pb-24 flex flex-col">
      <h1 className="text-2xl font-semibold text-[#C9A961] text-center">Events</h1>

      <button
        onClick={() => setShowCreateModal(true)}
        className="flex items-center justify-center gap-2 rounded-xl px-8 py-3 text-lg font-bold text-[#1A1625] bg-gradient-to-r from-[#DBA39A] to-[#C9A961] hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-2 border-[#DBA39A]/30"
      >
        <IoAdd size={24} />
        Create Event
      </button>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#C9A961] border-t-transparent"></div>
          <p className="text-[#B8B8C8] mt-4">Loading events...</p>
        </div>
      ) : (
        <>
          <div className="bg-[#252235] rounded-2xl p-4 border-2 border-[#C9A961]/20 shadow-xl">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="text-[#C9A961] rounded-xl"
            />
          </div>

          {date && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-[#C9A961] mb-3">
                {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
              {selectedDateEvents.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-[#252235] rounded-xl p-4 border-2 border-[#C9A961]/20 shadow-lg"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`${event.color} rounded-lg w-3 h-3 mt-1.5 flex-shrink-0`}></div>
                          <div className="flex-1">
                            <h3 className="text-[#F8F6F1] font-semibold text-lg">{event.title}</h3>
                            {event.description && (
                              <p className="text-[#B8B8C8] text-sm mt-1">{event.description}</p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-400 hover:text-red-300 transition-colors p-2"
                        >
                          <IoTrash size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-[#252235] rounded-xl border-2 border-dashed border-[#C9A961]/20">
                  <IoCalendar className="mx-auto mb-3 text-[#C9A961] opacity-50" size={48} />
                  <p className="text-[#B8B8C8]">No events scheduled for this day</p>
                  <p className="text-sm text-[#B8B8C8]/70 mt-1">Create one using the button above</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-[#252235] rounded-2xl p-6 w-full max-w-md border-2 border-[#C9A961]/20 shadow-2xl">
            <h2 className="text-xl font-semibold text-[#C9A961] mb-4">Create New Event</h2>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-[#F8F6F1] text-sm font-medium mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full bg-[#1A1625] border-2 border-[#C9A961]/30 rounded-xl px-4 py-3 text-[#F8F6F1] placeholder-[#B8B8C8] focus:border-[#C9A961] focus:outline-none transition-all"
                  placeholder="e.g., Coffee Date"
                  required
                />
              </div>

              <div>
                <label className="block text-[#F8F6F1] text-sm font-medium mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full bg-[#1A1625] border-2 border-[#C9A961]/30 rounded-xl px-4 py-3 text-[#F8F6F1] placeholder-[#B8B8C8] focus:border-[#C9A961] focus:outline-none transition-all resize-none"
                  placeholder="Add details..."
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-[#F8F6F1] text-sm font-medium mb-2">
                  Event Date
                </label>
                <div className="text-[#C9A961] bg-[#1A1625] border-2 border-[#C9A961]/30 rounded-xl px-4 py-3">
                  {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>

              <div>
                <label className="block text-[#F8F6F1] text-sm font-medium mb-2">
                  Color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, color: color.value })}
                      className={`px-4 py-2 rounded-lg ${color.value} text-white font-medium transition-all ${
                        newEvent.color === color.value
                          ? 'ring-2 ring-[#F8F6F1] ring-offset-2 ring-offset-[#252235] scale-105'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewEvent({ title: '', description: '', color: 'bg-[#C9A961]' });
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#1A1625] text-[#B8B8C8] border-2 border-[#B8B8C8]/30 font-semibold hover:border-[#B8B8C8] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#DBA39A] to-[#C9A961] text-[#1A1625] font-bold hover:shadow-lg transition-all"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
