import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { IoSend, IoChatbubbles } from "react-icons/io5";

function Chats() {
  const { user, profile } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatRoom, setChatRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user) {
      initializeChatRoom();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!chatRoom) return;

    // Subscribe to new messages
    const channel = supabase
      .channel(`room:${chatRoom.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${chatRoom.id}`,
        },
        (payload) => {
          // Fetch the user profile for the new message
          fetchMessageWithProfile(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatRoom]);

  const fetchMessageWithProfile = async (message) => {
    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('username, full_name')
        .eq('id', message.user_id)
        .single();

      const formattedMessage = {
        id: message.id,
        content: message.content,
        created_at: message.created_at,
        user_id: message.user_id,
        username: profileData?.username || 'Unknown',
      };

      setMessages((prev) => {
        // Check if message already exists to prevent duplicates
        if (prev.some(m => m.id === formattedMessage.id)) {
          return prev;
        }
        return [...prev, formattedMessage];
      });
    } catch (error) {
      console.error('Error fetching message profile:', error);
    }
  };

  const initializeChatRoom = async () => {
    try {
      setLoading(true);

      // Check if user already has a chat room
      const { data: existingParticipation } = await supabase
        .from('chat_room_participants')
        .select('room_id, chat_rooms(*)')
        .eq('user_id', user.id)
        .single();

      let roomId;

      if (existingParticipation) {
        roomId = existingParticipation.room_id;
        setChatRoom(existingParticipation.chat_rooms);
      } else {
        // Create a new default chat room for the user
        const { data: newRoom, error: roomError } = await supabase
          .from('chat_rooms')
          .insert([{ name: 'My Chat Room' }])
          .select()
          .single();

        if (roomError) throw roomError;

        // Add user as participant
        const { error: participantError } = await supabase
          .from('chat_room_participants')
          .insert([{ room_id: newRoom.id, user_id: user.id }]);

        if (participantError) throw participantError;

        roomId = newRoom.id;
        setChatRoom(newRoom);
      }

      // Fetch existing messages
      await fetchMessages(roomId);
    } catch (error) {
      console.error('Error initializing chat room:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (roomId) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          profiles:user_id (username, full_name)
        `)
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedMessages = data.map((msg) => ({
        id: msg.id,
        content: msg.content,
        created_at: msg.created_at,
        user_id: msg.user_id,
        username: msg.profiles?.username || 'Unknown',
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !chatRoom) return;

    const messageContent = message.trim();
    setMessage("");

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            room_id: chatRoom.id,
            user_id: user.id,
            content: messageContent,
          },
        ]);

      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
      setMessage(messageContent); // Restore message on error
    }
  };

  if (loading) {
    return (
      <div className="bg-[#1A1625] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#C9A961] border-t-transparent"></div>
          <p className="text-[#B8B8C8] mt-4">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1625] min-h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full bg-[#1A1625] z-10 shadow py-4 px-6 border-b border-[#C9A961]/20">
        <h1 className="text-center text-2xl font-semibold text-[#C9A961]">
          {chatRoom?.name || 'Chats'}
        </h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 pt-20 pb-28 flex flex-col gap-4">
        {messages.length > 0 ? (
          messages.map((msg) => {
            const isCurrentUser = msg.user_id === user.id;
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[75%] ${
                  isCurrentUser ? "self-end items-end" : "self-start items-start"
                }`}
              >
                {!isCurrentUser && (
                  <span className="text-xs text-[#B8B8C8] mb-1 ml-1">
                    {msg.username}
                  </span>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl shadow-md transition-all duration-300 ${
                    isCurrentUser
                      ? "bg-gradient-to-r from-[#DBA39A] to-[#C9A961] text-[#1A1625] rounded-br-none"
                      : "bg-[#252235] text-[#F8F6F1] rounded-bl-none border border-[#C9A961]/30"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
                <span className="text-xs text-[#B8B8C8] mt-1 mx-1">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            );
          })
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <IoChatbubbles className="mx-auto mb-4 text-[#C9A961] opacity-50" size={64} />
              <p className="text-[#B8B8C8] mb-2">No messages yet</p>
              <p className="text-sm text-[#B8B8C8]/70">Start a conversation!</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-[#1A1625] border-t border-[#C9A961]/20 p-4 shadow-lg">
        <form onSubmit={handleSendMessage} className="flex gap-3 items-center max-w-4xl mx-auto">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-[#252235] border-2 border-[#C9A961]/30 rounded-full px-5 py-3 text-[#F8F6F1] placeholder-[#B8B8C8] focus:border-[#C9A961] focus:outline-none transition-all"
            disabled={!chatRoom}
          />
          <button
            type="submit"
            disabled={!message.trim() || !chatRoom}
            className="bg-gradient-to-r from-[#DBA39A] to-[#C9A961] text-[#1A1625] rounded-full p-3 hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoSend size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chats;
