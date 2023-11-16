import { ModeToggle } from "@/components/mode-toggle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Toaster } from "@/components/ui/toaster";

const Auth = ({ tab }: { tab: string }) => {
  return (
    <div className="w-full min-h-[100dvh] flex justify-center items-center relative">
      <div className="w-3/4 rounded-lg border-border">
        <Tabs defaultValue={tab} className="w-full max-w-[550px] mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" asChild>
              <Link to={"/auth/login"}>Login</Link>
            </TabsTrigger>
            <TabsTrigger value="signup" asChild>
              <Link to="/auth/signup"> Sign up</Link>
            </TabsTrigger>
          </TabsList>
          <Login />
          <Signup />
        </Tabs>
      </div>
      <div className="absolute left-4 top-4">
        <ModeToggle />
      </div>
      <Toaster />
    </div>
  );
};

export default Auth;
