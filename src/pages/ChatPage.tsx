import { assets } from "../assets";
import ChatSection from "../components/ChatSection";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const ChatPage = () => {
  return (
    <div className="w-full h-full flex flex-col bg-backgroundImg bg-opacity-50">
      <section className="bg-white flex-col flex gap-1 p-3 px-10">
        <span className="text-titleBlue text-xl font-bold">Add cash agent</span>
        <span className="text-greyText text-sm">
          Lorem ipsum dolor sit amet
        </span>
      </section>
      <div className="bg-[#d3e2ec8f] w-full flex-grow flex flex-col justify-between overflow-y-scroll">
        <ChatSection />
      </div>
      <section className="bg-white flex-row flex gap-1 p-3 w-full items-center justify-center">
        <div className="min-w-[860px] flex flex-row py-5 items-center gap-4">
          <div className="flex flex-row">
            <div>
              <img
                src={assets.images.avatar}
                alt="profilePic"
                className="h-auto w-12"
                height={40}
                width={40}
              />
            </div>
          </div>
          <div className="flex flex-grow">
            <Input
              type="text"
              placeholder="Type your text here"
              className="focus:border-none focus:outline-none"
            />
          </div>
          <div>
            <Button variant={"blue"} className="py-6 px-7 rounded-full">
              SEND
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatPage;
