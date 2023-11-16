import { TUser } from "@/ChatProvider";

export const getSender = (loggedUser: TUser, users: TUser[]) => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};

export const getSenderPic = (loggedUser: TUser, users: TUser[]) => {
  return users[0]?._id === loggedUser?._id ? users[1].pic : users[0].pic;
};

const testString =
  "Visit https://www.example.com or http://test.example.org for more information.";

export function findDomainsAndURLs(inputText: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  let urls = inputText.match(urlRegex) as string[];
  if (!urls) urls = [];

  const domainRegex = /(?:https?:\/\/)?(?:www\.)?([^:/\n]+)/;

  const domains =
    urls?.length > 0
      ? urls.map((url) => {
          const match = url.match(domainRegex);
          if (match) return match[1];
        })
      : [];

  return [...urls, ...domains];
}
