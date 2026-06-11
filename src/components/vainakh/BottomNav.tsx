import Icon from "@/components/ui/icon";

type Tab = "feed" | "chat" | "search" | "profile";

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
  unreadChats?: number;
}

const tabs: { id: Tab; icon: string; label: string }[] = [
  { id: "feed", icon: "Home", label: "Лента" },
  { id: "chat", icon: "MessageCircle", label: "Чат" },
  { id: "search", icon: "Search", label: "Поиск" },
  { id: "profile", icon: "User", label: "Профиль" },
];

const BottomNav = ({ active, onChange, unreadChats = 0 }: BottomNavProps) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 py-2 safe-area-inset"
      style={{
        background: "rgba(13,15,20,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid var(--vn-border)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="flex flex-col items-center gap-1 py-1 px-4 relative transition-all"
          >
            {tab.id === "chat" && unreadChats > 0 && (
              <span
                className="absolute top-0 right-2 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center font-bold"
                style={{ background: "var(--vn-orange)", fontSize: "10px" }}
              >
                {unreadChats}
              </span>
            )}
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl transition-all"
              style={{
                background: isActive ? "rgba(255,107,26,0.15)" : "transparent",
              }}
            >
              <Icon
                name={tab.icon}
                size={22}
                style={{
                  color: isActive ? "var(--vn-orange)" : "rgba(255,255,255,0.35)",
                  strokeWidth: isActive ? 2.5 : 1.8,
                }}
              />
            </div>
            <span
              className="text-xs font-medium"
              style={{ color: isActive ? "var(--vn-orange)" : "rgba(255,255,255,0.35)" }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
