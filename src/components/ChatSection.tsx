import { assets } from "../assets";
import BotChat from "./BotChat";
import UserChat from "./UserChat";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useRef } from "react";
import { Skeleton } from "./ui/skeleton";

type ChatSectionProps = {
  isLoading?: { id: string; isloading: boolean };
  isDark?: boolean;
  id: string;
  isRefreshing: boolean;
  isStreaming: { id: string; isstreaming: boolean };
  replyText: string;
  setText?: React.Dispatch<React.SetStateAction<string>>;
};

const ChatSection = (props: ChatSectionProps) => {
  const chatList = useSelector((state: RootState) => state.chat);
  const findChatIndexbyID = chatList.findIndex((data) => data.id === props.id);
  const Chat = findChatIndexbyID !== -1 ? chatList[findChatIndexbyID] : null;

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.isLoading]);

  return (
    <section className="h-full w-full lg:px-52 font-sand text-sm flex flex-col gap-10 p-5">
      {Chat !== null &&
        Chat.chatHistory.map((chat, index, array) => {
          if (chat.type === "User") {
            return (
              <div
                ref={index === array.length - 1 ? chatEndRef : null}
                key={chat.id}
              >
                <UserChat chat={chat} key={chat.id} />
              </div>
            );
          } else {
            return (
              <div
                ref={index === array.length - 1 ? chatEndRef : null}
                key={chat.id}
              >
                <BotChat
                  chat={chat}
                  setText={props.setText}
                  isLast={index === array.length - 1}
                />
                ;
              </div>
            );
          }
        })}
      {props.isLoading &&
        props.isLoading.isloading &&
        props.isLoading.id === props.id &&
        !props.isStreaming.isstreaming && (
          <div className="flex w-full flex-row justify-start gap-2">
            <div className="flex flex-col justify-end gap-1 items-center">
              <div className="flex items-center justify-center h-12 w-12 bg-[#D9D9D9] rounded-full">
                <img
                  src={assets.images.XenciaS}
                  alt="profilePic"
                  className="h-auto w-8"
                  height={30}
                  width={30}
                />
              </div>
            </div>
            <div className="max-w-[420px] flex flex-col">
              <div className="bg-white min-w-[350px] text-greyText2 p-4 rounded-r-3xl rounded-ss-3xl">
                <Skeleton className="w-full h-[20px] rounded-full" />
              </div>
            </div>
          </div>
        )}
      {props.isStreaming &&
        props.isStreaming.id === props.id &&
        props.isStreaming.isstreaming && (
          <div className="flex w-full flex-row justify-start gap-2">
            <div className="flex flex-col justify-end gap-1 items-center">
              <div className="flex items-center justify-center h-12 w-12 bg-[#D9D9D9] rounded-full">
                <img
                  src={assets.images.XenciaS}
                  alt="profilePic"
                  className="h-auto w-8"
                  height={30}
                  width={30}
                />
              </div>
            </div>
            <div className="min-w-[220px] flex flex-col">
              <div className="bg-white max-w-[420px] text-greyText2 p-4 rounded-r-3xl rounded-ss-3xl">
                <div>{props.replyText}</div>
              </div>
            </div>
          </div>
        )}
      <div>
        {props.isRefreshing && (
          <div className="p-10 flex justify-center items-center">
            <div className="bg-[#DCE4E9] px-8 py-1 rounded-3xl  flex flex-row items-center">
              <span>Refreshing...</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChatSection;
