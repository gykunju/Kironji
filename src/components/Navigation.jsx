import { NavLink } from 'react-router-dom'
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsCalendar2Event, BsCalendar2EventFill } from "react-icons/bs";
import {IoImagesOutline, IoImages } from "react-icons/io5";
import { TbJewishStar, TbJewishStarFilled } from "react-icons/tb";


function Navigation() {
    return (
      <nav className="fixed bottom-0 z-1 flex justify-between w-full p-3 pb-5 pt-5 bg-[#6A89A7] text-black font-medium">
        <NavLink to="/" className="flex flex-col items-center">
          {({ isActive }) => (
            <>
              {isActive ? (
                <GoHomeFill size={30} className="text-[#482034]" />
              ) : (
                <GoHome size={30} />
              )}
              <span
                className={
                  isActive ? "text-[#482034] text-sm" : "text-black text-sm"
                }
              >
                Home
              </span>
            </>
          )}
        </NavLink>
        <NavLink to="/events" className="flex flex-col items-center">
          {({ isActive }) => (
            <>
              {isActive ? (
                <BsCalendar2EventFill size={30} className="text-[#482034]" />
              ) : (
                <BsCalendar2Event size={30} />
              )}
              <span
                className={
                  isActive ? "text-[#482034] text-sm" : "text-black text-sm"
                }
              >
                Events
              </span>
            </>
          )}
        </NavLink>
        <NavLink to="/memories" className="flex flex-col items-center">
          {({ isActive }) => (
            <>
              {isActive ? (
                <IoImages size={30} className="text-[#482034]" />
              ) : (
                <IoImagesOutline size={30} />
              )}
              <span
                className={
                  isActive ? "text-[#482034] text-sm" : "text-black text-sm"
                }
              >
                Memories
              </span>
            </>
          )}
        </NavLink>
        <NavLink to="/wishlist" className="flex flex-col items-center">
          {({ isActive }) => (
            <>
              {isActive ? (
                <TbJewishStarFilled size={30} className="text-[#482034]" />
              ) : (
                <TbJewishStar size={30} />
              )}
              <span
                className={
                  isActive ? "text-[#482034] text-sm" : "text-black text-sm"
                }
              >
                WishList
              </span>
            </>
          )}
        </NavLink>
      </nav>
    );  
}

export default Navigation