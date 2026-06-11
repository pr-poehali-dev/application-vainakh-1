import Icon from "@/components/ui/icon";

type Tab = "feed" | "chat" | "search" | "profile";

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
  unreadChats?: number;
}

const tabs: { id: Tab; icon: string; label: string }[] = [
  { id: "feed",    icon: "Home",          label: "Лента"   },
  { id: "chat",    icon: "MessageCircle", label: "Чат"     },
  { id: "search",  icon: "Search",        label: "Поиск"   },
  { id: "profile", icon: "User",          label: "Профиль" },
];

const BottomNav = ({ active, onChange, unreadChats = 0 }: BottomNavProps) => (
  <nav
    className="fixed bottom-0 left-0 right-0 z-50 flex items-center"
    style={{
      background: "var(--bg)",
      borderTop: "1px solid var(--border)",
      height: "68px",
      maxWidth: "448px",
      marginLeft: "auto",
      marginRight: "auto",
    }}
  >
    {tabs.map((tab) => {
      const isActive = active === tab.id;
      return (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className="flex-1 flex flex-col items-center justify-center gap-1 h-full relative transition-all"
        >
          {tab.id === "chat" && unreadChats > 0 && (
            <span
              className="absolute top-2.5 right-1/4 w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
              style={{ background: "var(--danger)", fontSize: "9px" }}
            >
              {unreadChats}
            </span>
          )}
          <Icon
            name={tab.icon}
            size={20}
            style={{
              color: isActive ? "var(--text)" : "var(--text-3)",
              strokeWidth: isActive ? 2.5 : 1.8,
            }}
          />
          <span
            className="text-xs tracking-tight"
            style={{
              color: isActive ? "var(--text)" : "var(--text-3)",
              fontWeight: isActive ? 600 : 400,
            }}
          >
            {tab.label}
          </span>
        </button>
      );
    })}
  </nav>
);

export default BottomNav;
