import { ChatState } from "@/ChatProvider";
import { getSender, getSenderPic } from "@/lib/chatLogics";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ChatHeader = () => {
  // const { roomId } = useParams();
  const { selectedChat, user } = ChatState();

  if (!selectedChat?._id) return <h1>Error</h1>;

  const otherUser = getSender(user, selectedChat?.users);

  return (
    <div className="h-14 shadow-lg p-3 flex flex-row items-center border-b border-border">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={getSenderPic(user, selectedChat.users)} />
          <AvatarFallback>{otherUser.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <p className="text-xl">{otherUser}</p>
          {/* <Skeleton className="h-4 w-[200px]" /> */}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
