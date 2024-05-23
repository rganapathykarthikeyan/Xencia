import { assets } from "../assets";
import BotChat from "./BotChat";
import UserChat from "./UserChat";
import { Button } from "./ui/button";

type ChatSectionProps = {
  chat: {
    id: string;
    type: string;
    data: string;
    timeStamp: string;
  }[];
};

const ChatSection = (props: ChatSectionProps) => {
  return (
    <section className="h-full w-full md:px-52 font-sand text-sm flex flex-col gap-10 p-5">
      {props.chat.map((chat) => {
        if (chat.type === "User") {
          return <UserChat chat={chat} key={chat.id} />;
        } else {
          return <BotChat chat={chat} key={chat.id} />;
        }
      })}
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
