import { ChangeEvent, useEffect, useState } from "react";
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
  const Chat = chatList[findChatIndexbyID];
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(chatList, findChatIndexbyID, Chat, id);

  const [text, setText] = useState("");

  const onChangeChat = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const dispatch = useDispatch();

  const onSend = () => {
    setDisabled(true);
    setIsLoading(true);
    let botText: string;
    if (id) {
      dispatch(addUserChat({ user: text, id: id }));
    }
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
        if (id) {
          dispatch(addBotChat({ bot: botText, id: id }));
        }
        setDisabled(false);
        setIsLoading(false);
      });
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
            "left-0": showNav === true,
            " left-[-100%]": showNav === false,
          }
        )}
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
          <img src={assets.icons.menuOutB} alt="menu" height={20} width={20} />
        </button>
        <div className="flex flex-col">
          <span
            className={cn(" text-xl font-bold", {
              "text-titleBlue": !isDark,
              "text-black": isDark,
            })}
          >
            Add cash agent
          </span>
          <a href="mailto:support@xencia.com" className="text-greyText text-sm">
            support@xencia.com
          </a>
        </div>
      </section>
      <div className="bg-[#d3e2ec8f] w-full flex-grow flex flex-col justify-between overflow-y-scroll">
        <ChatSection
          chat={Chat.chatHistory}
          isLoading={isLoading}
          isDark={isDark}
        />
      </div>
      <section className="bg-white flex-row flex gap-1 p-3 w-full items-center justify-center">
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
