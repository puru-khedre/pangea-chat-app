import { ChatState } from "@/ChatProvider";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  const { user } = ChatState();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/auth/login");
  };

  return (
    <div className="flex flex-row items-center justify-between h-10">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={user?.pic} alt="user-profile" />
          <AvatarFallback>
            {user?.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="">
          <p className="text-lg">{user?.name}</p>
          <p className="dark:text-white/50 text-black/50">{user?.email}</p>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <ModeToggle />
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default Header;
