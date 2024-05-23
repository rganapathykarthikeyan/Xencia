import { assets } from "../assets";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ChangeEvent, useState } from "react";
import SideBarNavigation from "../components/SideBarNavigation";
import { cn } from "../lib/utils";
import { useDispatch } from "react-redux";
import { addChat } from "../store/chatSlice";

const HomePage = () => {
  const [showNav, setShowNav] = useState(false);
  const [text, setText] = useState("");
  // const chatList = useSelector((state: RootState) => state.chat);

  const onChangeChat = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const dispatch = useDispatch();

  const onSend = () => {
    setText("");
    dispatch(addChat(text));
    fetch("https://gameskraftweb.azurewebsites.net/send_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    }).then((data) => {
      console.log(data.json());
    });
  };

  const hideShowNav = () => {
    setShowNav(false);
  };
  return (
    <div className="w-full h-full flex flex-col bg-backgroundImg bg-opacity-50 ">
      <div
        className={cn(
          "fixed top-0 h-svh md:h-screen bg-white duration-300 z-10",
          {
            "left-0": showNav === true,
            " left-[-100%]": showNav === false,
          }
        )}
      >
        <SideBarNavigation hideNav={hideShowNav} />
      </div>
      <div className="bg-[#d3e2ec8f] w-full flex-grow flex flex-col items-center justify-center overflow-y-scroll backdrop-blur-[0.8px]">
        <div className="font-sand text-2xl flex flex-row items-center gap-3 text-greyText1 absolute top-2 left-2 md:hidden">
          <button
            className="w-full flex justify-center"
            onClick={() => {
              setShowNav((pre) => !pre);
            }}
          >
            <img
              src={assets.icons.menuOutB}
              alt="menu"
              height={20}
              width={20}
            />
          </button>
          Xencia
        </div>
        <span className="font-sand font-bold text-lg md:text-3xl text-greyText1">
          How may I help you today?
        </span>
      </div>
      <section className="bg-white flex-row flex gap-1 p-1 md:p-3 w-full items-center justify-center">
        <div className="lg:min-w-[860px] min-w-full flex flex-row py-2 md:py-5 items-center gap-4">
          <div className="flex flex-row">
            <div>
              <img
                src={assets.images.avatar}
                alt="profilePic"
                className="h-auto w-10 md:w-12"
                height={40}
                width={40}
              />
            </div>
          </div>
          <div className="flex flex-grow font-sand">
            <Input
              type="text"
              placeholder="Type your text here"
              className="focus:border-none focus:outline-none"
              value={text}
              onChange={onChangeChat}
            />
          </div>
          <div>
            <Button
              variant={"blue"}
              className="py-3 px-4 md:py-6 md:px-7 rounded-full"
              onClick={onSend}
            >
              SEND
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
