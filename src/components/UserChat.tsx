import { assets } from "../assets";

/* eslint-disable @typescript-eslint/no-explicit-any */
type UserChatProps = {
  chat: any;
};

const UserChat = (props: UserChatProps) => {
  return (
    <div className="flex w-full flex-row justify-end gap-2">
      <div className="max-w-[420px] flex flex-col">
        <div className="bg-blueBg text-white p-4 rounded-l-3xl rounded-se-3xl">
          {props.chat.data}
        </div>
      </div>

      <div className="flex flex-col justify-end gap-1 items-center">
        <div>
          <img
            src={assets.images.avatar}
            alt="profilePic"
            className="h-auto w-10"
            height={30}
            width={30}
          />
        </div>
        <span className="text-xs">{props.chat.timeStamp}</span>
      </div>
    </div>
  );
};

export default UserChat;
