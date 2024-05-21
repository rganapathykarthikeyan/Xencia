import { useEffect, useState } from "react";
import { assets } from "../assets";
import { cn } from "../lib/utils";
import { ChatListTitleHistory } from "../lib/constants";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Switch } from "./ui/switch";
import { toggleTheme } from "../store/themeSlice";

type SideBarNavigationProps = {
  hideNav?: () => void;
};

const SideBarNavigation = (props: SideBarNavigationProps) => {
  const [collapse, setCollapse] = useState(false);
  const [list] = useState(ChatListTitleHistory);
  const [isDark, setIsDark] = useState(false);
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const todayList = list.filter((data) => data.timeStamp === "Today");
  const lastWeekList = list.filter((data) => data.timeStamp === "Last week");
  const lastMonth = list.filter((data) => data.timeStamp === "Last Month");
  const route = useNavigate();

  useEffect(() => {
    setIsDark(theme.theme === "dark");
  }, [theme]);

  return (
    <div
      className={cn(
        " duration-300 z-50 h-full font-sand text-white relative flex flex-col justify-between",
        {
          "w-[200px] md:w-[260px]": collapse === false,
          "w-[65px]": collapse === true,
          "bg-darkModeSide": isDark,
          "bg-gradient-to-t from-NavGradiantStart via-NavGradiantMid to-NavGradiantEnd":
            !isDark,
        }
      )}
    >
      {/* Header */}
      <section
        className={cn("w-full flex", {
          "flex-row pt-4": !collapse,
          "flex-col": collapse,
        })}
      >
        <div
          className={cn(
            "flex flex-grow items-center justify-center cursor-pointer",
            {
              "p-5": !collapse,
              "py-5": collapse,
            }
          )}
          onClick={() => {
            route("/");
          }}
        >
          {!collapse ? (
            <img
              src={assets.images.XenciaL}
              alt="logo"
              height={90}
              width={80}
            />
          ) : (
            <img
              src={assets.images.XenciaS}
              alt="logo"
              height={40}
              width={40}
            />
          )}
        </div>
        <div
          className={cn("p-2", {
            hidden: !collapse,
            "items-center justify-center": collapse,
          })}
        >
          <button
            className="w-full flex justify-center"
            onClick={() => {
              setCollapse((pre) => !pre);
            }}
          >
            <img src={assets.icons.menuOut} alt="menu" height={20} width={20} />
          </button>
        </div>
        <div
          className={cn("absolute top-5 right-5", {
            hidden: collapse,
            "": !collapse,
          })}
        >
          <button
            className="w-full hidden md:flex justify-center"
            onClick={() => {
              setCollapse((pre) => !pre);
            }}
          >
            <img src={assets.icons.menu} alt="menu" height={20} width={20} />
          </button>
          <button
            className="w-full flex md:hidden justify-center"
            onClick={props.hideNav}
          >
            <img src={assets.icons.menu} alt="menu" height={20} width={20} />
          </button>
        </div>
      </section>

      {/* Content */}
      <section
        className={cn("p-5 flex-grow flex-col gap-8", {
          hidden: collapse,
          flex: !collapse,
        })}
      >
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold">TODAY</span>
          {todayList.map((data) => {
            return (
              <NavLink
                to={"/c/" + data.id}
                key={data.id}
                className={({ isActive }) =>
                  isActive
                    ? "text-xs md:text-base font-bold"
                    : "text-xs md:text-base"
                }
              >
                {data.name}
              </NavLink>
            );
          })}
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold">LAST WEEK</span>
          {lastWeekList.map((data) => {
            return (
              <NavLink
                to={"/c/" + data.id}
                key={data.id}
                className={({ isActive }) =>
                  isActive
                    ? "text-xs md:text-base font-bold"
                    : "text-xs md:text-base"
                }
              >
                {data.name}
              </NavLink>
            );
          })}
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold">LAST MONTH</span>
          {lastMonth.map((data) => {
            return (
              <NavLink
                to={"/c/" + data.id}
                key={data.id}
                className={({ isActive }) =>
                  isActive
                    ? "text-xs md:text-base font-bold"
                    : "text-xs md:text-base"
                }
              >
                {data.name}
              </NavLink>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <section>
        <div
          className={cn("", {
            "border-[#FFFFFF66] bg-[#FFFFFF4D] mx-4 my-2 p-2 border rounded-xl flex flex-row gap-2":
              !collapse,
            "items-center justify-center flex pb-3": collapse,
          })}
        >
          <img src={assets.icons.help} alt="help" height={36} width={36} />
          <span
            className={cn(
              "font-sand text-[10px] md:text-xs flex items-center",
              {
                hidden: collapse,
              }
            )}
          >
            Help
          </span>
        </div>
        <div
          className={cn("flex", {
            "flex-row p-5": !collapse,
            "flex-col-reverse px-4 pb-4 items-center justify-center gap-4":
              collapse,
          })}
        >
          <div className="flex flex-row rounded-full justify-center items-center">
            <div className="flex flex-row">
              <img
                src={assets.images.avatar}
                alt="profilePic"
                className="h-auto w-12"
                height={40}
                width={40}
              />
              <div className="flex items-end -ml-2 mb-1">
                <div className="h-2 w-2 inline-block rounded-full bg-statusGreen "></div>
              </div>
            </div>
          </div>
          <div
            className={cn("flex-col flex-grow w-full px-3", {
              hidden: collapse,
              flex: !collapse,
            })}
          >
            <span className="text-xs md:text-sm">Kate Smile</span>
            <span className="text-[10px] md:text-xs text-[#FFFFFFBF]">
              Premium Member
            </span>
          </div>
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center justify-center">
                <img
                  src={assets.icons.gear}
                  alt="settings"
                  height={24}
                  width={24}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <div className="flex flex-row gap-3 items-center">
                Dark Mode:
                <Switch
                  id="theme"
                  className="border border-greyText2"
                  checked={theme.theme === "dark"}
                  onCheckedChange={() => {
                    dispatch(toggleTheme());
                  }}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>
    </div>
  );
};

export default SideBarNavigation;
