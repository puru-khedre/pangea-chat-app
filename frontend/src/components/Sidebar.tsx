import { ChatState } from "@/ChatProvider";
import { getSender } from "@/lib/chatLogics";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import { NewChat } from "./NewChat";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { useToast } from "./ui/use-toast";

const Sidebar = () => {
  const [search, setSearch] = useState("");

  const { user, setChats, chats } = ChatState();

  const { toast } = useToast();

  const fetchChats = async () => {
    try {
      if (user?.token) {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };

        const { data } = await axios.get("/api/chat", config);
        setChats(data);
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    fetchChats();
  }, [user]);

  return (
    <div className="h-full flex flex-col w-full">
      <div className="mb-3 flex flex-row justify-between items-center">
        <h2 className="text-2xl font-medium">Your Messages</h2>

        <NewChat />
      </div>

      {/* Search input */}
      <div className="flex flex-row items-center justify-stretch border-input border pl-2 ring-offset-background h-10 w-full rounded-md bg-background text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden ">
        <Label htmlFor="message_input" className="">
          <Search />
        </Label>

        <Input
          id="message_input"
          type="text"
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Separator className="my-3" />

      <ScrollArea className="max-h-[calc(100dvh-240px)] pr-3">
        {chats
          ?.filter((chat) =>
            getSender(user, chat.users)
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())
          )
          .map((chat) => {
            const { users, _id } = chat;
            return (
              <div onClick={() => setSearch("")} key={_id}>
                <ChatCard
                  title={getSender(user, users)}
                  lastMessage="last message"
                  chat={chat}
                />
              </div>
            );
          })}
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
