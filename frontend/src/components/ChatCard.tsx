import { ChatState, TChat } from "@/ChatProvider";
import { getSenderPic } from "@/lib/chatLogics";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  title: string;
  lastMessage: string;

  chat: TChat;
};

const ChatCard = ({ title, chat }: Props) => {
  const { user } = ChatState();
  const navigate = useNavigate();

  const { selectedChat } = ChatState();
  const params = useParams();

  const isActive = chat._id === selectedChat?._id || params.roomId === chat._id;
  return (
    <div
      className={`border shadow rounded-lg p-2 mb-3 flex flex-row gap-2 items-center relative transition-colors duration-300 min-w-[400px] cursor-pointer ${
        isActive
          ? "dark:bg-green-900 dark:hover:bg-green-800 dark:border-green-700 bg-green-200 hover:bg-green-300 border-green-400"
          : "dark:bg-gray-900 dark:hover:bg-gray-800 border-border bg-gray-100 hover:bg-gray-300"
      }`}
      onClick={() => navigate("/chat/" + chat._id)}
    >
      <Avatar>
        <AvatarImage src={getSenderPic(user, chat.users)} />
        <AvatarFallback>{title.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="w-full flex-grow">
        <h3 className="font-bold text-lg">{title}</h3>
        {/* <p className="text-gray-400 md:max-w-[350px] overflow-ellipsis whitespace-nowrap overflow-hidden">
          {lastMessage}
        </p> */}
        <p className="text-gray-500 text-sm">
          {new Date(chat.updatedAt).toLocaleTimeString(undefined, {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      {/* {!isActive && (
        <Badge
          variant="secondary"
          className="dark:bg-green-800 bg-green-300 absolute right-3 top-3"
        >
          10
        </Badge>
      )} */}
    </div>
  );
};

export default ChatCard;
