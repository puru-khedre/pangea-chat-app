import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/components/ui/use-toast";
import { EyeIcon, EyeOff } from "lucide-react";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState, TUser } from "@/ChatProvider";

type Details = {
  email: string;
  password: string;
  name: string;
};

export function Signup() {
  const [isVisible, setIsVisible] = useState(false);
  const [details, setDetails] = useState<Details>({
    email: "",
    password: "",
    name: "",
  });

  const { setUser } = ChatState();

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSignup = async () => {
    toast({
      title: "Please Fill all the Feilds",
    });

    const { email, name, password } = details;
    if (!name || !email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        duration: 3000,
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
        },
        config
      );
      toast({
        title: "Registration Successful",
        duration: 3000,
      });

      setUser(data as TUser);

      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/chat");
    } catch (error) {
      toast({
        title: "Error Occured!",
        variant: "destructive",
        description: error instanceof Error ? error.message : "",
        duration: 5000,
      });
    }
  };
  return (
    <TabsContent value="signup">
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Your Name</Label>
            <Input
              required
              id="name"
              type="text"
              placeholder="Jane doe"
              name="name"
              onChange={handleChange}
              value={details.name}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
              type="email"
              placeholder="user@example.com"
              name="email"
              onChange={handleChange}
              value={details.email}
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
          <Button onClick={handleSignup}>Signup</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
