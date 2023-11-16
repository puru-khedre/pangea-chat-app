import { ChatState, TUser } from "@/ChatProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { EyeIcon, EyeOff } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type Details = {
  email: string;
  password: string;
};

export function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [details, setDetails] = useState<Details>({
    email: "",
    password: "",
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const { setUser } = ChatState();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleLogin = async () => {
    const { email, password } = details;

    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        duration: 5000,
      });

      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = (await axios.post(
        "/api/user/login",
        { email, password },
        config
      )) as { data: TUser };

      toast({
        title: "Login Successful",
        duration: 5000,
      });

      if (data !== undefined) setUser(data as TUser);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chat");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error instanceof Error ? error.message : "",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Add your details to login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={details.email}
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <div className="flex flex-row gap-2 items-center">
              <Input
                id="password"
                type={isVisible ? "text" : "password"}
                placeholder="Strong password"
                name="password"
                onChange={handleChange}
                value={details.password}
              />

              <Toggle
                variant="outline"
                aria-label="Toggle italic"
                onPressedChange={() => setIsVisible((prev) => !prev)}
              >
                {isVisible ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </Toggle>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin}>Login</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
