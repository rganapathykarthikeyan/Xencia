import { SyncLoader } from "react-spinners";
import { assets } from "../assets";
import BotChat from "./BotChat";
import UserChat from "./UserChat";
import { Button } from "./ui/button";
import { useState } from "react";

type ChatSectionProps = {
  chat: {
    id: string;
    type: string;
    data: string;
    timeStamp: string;
  }[];
  isLoading?: boolean;
  isDark?: boolean;
};

const ChatSection = (props: ChatSectionProps) => {
  const [chatList] = useState(props.chat);
  return (
    <section className="h-full w-full md:px-52 font-sand text-sm flex flex-col gap-10 p-5">
      {chatList.map((chat) => {
        if (chat.type === "User") {
          return <UserChat chat={chat} key={chat.id} />;
        } else {
          return <BotChat chat={chat} key={chat.id} />;
        }
      })}
      {props.isLoading && (
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
                color={props.isDark ? "#1875F0" : "#000000"}
                size={10}
                speedMultiplier={0.7}
              />
            </div>
          </div>
        </div>
      )}
      <div className="p-10 flex justify-center items-center">
        <div className="bg-[#DCE4E9] px-8 py-1 rounded-3xl  flex flex-row items-center">
          <span>Lorem ipsum dolor sit amet</span>
          <Button variant={"transparent"} size={"icon"}>
            <img src={assets.icons.like} height={20} width={20} />
          </Button>
          <Button variant={"transparent"} size={"icon"}>
            <img src={assets.icons.dislike} height={20} width={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;
