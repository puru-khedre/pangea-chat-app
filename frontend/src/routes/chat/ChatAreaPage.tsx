import { ChatState, TChat, TUser } from "@/ChatProvider";
import ChatHeader from "@/components/ChatHeader";
import Message from "@/components/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { PenBox, SendHorizontal } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export type TMessage = {
  chat: TChat;
  content: string;
  updatedAt: string;
  sender: TUser;
  _id: string;
  scores: string[];
};

const ChatAreaPage = () => {
  const { user, chats, selectedChat, setSelectedChat, socket } = ChatState();
  const { toast } = useToast();

  const { roomId } = useParams();

  const [messages, setMessages] = useState<TMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    if (!selectedChat || user.token === "") return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/message/${roomId}`, config);

      setMessages(data as TMessage[]);
      console.log({ data });

      console.log({ chatid: roomId });
      socket.emit("join chat", roomId);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    fetchMessages();
    socket.emit("setup", user);
  }, [roomId, user, scrollRef]);

  useEffect(() => {
    const curr = chats?.find((chat) => chat._id === roomId);
    if (curr) setSelectedChat(curr);
  }, [chats, roomId, setSelectedChat]);

  useEffect(() => {
    socket.on("message recieved", (msg: TMessage) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  if (!selectedChat?._id) return <h1>Error</h1>;

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessage) {
      console.log("if");
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        console.log({ data });

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          variant: "destructive",
          duration: 5000,
        });
      }
    }
  };

  return (
    <div className="bg-blue-300/0 rounded-xl border border-border w-full overflow-hidden relative">
      <ChatHeader />

      {/* messages */}
      <ScrollArea className="max-h-[calc(100dvh-165px)] h-full">
        <div className="flex flex-col gap-6 p-3 pb-20" ref={scrollRef}>
          <p>{messages.length}</p>
          {messages.map((msg) => (
            <Message
              text={msg.content}
              key={msg._id}
              isUser={user._id === msg.sender._id}
              msg={msg}
            />
          ))}
        </div>
      </ScrollArea>

      {/*  w-[calc(100%-20px)] right-[10px] bottom-[10px] border border-border rounded-lg */}
      <div className="absolute bottom-0 w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-t border-border">
        <form
          onSubmit={(e) => {
            sendMessage(e);
            console.log("submit");
          }}
          className="p-3 flex flex-row gap-3"
        >
          <div className="flex flex-row items-center justify-stretch border-input border pl-2 ring-offset-background h-10 w-full rounded-md bg-background text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden ">
            <Label htmlFor="search" className="">
              <PenBox />
            </Label>

            <Input
              id="search"
              type="text"
              className="border-none w-full focus-visible:ring-0 focus-visible:ring-offset-0 p-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </div>

          <Button type="submit">
            <span className="mr-1">Send</span> <SendHorizontal size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatAreaPage;
