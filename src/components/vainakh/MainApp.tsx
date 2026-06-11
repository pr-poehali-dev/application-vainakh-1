import { useState } from "react";
import BottomNav from "./BottomNav";
import FeedScreen from "./FeedScreen";
import ChatScreen from "./ChatScreen";
import SearchScreen from "./SearchScreen";
import ProfileScreen from "./ProfileScreen";
import { type UserData } from "@/pages/Index";
import { CHATS } from "./data";
import { useTheme } from "./useTheme";

type Tab = "feed" | "chat" | "search" | "profile";

interface MainAppProps {
  userData: UserData;
}

const MainApp = ({ userData }: MainAppProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const { theme, toggle } = useTheme();

  const unreadChats = CHATS.reduce((sum, c) => sum + c.unread, 0);

  const renderScreen = () => {
    switch (activeTab) {
      case "feed":    return <FeedScreen theme={theme} onThemeToggle={toggle} />;
      case "chat":    return <ChatScreen />;
      case "search":  return <SearchScreen />;
      case "profile": return <ProfileScreen userData={userData} theme={theme} onThemeToggle={toggle} />;
    }
  };

  return (
    <div
      className="flex flex-col h-screen max-w-md mx-auto relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div className="flex-1 overflow-hidden" style={{ paddingBottom: "68px" }}>
        <div className="h-full overflow-y-auto" key={activeTab}>
          {renderScreen()}
        </div>
      </div>
      <BottomNav active={activeTab} onChange={setActiveTab} unreadChats={unreadChats} />
    </div>
  );
};

export default MainApp;
