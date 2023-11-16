import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useNavigate } from "react-router-dom";
import { ChatState, TChat } from "@/ChatProvider";
import { useToast } from "./ui/use-toast";
import axios from "axios";

type TUser = {
  name: string;
  _id: string;
  email: string;
};

export function NewChat() {
  const [users, setUsers] = useState<TUser[]>([]);

  const [search, setSearch] = useState("");

  const { user } = ChatState();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { chats, setChats, setSelectedChat } = ChatState();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) {
      toast({
        title: "Please Enter something in search",
        duration: 5000,
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setUsers(data as TUser[]);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const createOrAccessChat = async (userId: string) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats) setChats([]);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data as TChat);
      // setLoadingChat(false);
      // onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error instanceof Error ? error.message : "",

        duration: 5000,
      });
    }
  };

  const ref = useRef<HTMLButtonElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon size={18} className="mr-1" />
          New Chat
        </Button>
      </DialogTrigger>
      <DialogClose className="hidden" ref={ref}>
        x
      </DialogClose>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new chat</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single chat</TabsTrigger>
            <TabsTrigger value="group">Group chat</TabsTrigger>
          </TabsList>
          <TabsContent value="single">
            <Card>
              <CardHeader>
                <CardTitle>Single Chat</CardTitle>
                <CardDescription>
                  Enter your friends email or name
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <form className="flex flex-row gap-2" onSubmit={handleSearch}>
                  <Input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="email or name"
                  />
                  <Button type="submit">Find</Button>
                </form>
                {users.length >= 0 && (
                  <ScrollArea className="h-44 pr-2">
                    {users.map((user) => (
                      <div
                        className="bg-secondary p-2 rounded-md mb-2 cursor-pointer"
                        key={user._id}
                        onClick={() => {
                          createOrAccessChat(user._id);
                          navigate("/chat/" + user._id);
                          ref.current?.click();
                        }}
                      >
                        <p>{user.name}</p>
                        <p className="text-xs opacity-70">{user.email}</p>
                      </div>
                    ))}
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="group">
            <Card className="p-3">
              <CardTitle>Not implemented</CardTitle>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
