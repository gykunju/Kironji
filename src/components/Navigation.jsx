import { NavLink } from "react-router-dom";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsCalendar2Event, BsCalendar2EventFill } from "react-icons/bs";
import { IoImagesOutline, IoImages } from "react-icons/io5";
import { TbJewishStar, TbJewishStarFilled } from "react-icons/tb";
import { IoChatbubbleEllipsesOutline, IoChatbubbleEllipsesSharp  } from "react-icons/io5";


function Navigation() {
  return (
    <div className="items-center">
      <nav className="fixed bottom-0 z-50 flex justify-between w-full pb-6 pt-4 items-center bg-gradient-to-t from-[#1A1625] via-[#1A1625] to-transparent text-white font-medium shadow-2xl backdrop-blur-sm border-t border-[#C9A961]/20">
        <NavLink
          to="/"
          className="flex flex-col items-center flex-1"
          style={{ minWidth: 0 }}
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <GoHomeFill size={26} className="text-[#C9A961]" />
              ) : (
                <GoHome size={26} className="text-[#B8B8C8]" />
              )}
              <span
                className={
                  isActive
                    ? "text-[#C9A961] text-xs font-semibold"
                    : "text-[#B8B8C8] text-xs font-medium"
                }
              >
                Home
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/events"
          className="flex flex-col items-center flex-1"
          style={{ minWidth: 0 }}
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <BsCalendar2EventFill size={24} className="text-[#C9A961]" />
              ) : (
                <BsCalendar2Event size={24} className="text-[#B8B8C8]" />
              )}
              <span
                className={
                  isActive
                    ? "text-[#C9A961] text-xs font-semibold"
                    : "text-[#B8B8C8] text-xs font-medium"
                }
              >
                Events
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/chats"
          className="flex flex-col items-center flex-1"
          style={{ minWidth: 0 }}
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <IoChatbubbleEllipsesSharp
                  size={24}
                  className="text-[#C9A961]"
                />
              ) : (
                <IoChatbubbleEllipsesOutline size={24} className="text-[#B8B8C8]" />
              )}
              <span
                className={
                  isActive
                    ? "text-[#C9A961] text-xs font-semibold"
                    : "text-[#B8B8C8] text-xs font-medium"
                }
              >
                Chats
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/memories"
          className="flex flex-col items-center flex-1"
          style={{ minWidth: 0 }}
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <IoImages size={24} className="text-[#C9A961]" />
              ) : (
                <IoImagesOutline size={24} className="text-[#B8B8C8]" />
              )}
              <span
                className={
                  isActive
                    ? "text-[#C9A961] text-xs font-semibold"
                    : "text-[#B8B8C8] text-xs font-medium"
                }
              >
                Memories
              </span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/wishlist"
          className="flex flex-col items-center flex-1"
          style={{ minWidth: 0 }}
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <TbJewishStarFilled size={24} className="text-[#C9A961]" />
              ) : (
                <TbJewishStar size={24} className="text-[#B8B8C8]" />
              )}
              <span
                className={
                  isActive
                    ? "text-[#C9A961] text-xs font-semibold"
                    : "text-[#B8B8C8] text-xs font-medium"
                }
              >
                WishList
              </span>
            </>
          )}
        </NavLink>
      </nav>
    </div>
  );
}
export default Navigation;
