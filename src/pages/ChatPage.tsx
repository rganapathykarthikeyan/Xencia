import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { assets } from "../assets";
import ChatSection from "../components/ChatSection";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import SideBarNavigation from "../components/SideBarNavigation";
import { cn } from "../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useParams } from "react-router-dom";
import { addBotChat, addUserChat } from "../store/chatSlice";

const ChatPage = () => {
  const [showNav, setShowNav] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const theme = useSelector((state: RootState) => state.theme);
  const { id } = useParams();
  const chatList = useSelector((state: RootState) => state.chat);
  const findChatIndexbyID = chatList.findIndex((data) => data.id === id);
  const Chat = findChatIndexbyID !== -1 ? chatList[findChatIndexbyID] : null;
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [text, setText] = useState("");

  const dispatch = useDispatch();

  console.log("From ChatPage : ", Chat);

  const onChangeChat = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && text !== "") {
      onSend();
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetch("https://nextgengamingbot.azurewebsites.net/refreshed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        setIsRefreshing(false);
      });
  };

  const onSend = async () => {
    if (!id) return;

    setDisabled(true);
    setIsLoading(true);

    dispatch(addUserChat({ user: text, id }));

    try {
      const response = await fetch(
        "https://nextgengamingbot.azurewebsites.net/send_message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: text }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const botText = data.ai_response;
      dispatch(addBotChat({ bot: botText, id }));
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setDisabled(false);
      setIsLoading(false);
    }

    setText("");
  };

  useEffect(() => {
    setIsDark(theme.theme === "dark");
  }, [theme]);

  const hideShowNav = () => {
    setShowNav(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-backgroundImg bg-opacity-50">
      <div
        className={cn(
          "fixed top-0 h-svh md:h-screen bg-white duration-300 z-10",
          {
            "left-0": showNav,
            "left-[-100%]": !showNav,
          }
        )}
      >
        <SideBarNavigation hideNav={hideShowNav} />
      </div>
      <section className="bg-white flex-row flex gap-5 p-3 px-10 ">
        <button
          className="flex md:hidden h-full items-center"
          onClick={() => {
            setShowNav((prev) => !prev);
          }}
        >
          <img src={assets.icons.menuOutB} alt="menu" height={20} width={20} />
        </button>
        <div className="flex flex-col">
          <span
            className={cn("text-xl font-bold", {
              "text-titleBlue": !isDark,
              "text-black": isDark,
            })}
          >
            {Chat ? Chat.name : "title"}
          </span>
          <a href="mailto:support@xencia.com" className="text-greyText text-sm">
            support@xencia.com
          </a>
        </div>
      </section>
      <div className="bg-[#d3e2ec8f] w-full flex-grow flex flex-col justify-between overflow-y-scroll">
        <div className="my-1">
          {Chat && (
            <ChatSection
              id={id ? id : ""}
              isLoading={isLoading}
              isDark={isDark}
              isRefreshing={isRefreshing}
            />
          )}
        </div>
      </div>
      <section className="bg-white flex-row flex gap-1 p-1 md:p-3 w-full items-center justify-center">
        <div className="lg:min-w-[860px] min-w-full flex flex-row items-center gap-4">
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
              onKeyDown={handleKeyPress}
            />
          </div>
          <div>
            <Button
              variant={"ghost"}
              className="py-1 rounded-full"
              onClick={onRefresh}
              disabled={isRefreshing}
            >
              <img src={assets.icons.refresh} height={24} width={24} />
            </Button>
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

export default ChatPage;
