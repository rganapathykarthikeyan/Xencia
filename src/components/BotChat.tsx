import { useState } from "react";
import { assets } from "../assets";
import { Button } from "./ui/button";

/* eslint-disable @typescript-eslint/no-explicit-any */
type BotChatProps = {
  chat: any;
};

const BotChat = (props: BotChatProps) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
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
        <span className="text-xs">{props.chat.timeStamp}</span>
      </div>
      <div className="max-w-[420px] flex flex-col">
        <div
          className="bg-white max-w-[420px] text-greyText2 p-4 rounded-r-3xl rounded-ss-3xl"
          onClick={() => {
            setShowOptions((pre) => !pre);
          }}
        >
          {props.chat.data}
        </div>
        {showOptions && (
          <div className="flex flex-row w-full justify-end">
            <Button variant={"transparent"} size={"iconSmall"}>
              <img src={assets.icons.volume} height={24} width={24} alt="vol" />
            </Button>
            <Button variant={"transparent"} size={"iconSmall"}>
              <img src={assets.icons.copy} height={20} width={20} alt="copy" />
            </Button>
            <Button variant={"transparent"} size={"iconSmall"}>
              <img
                src={assets.icons.dislike}
                height={20}
                width={20}
                alt="dislike"
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BotChat;
