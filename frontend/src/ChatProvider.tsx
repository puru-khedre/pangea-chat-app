import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import io, { Socket } from "socket.io-client";
const ENDPOINT = "http://localhost:3001"; // "https://talk-a-tive.herokuapp.com"; -> After deployment

export type TUser = {
  email: string;
  isAdmin: boolean;
  name: string;
  pic: string;
  token?: string;
  _id: string;
};

export type TChat = {
  _id: string;
  chatName: string;
  isGroupChat?: boolean;
  updatedAt: string;
  users: TUser[];
};

export type TState = {
  selectedChat?: TChat;
  user: TUser;
  notification?: string[];
  chats: TChat[];
  setSelectedChat: (chat: TChat) => void;
  setUser: (user: TUser) => void;
  setNotification?: () => void;
  setChats: (chat: TChat[]) => void;
  socket: Socket;
};

const tempUser: TUser = {
  email: "",
  _id: "",
  isAdmin: false,
  name: "",
  pic: "",
  token: "",
};
const chat: TChat = {
  _id: "",
  chatName: "",
  updatedAt: "",
  users: [tempUser],
  isGroupChat: false,
};

const ChatContext = createContext<TState>({
  selectedChat: chat,
  user: tempUser,
  chats: [],
  notification: [],
  setSelectedChat: () => {},
  setUser: () => {},
  setNotification: () => {},
  setChats: () => {},
  socket: io(),
});

type Props = {
  children: React.ReactElement;
};
const ChatProvider: FC<Props> = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<TChat>(chat);
  const [user, setUser] = useState<TUser>(tempUser);
  //   const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState<TChat[]>([]);

  const socketRef = useRef<Socket>(io());

  const navigate = useNavigate();
  // const

  useEffect(() => {
    socketRef.current = io(ENDPOINT);
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") ?? "{}");

    if (!userInfo.token) {
      navigate("/auth/login");
    }

    setUser(userInfo);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, navigate]);

  useEffect(() => {
    console.log({ user, chats, selectedChat });
  }, [user, chats, selectedChat]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        // notification,
        // setNotification,
        chats,
        socket: socketRef.current,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
