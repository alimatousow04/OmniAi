import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/login-page";
import { MainLayout } from "./pages/main-layout";
import { ChatPage } from "./pages/chat-page";
import { DashboardPage } from "./pages/dashboard-page";
import { SettingsPage } from "./pages/settings-page";
import { ComponentsPage } from "./pages/components-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: ChatPage,
      },
      {
        path: "chat/:chatId?",
        Component: ChatPage,
      },
      {
        path: "dashboard",
        Component: DashboardPage,
      },
      {
        path: "settings",
        Component: SettingsPage,
      },
      {
        path: "components",
        Component: ComponentsPage,
      },
    ],
  },
]);
