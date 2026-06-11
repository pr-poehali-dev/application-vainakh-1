import { useState } from "react";
import Icon from "@/components/ui/icon";
import { type UserData } from "@/pages/Index";
import { POSTS } from "./data";
import ThemeToggle from "./ThemeToggle";
import { type Theme } from "./useTheme";

interface ProfileScreenProps {
  userData: UserData;
  theme?: Theme;
  onThemeToggle?: () => void;
}

const STATS = [
  { label: "Друзей", value: "248" },
  { label: "Огней",  value: "1.4K" },
  { label: "Постов", value: "37" },
];

const ProfileScreen = ({ userData, theme, onThemeToggle }: ProfileScreenProps) => {
  const [activeTab, setActiveTab] = useState<"posts" | "photos" | "audio">("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userData.firstName);
  const [editLastName, setEditLastName] = useState(userData.lastName);

  const myPosts = POSTS.slice(0, 3);

  const inputStyle = {
    background: "var(--surface)",
    border: "1px solid var(--accent)",
    color: "var(--text)",
    outline: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    fontSize: "14px",
    width: "100%",
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 sticky top-0 z-10"
        style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <span className="font-semibold" style={{ color: "var(--accent)", letterSpacing: "-0.02em" }}>
          Профиль
        </span>
        <div className="flex items-center gap-2">
          {theme && onThemeToggle && <ThemeToggle theme={theme} onToggle={onThemeToggle} />}
          <button className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <Icon name="Share2" size={14} style={{ color: "var(--text-2)" }} />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <Icon name="Settings" size={14} style={{ color: "var(--text-2)" }} />
          </button>
        </div>
      </div>

      {/* Avatar + info */}
      <div className="px-4 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{
                background: "var(--accent-dark)",
                boxShadow: "0 0 24px rgba(59,130,246,0.35)",
                color: "#fff",
              }}>
              {userData.firstName.charAt(0).toUpperCase() || "В"}
            </div>
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2"
              style={{ background: "var(--online)", borderColor: "var(--bg)" }} />
          </div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2">
                <input value={editName} onChange={(e) => setEditName(e.target.value)} style={inputStyle} />
                <input value={editLastName} onChange={(e) => setEditLastName(e.target.value)} style={inputStyle} />
                <div className="flex gap-2">
                  <button onClick={() => setIsEditing(false)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold text-white"
                    style={{ background: "var(--accent-dark)" }}>
                    Сохранить
                  </button>
                  <button onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg text-xs"
                    style={{ background: "var(--surface)", color: "var(--text-3)", border: "1px solid var(--border)" }}>
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold" style={{ color: "var(--text)", letterSpacing: "-0.02em" }}>
                    {editName} {editLastName}
                  </h3>
                  <button onClick={() => setIsEditing(true)}>
                    <Icon name="Pencil" size={13} style={{ color: "var(--text-3)" }} />
                  </button>
                </div>
                <p className="text-xs mt-0.5 font-medium" style={{ color: "var(--online)" }}>онлайн</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>{userData.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-2 mt-5">
          {STATS.map((s) => (
            <div key={s.label} className="flex-1 py-3 px-2 rounded-xl text-center"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <p className="text-base font-bold" style={{ color: "var(--accent)" }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Badge */}
        <div className="mt-3 px-4 py-3 rounded-xl flex items-center gap-3"
          style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}>
          <span className="text-lg">🔥</span>
          <div className="flex-1">
            <p className="text-sm font-medium" style={{ color: "var(--text)" }}>Огонь недели</p>
            <p className="text-xs" style={{ color: "var(--text-3)" }}>Топ-10 по активности</p>
          </div>
          <span className="text-base">👑</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex sticky top-[49px] z-10"
        style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        {(["posts", "photos", "audio"] as const).map((tab) => {
          const labels = { posts: "Посты", photos: "Фото", audio: "Аудио" };
          const isActive = activeTab === tab;
          return (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="flex-1 py-3 text-sm relative transition-all"
              style={{ color: isActive ? "var(--accent)" : "var(--text-3)", fontWeight: isActive ? 600 : 400 }}>
              {labels[tab]}
              {isActive && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full"
                  style={{ background: "var(--accent)" }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="px-4 py-3 pb-24 space-y-3">
        {activeTab === "posts" && myPosts.map((post) => (
          <div key={post.id} className="rounded-xl overflow-hidden"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            {post.image && (
              <img src={post.image} alt="" className="w-full object-cover" style={{ maxHeight: "180px" }} />
            )}
            {post.type === "audio" && (
              <div className="p-4 flex items-center gap-3">
                <button className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--accent-dark)" }}>
                  <Icon name="Play" size={13} className="text-white ml-0.5" />
                </button>
                <div className="flex gap-0.5 items-end h-5 flex-1">
                  {[3, 5, 8, 4, 7, 6, 9, 5, 3, 7, 4, 6].map((h, i) => (
                    <div key={i} className="w-1 rounded-full"
                      style={{ height: `${h * 2}px`, background: "var(--border-2)" }} />
                  ))}
                </div>
              </div>
            )}
            {post.text && (
              <p className="px-4 py-3 text-sm" style={{ color: "var(--text)" }}>{post.text}</p>
            )}
            <div className="flex items-center gap-3 px-4 py-2.5"
              style={{ borderTop: "1px solid var(--border)" }}>
              <span className="text-xs" style={{ color: "var(--text-3)" }}>🔥 {post.fires}</span>
              <span className="text-xs" style={{ color: "var(--text-3)" }}>💬 {post.comments}</span>
              <span className="ml-auto text-xs" style={{ color: "var(--text-3)" }}>{post.time}</span>
            </div>
          </div>
        ))}

        {activeTab === "photos" && (
          <div className="grid grid-cols-3 gap-2">
            {[
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=70",
              "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=200&q=70",
              "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=70",
              "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&q=70",
              "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&q=70",
            ].map((url, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden">
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="aspect-square rounded-lg flex items-center justify-center"
              style={{ background: "var(--surface)", border: "1px dashed var(--border-2)" }}>
              <Icon name="Plus" size={20} style={{ color: "var(--accent)" }} />
            </div>
          </div>
        )}

        {activeTab === "audio" && (
          <div className="space-y-2">
            {["Вайнах — в сердце", "Горный ветер", "Распев #1"].map((title, i) => (
              <div key={i} className="rounded-xl p-3.5 flex items-center gap-3"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <button className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: "var(--accent-dark)" }}>
                  <Icon name="Play" size={13} className="text-white ml-0.5" />
                </button>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>0:{(i + 1) * 14}</p>
                </div>
                <span className="text-xs" style={{ color: "var(--accent)" }}>🔥 {(i + 1) * 47}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
