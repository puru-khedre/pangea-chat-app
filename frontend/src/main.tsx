/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Link,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./global.css";
import Auth from "./routes/auth/index.tsx";
import ChatAreaPage from "./routes/chat/ChatAreaPage.tsx";
import ChatHome from "./routes/chat/Home.tsx";
import ChatRoot from "./routes/chat/root.tsx";
import { Button } from "./components/ui/button.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Button asChild className="m-4 text-4xl">
          <Link to={"/auth/login"} className="p-4">
            Login
          </Link>
        </Button>
        <Button asChild className="m-4 text-4xl">
          <Link to={"/auth/signup"} className="p-4">
            Signup
          </Link>
        </Button>
      </>
    ),
  },
  {
    path: "/auth/login",
    element: <Auth tab="login" />,
  },
  {
    path: "/auth/signup",
    element: <Auth tab="signup" />,
  },
  {
    path: "/chat",
    element: <ChatRoot />,

    children: [
      {
        children: [
          { index: true, element: <ChatHome /> },
          {
            path: ":roomId",
            element: <ChatAreaPage />,
            // loader: contactLoader,
            // action: contactAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
