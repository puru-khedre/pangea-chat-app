import ChatProvider from "@/ChatProvider";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const ChatRoot = () => {
  return (
    <ChatProvider>
      <>
        <div className="w-full h-[100dvh] max-h-[100dvh] flex flex-col gap-3 p-3">
          <div className="bg-red-300/0 rounded-xl p-3 border border-border h-20 ">
            <Header />
          </div>
          <div className="flex flex-row h-full gap-3">
            <div className="bg-green-300/0 rounded-xl p-3 border border-border">
              <Sidebar />
            </div>
            <Outlet />
          </div>
        </div>
        <Toaster />
      </>
    </ChatProvider>
  );
};

export default ChatRoot;
