import { useState } from "react";
import { assets } from "../assets";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { SquareArrowOutUpRight } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type BotChatProps = {
  chat: any;
  setText?: React.Dispatch<React.SetStateAction<string>>;
  isLast: boolean;
};

const BotChat = (props: BotChatProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [date, setDate] = useState<Date>();
  const route = useNavigate();
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
          className="bg-white max-w-[420px] text-black p-4 rounded-r-3xl rounded-ss-3xl"
          onClick={() => {
            setShowOptions((pre) => !pre);
          }}
        >
          <span>{props.chat.data}</span>
          {typeof props.chat.data === "string" &&
            props.isLast &&
            (props.chat.data.toLowerCase().includes("yes") ||
              props.chat.data.toLowerCase().includes("if you need")) &&
            (props.chat.data.toLowerCase().includes("no") ||
              props.chat.data.toLowerCase().includes("please let me know")) && (
              <div className="flex flex-row gap-6 w-full justify-end">
                <Button
                  variant={"blue"}
                  className="rounded-3xl"
                  onClick={() => {
                    if (props.setText) {
                      props.setText("Yes");
                    }
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant={"blueOutline"}
                  onClick={() => {
                    if (props.setText) {
                      props.setText("No");
                    }
                  }}
                >
                  No
                </Button>
              </div>
            )}

          {props.isLast && (
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"blueOutline"}
                    className={cn(
                      "w-full border-2 font-semibold rounded-3xl h-10 bg-white text-blueBg text-sm"
                    )}
                  >
                    <span>Choose Date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="z-50 w-auto rounded-md bg-slate-225 p-0"
                >
                  <>
                    <Calendar
                      initialFocus
                      captionLayout="dropdown-buttons"
                      className="p-0 bg-white rounded-xl flex-grow"
                      fromYear={1900}
                      id="DOB"
                      mode="single"
                      selected={date}
                      toYear={new Date().getFullYear()}
                      classNames={{
                        day_hidden: "invisible",
                        dropdown:
                          "rounded-[5px] bg-white text-popover-foreground text-xs font-bold focus-visible:outline-none ring-offset-background",
                        caption_dropdowns: "flex gap-3",
                        vhidden: "hidden",
                        caption_label: "hidden",
                        head: "flex items-center",
                        cell: "h-8 font-medium text-center justify-center w-full",
                      }}
                      onDayClick={(e) => {
                        if (e) {
                          setDate(e);
                          if (props.setText) {
                            props.setText(e.toISOString().split("T")[0]);
                          }
                        }
                      }}
                    />
                  </>
                </PopoverContent>
              </Popover>
            </div>
          )}
          {props.isLast && (
            <div className="m-2 flex flex-col gap-2">
              <Button
                variant={"blueOutline"}
                className="w-full border-2 font-semibold rounded-md h-10 bg-white text-blueBg text-sm flex flex-row gap-2"
                onClick={() => {
                  route("/c/32167awv");
                }}
              >
                Conversation
                <SquareArrowOutUpRight size={14} />
              </Button>
              <Button
                variant={"blueOutline"}
                className="w-full border-2 font-semibold rounded-md h-10 bg-white text-blueBg text-sm flex flex-row gap-2"
                onClick={() => {
                  route("/c/32167ageew");
                }}
              >
                Registration
                <SquareArrowOutUpRight size={14} />
              </Button>
              <Button
                variant={"blueOutline"}
                className="w-full border-2 font-semibold rounded-md h-10 bg-white text-blueBg text-sm flex flex-row gap-2"
                onClick={() => {
                  route("/c/32167hwaaf");
                }}
              >
                Bulk cases Registration
                <SquareArrowOutUpRight size={14} />
              </Button>
            </div>
          )}
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
