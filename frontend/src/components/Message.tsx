import { TMessage } from "@/routes/chat/ChatAreaPage";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { findDomainsAndURLs } from "@/lib/chatLogics";

type Props = {
  text?: string;
  isUser?: boolean;
  msg: TMessage;
};

const Message: FC<Props> = ({ text, isUser = false, msg }) => {
  const urls = findDomainsAndURLs(text ?? "");
  return (
    <div
      className={`flex items-center gap-3 ${
        isUser ? "self-end flex-row-reverse" : "flex-row"
      }`}
    >
      <Avatar>
        <AvatarImage src={msg.sender.pic} />
        <AvatarFallback>
          {msg.sender.name.slice(0, 2).toLocaleUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div
        className={`max-w-xs md:max-w-sm w-max rounded-md px-2 py-1  border ${
          isUser
            ? "bg-green-500/50 border-green-600"
            : "bg-secondary border-border"
        }`}
      >
        <div>
          {text}
          {undefined}
        </div>
        <hr />
        <div className="opacity-60">
          {msg.scores.length > 0 && (
            <p className="text-base">URL and domain details</p>
          )}
          {msg.scores.map((s, i) => (
            <p>
              {s} {urls.at(i)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Message;
