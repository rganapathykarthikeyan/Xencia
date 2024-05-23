import { useEffect, useState } from "react";
import { assets } from "../assets";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { cn } from "../lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
type UserChatProps = {
  chat: any;
};

const UserChat = (props: UserChatProps) => {
  const [isDark, setIsDark] = useState(false);
  const theme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    setIsDark(theme.theme === "dark");
  }, [theme]);

  return (
    <div className="flex w-full flex-row justify-end gap-2">
      <div className="max-w-[420px] flex flex-col">
        <div
          className={cn(
            "p-4 rounded-l-3xl rounded-se-3xl whitespace-pre-wrap break-words",
            {
              "bg-blueBg text-white": !isDark,
              "bg-chatDark text-black": isDark,
            }
          )}
        >
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
