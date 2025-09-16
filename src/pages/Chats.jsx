function Chats() {
  const user = "Alvin";

  const chats = [
    {
      user: "Alvin",
      time: new Date(),
      content: "Hello there",
    },
    {
      user: "Kironji",
      time: new Date(),
      content: "Niaje Mzae",
    },
    {
      user: "Alvin",
      time: new Date(),
      content: "Piss off",
    },
    {
      user: "Kironji",
      time: new Date(),
      content:
        "Why tho, i though this was supposed to be a serious conversion. What do you mean PISS OFFF???",
    },
    {
      user: "Alvin",
      time: new Date(),
      content: "Piss off",
    },
    {
      user: "Kironji",
      time: new Date(),
      content:
        "Why tho, i though this was supposed to be a serious conversion. What do you mean PISS OFFF???",
    },
    {
      user: "Alvin",
      time: new Date(),
      content: "Piss off",
    },
    {
      user: "Kironji",
      time: new Date(),
      content:
        "Why tho, i though this was supposed to be a serious conversion. What do you mean PISS OFFF???",
    },
    {
      user: "Alvin",
      time: new Date(),
      content: "Piss off",
    },
    {
      user: "Kironji",
      time: new Date(),
      content:
        "Why tho, i though this was supposed to be a serious conversion. What do you mean PISS OFFF???",
    },
    {
      user: "Alvin",
      time: new Date(),
      content: "Piss off",
    },
    {
      user: "Kironji",
      time: new Date(),
      content:
        "Why tho, i though this was supposed to be a serious conversion. What do you mean PISS OFFF???",
    },
    {
      user: "Alvin",
      time: new Date(),
      content: "Piss off",
    },
    {
      user: "Kironji",
      time: new Date(),
      content:
        "Why tho, i though this was supposed to be a serious conversion. What do you mean PISS OFFF???",
    },
  ];
  return (
    <div className="bg-[#22023a] min-h-screen gap-3 p-6 pb-24">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full bg-[#22023a] z-10 shadow py-4 px-6">
        <h1 className="text-center text-3xl font-bold text-[#E673AC]">Chats</h1>
      </div>
      {/* Add top margin to prevent overlap */}
      <div className="flex flex-col gap-5 mt-16">
        {chats.map((chat, idx) => {
          const isUser = chat.user === user;
          return (
            <div
              key={idx}
              className={`flex flex-col max-w-[70%] ${
                isUser ? "self-end items-end" : "self-start items-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl shadow text-white ${
                  isUser
                    ? "bg-[#E673AC] rounded-br-none"
                    : "bg-[#2d1147] rounded-bl-none border border-[#E673AC]/30"
                }`}
              >
                <span>{chat.content}</span>
              </div>
              <span className="text-xs text-[#E673AC] mt-1">
                {chat.time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chats;
