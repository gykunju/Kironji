import { NavLink } from "react-router-dom";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsCalendar2Event, BsCalendar2EventFill } from "react-icons/bs";
import { IoImagesOutline, IoImages } from "react-icons/io5";
import { TbJewishStar, TbJewishStarFilled } from "react-icons/tb";
import { IoChatbubbleEllipsesOutline, IoChatbubbleEllipsesSharp  } from "react-icons/io5";


function Navigation() {
  return (
    <div className="items-center">
      <nav className="fixed bottom-0 z-1 flex justify-between w-full py-3 items-center bg-[#22023a] text-white font-medium shadow-2xl">
        <NavLink
          to="/"
          className="flex flex-col items-center flex-1"
          style={{ minWidth: 0 }}
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <GoHomeFill size={26} className="text-[#E673AC]" />
              ) : (
                <GoHome size={26} />
              )}
              <span
                className={
                  isActive
                    ? "text-[#E673AC] text-xs font-bold"
                    : "text-white text-xs"
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
                <BsCalendar2EventFill size={24} className="text-[#E673AC]" />
              ) : (
                <BsCalendar2Event size={24} />
              )}
              <span
                className={
                  isActive
                    ? "text-[#E673AC] text-xs font-bold"
                    : "text-white text-xs"
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
                  className="text-[#E673AC]"
                />
              ) : (
                <IoChatbubbleEllipsesOutline size={24} />
              )}
              <span
                className={
                  isActive
                    ? "text-[#E673AC] text-xs font-bold"
                    : "text-white text-xs"
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
                <IoImages size={24} className="text-[#E673AC]" />
              ) : (
                <IoImagesOutline size={24} />
              )}
              <span
                className={
                  isActive
                    ? "text-[#E673AC] text-xs font-bold"
                    : "text-white text-xs"
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
                <TbJewishStarFilled size={24} className="text-[#E673AC]" />
              ) : (
                <TbJewishStar size={24} />
              )}
              <span
                className={
                  isActive
                    ? "text-[#E673AC] text-xs font-bold"
                    : "text-white text-xs"
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
