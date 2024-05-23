import { SyncLoader } from "react-spinners";
import { assets } from "../assets";
import BotChat from "./BotChat";
import UserChat from "./UserChat";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type ChatSectionProps = {
  isLoading?: boolean;
  isDark?: boolean;
  id: string;
  isRefreshing: boolean;
};

const ChatSection = (props: ChatSectionProps) => {
  const chatList = useSelector((state: RootState) => state.chat);
  const findChatIndexbyID = chatList.findIndex((data) => data.id === props.id);
  const Chat = findChatIndexbyID !== -1 ? chatList[findChatIndexbyID] : null;

  console.log("From Section :", Chat);

  return (
    <section className="h-full w-full md:px-52 font-sand text-sm flex flex-col gap-10 p-5">
      {Chat !== null &&
        Chat.chatHistory.map((chat) => {
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
                src={assets.images.XenciaS}
                alt="profilePic"
                className="h-auto w-8"
                height={30}
                width={30}
              />
            </div>
          </div>
          <div className="max-w-[420px] flex flex-col">
            <div
              className="bg-white max-w-[420px] text-greyText2 p-4 rounded-r-3xl rounded-ss-3xl"
              autoFocus={props.isLoading}
            >
              <SyncLoader
                color={props.isDark ? "#1875F0" : "#000000"}
                size={10}
                speedMultiplier={0.7}
              />
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
