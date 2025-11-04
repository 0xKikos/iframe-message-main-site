import { Link, useLocation } from "react-router";
import { twMerge } from "tailwind-merge";
import DaoActiveIcon from "@/components/Icons/Tabbar/DaoActiveIcon";
import DaoIcon from "@/components/Icons/Tabbar/DaoIcon";
import HomeActiveIcon from "@/components/Icons/Tabbar/HomeActiveIcon";
import HomeIcon from "@/components/Icons/Tabbar/HomeIcon";
import MessageActiveIcon from "@/components/Icons/Tabbar/MessageActiveIcon";
import MessageIcon from "@/components/Icons/Tabbar/MessageIcon";
import ProfileActiveIcon from "@/components/Icons/Tabbar/ProfileActiveIcon";
import ProfileIcon from "@/components/Icons/Tabbar/ProfileIcon";
import Publish from "./Publish";
import { useToast } from "@/hooks/useToast";

const Tabbar = () => {
  const { pathname } = useLocation();
  const { comingsoonToast } = useToast();
  const tabbarList = [
    {
      path: "/",
      icon: <HomeIcon />,
      activeIcon: <HomeActiveIcon />,
      disabled: false
    },
    {
      path: "/dao",
      icon: <DaoIcon />,
      activeIcon: <DaoActiveIcon />,
      disabled: false
    },
    {
      path: "/publish",
      icon: <Publish />,
      activeIcon: <Publish />,
      disabled: true
    },
    {
      path: "/message",
      icon: <MessageIcon />,
      activeIcon: <MessageActiveIcon />,
      disabled: false
    },
    {
      path: "/profile",
      icon: <ProfileIcon />,
      activeIcon: <ProfileActiveIcon />,
      disabled: false
    }
  ];

  const handleDisabledClick = () => {
    comingsoonToast();
  };
  return (
    <div>
      <div className="h-[78px]"></div>
      <div
        className={twMerge(
          "fixed right-0 bottom-0 left-0 mx-auto flex max-w-lg items-end justify-between border-border border-t bg-[#FFFFFFCC] px-4 pt-3 pb-4 backdrop-blur-[10px] dark:bg-[#0F0C19CC]"
        )}
      >
        {tabbarList.map((item) => {
          const isActive = pathname === item.path;
          if (item.disabled)
            return (
              <button
                type="button"
                key={item.path}
                onClick={handleDisabledClick}
              >
                {item.icon}
              </button>
            );
          return (
            <Link
              key={item.path}
              to={item.path}
              className={twMerge(
                "flex items-center justify-center",
                isActive ? "text-foreground" : "text-gray400"
              )}
            >
              {isActive ? item.activeIcon : item.icon}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Tabbar;
