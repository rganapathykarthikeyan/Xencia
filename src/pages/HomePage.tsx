import { assets } from "../assets";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import SideBarNavigation from "../components/SideBarNavigation";
import { cn } from "../lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import UserChat from "../components/UserChat";
import BotChat from "../components/BotChat";
import { SyncLoader } from "react-spinners";

type chatsModal = {
  id: string;
  type: string;
  data: string;
  timeStamp: string;
};

const HomePage = () => {
  const [showNav, setShowNav] = useState(false);
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [chatHistory, setChatHistory] = useState<chatsModal[]>([]);

  const [isDark, setIsDark] = useState(false);
  const theme = useSelector((state: RootState) => state.theme);

  const onChangeChat = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    setIsDark(theme.theme === "dark");
  }, [theme]);

  // const dispatch = useDispatch();

  const onSend = () => {
    let botText: string;
    const curHistory = chatHistory;
    curHistory.push({
      id: Math.floor(Math.random() * 3216549876541).toString(),
      type: "User",
      data: text,
      timeStamp: new Date().toLocaleTimeString("en-GB", {
        hour12: true,
      }),
    });
    setChatHistory(curHistory);
    setIsLoading(true);
    setDisabled(true);
    setText("");
    fetch("https://gameskraftweb.azurewebsites.net/send_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the data returned by the server
        botText = data.ai_response;
        // dispatch(addNewChat({ user: text, bot: botText }));
        const curHistory = chatHistory;
        curHistory.push({
          id: Math.floor(Math.random() * 321517654).toString(),
          type: "Bot",
          data: botText,
          timeStamp: new Date().toLocaleTimeString("en-GB", {
            hour12: true,
          }),
        });
        setChatHistory(curHistory);
        setIsLoading(false);
        setDisabled(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    console.log(curHistory);
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
      {chatHistory.length === 0 ? (
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
      ) : (
        <>
          <section className="bg-white flex-row flex gap-5 p-3 ">
            <button
              className="flex md:hidden h-full items-center"
              onClick={() => {
                setShowNav((prev) => !prev);
              }}
            >
              <img
                src={assets.icons.menuOutB}
                alt="menu"
                height={20}
                width={20}
              />
            </button>
            <div className="flex flex-col">
              <span
                className={cn("text-xl font-bold", {
                  "text-titleBlue": !isDark,
                  "text-black": isDark,
                })}
              >
                Add cash agent
              </span>
              <a
                href="mailto:support@xencia.com"
                className="text-greyText text-sm"
              >
                support@xencia.com
              </a>
            </div>
          </section>
          <div className="bg-[#d3e2ec8f] w-full flex-grow flex flex-col justify-between overflow-y-scroll pb-10">
            <section className="h-full w-full md:px-52 font-sand text-sm flex flex-col gap-10 p-5 mb-5">
              {chatHistory.map((chat) => {
                if (chat.type === "User") {
                  return <UserChat chat={chat} key={chat.id} />;
                } else {
                  return <BotChat chat={chat} key={chat.id} />;
                }
              })}
              {isLoading && (
                <div className="flex w-full flex-row justify-start gap-2">
                  <div className="flex flex-col justify-end gap-1 items-center">
                    <div className="flex items-center justify-center h-12 w-12 bg-[#D9D9D9] rounded-full">
                      <img
                        src={assets.images.bot}
                        alt="profilePic"
                        className="h-auto w-8"
                        height={30}
                        width={30}
                      />
                    </div>
                  </div>
                  <div className="max-w-[420px] flex flex-col">
                    <div className="bg-white max-w-[420px] text-greyText2 p-4 rounded-r-3xl rounded-ss-3xl">
                      <SyncLoader
                        color={isDark ? "#1875F0" : "#000000"}
                        size={10}
                        speedMultiplier={0.7}
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </>
      )}
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
              disabled={disabled}
            />
          </div>
          <div>
            <Button
              variant={"blue"}
              className="py-3 px-4 md:py-6 md:px-7 rounded-full"
              onClick={onSend}
              disabled={disabled || text === ""}
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
