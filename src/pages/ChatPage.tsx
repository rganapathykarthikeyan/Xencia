import { useState } from "react";
import { assets } from "../assets";
import ChatSection from "../components/ChatSection";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import SideBarNavigation from "../components/SideBarNavigation";
import { cn } from "../lib/utils";

const ChatPage = () => {
  const [showNav, setShowNav] = useState(false);

  const hideShowNav = () => {
    setShowNav(false);
  };
  return (
    <div className="w-full h-full flex flex-col bg-backgroundImg bg-opacity-50">
      <div
        className={cn("fixed top-0 h-screen bg-white duration-300 z-10", {
          "left-0": showNav === true,
          " left-[-100%]": showNav === false,
        })}
      >
        <SideBarNavigation hideNav={hideShowNav} />
      </div>
      <section className="bg-white flex-row flex gap-5 p-3 px-10 ">
        <button
          className="flex md:hidden h-full items-center"
          onClick={() => {
            setShowNav((pre) => !pre);
          }}
        >
          <img src={assets.icons.menuB} alt="menu" height={20} width={20} />
        </button>
        <div className="flex flex-col">
          <span className="text-titleBlue text-xl font-bold">
            Add cash agent
          </span>
          <span className="text-greyText text-sm">
            Lorem ipsum dolor sit amet
          </span>
        </div>
      </section>
      <div className="bg-[#d3e2ec8f] w-full flex-grow flex flex-col justify-between overflow-y-scroll">
        <ChatSection />
      </div>
      <section className="bg-white flex-row flex gap-1 p-3 w-full items-center justify-center">
        <div className="lg:min-w-[860px] min-w-full flex flex-row py-5 items-center gap-4">
          <div className="flex flex-row">
            <div>
              <img
                src={assets.images.avatar}
                alt="profilePic"
                className="h-auto w-12"
                height={40}
                width={40}
              />
            </div>
          </div>
          <div className="flex flex-grow">
            <Input
              type="text"
              placeholder="Type your text here"
              className="focus:border-none focus:outline-none"
            />
          </div>
          <div>
            <Button
              variant={"blue"}
              className="py-2 px-2 md:py-6 md:px-7 rounded-full"
            >
              SEND
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatPage;
