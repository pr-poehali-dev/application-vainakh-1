import { useState } from "react";
import Icon from "@/components/ui/icon";
import { type UserData } from "@/pages/Index";
import { POSTS } from "./data";

interface ProfileScreenProps {
  userData: UserData;
}

const STATS = [
  { label: "Друзей", value: "248" },
  { label: "Огней", value: "1.4K" },
  { label: "Постов", value: "37" },
];

const ProfileScreen = ({ userData }: ProfileScreenProps) => {
  const [activeTab, setActiveTab] = useState<"posts" | "photos" | "audio">("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userData.firstName);
  const [editLastName, setEditLastName] = useState(userData.lastName);

  const myPosts = POSTS.slice(0, 3);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 sticky top-0 z-10"
        style={{ background: "rgba(13,15,20,0.95)", backdropFilter: "blur(20px)" }}>
        <h2 className="text-xl font-bold text-white">Профиль</h2>
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/5"
            style={{ border: "1px solid var(--vn-border)" }}>
            <Icon name="Share2" size={16} style={{ color: "rgba(255,255,255,0.6)" }} />
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/5"
            style={{ border: "1px solid var(--vn-border)" }}>
            <Icon name="Settings" size={16} style={{ color: "rgba(255,255,255,0.6)" }} />
          </button>
        </div>
      </div>

      {/* Profile banner */}
      <div className="relative mx-4 mb-4">
        <div className="h-28 rounded-2xl overflow-hidden relative"
          style={{ background: "var(--vn-grad)" }}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 right-4 text-6xl">🔥</div>
            <div className="absolute bottom-2 left-4 text-4xl">⚡</div>
          </div>
        </div>

        <div className="absolute -bottom-6 left-5">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl relative"
            style={{ background: "var(--vn-dark)", border: "3px solid var(--vn-dark)" }}>
            <div className="w-full h-full rounded-xl flex items-center justify-center"
              style={{ background: "var(--vn-grad)" }}>
              {userData.firstName.charAt(0) || "👤"}
            </div>
            <span className="absolute -bottom-1 -right-1 text-sm bg-[var(--vn-online)] rounded-full w-5 h-5 flex items-center justify-center border-2"
              style={{ borderColor: "var(--vn-dark)" }}>
              🟢
            </span>
          </div>
        </div>
      </div>

      {/* Name block */}
      <div className="px-5 pt-8 pb-4">
        {isEditing ? (
          <div className="space-y-2 mb-3">
            <input value={editName} onChange={e => setEditName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-white text-lg font-bold outline-none"
              style={{ background: "var(--vn-card-2)", border: "1px solid var(--vn-orange)" }} />
            <input value={editLastName} onChange={e => setEditLastName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-white text-lg font-bold outline-none"
              style={{ background: "var(--vn-card-2)", border: "1px solid var(--vn-orange)" }} />
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(false)} className="flex-1 py-2 rounded-xl text-sm font-semibold vn-btn">
                Сохранить
              </button>
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-xl text-sm"
                style={{ background: "var(--vn-card-2)", color: "rgba(255,255,255,0.5)" }}>
                Отмена
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="text-white text-xl font-bold">
                {editName || userData.firstName} {editLastName || userData.lastName}
              </h3>
              <p className="text-sm font-medium mt-0.5" style={{ color: "var(--vn-online)" }}>онлайн</p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{userData.email}</p>
            </div>
            <button onClick={() => setIsEditing(true)} className="p-2 rounded-xl hover:bg-white/5">
              <Icon name="Pencil" size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="flex gap-3 mt-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex-1 text-center py-3 rounded-xl"
              style={{ background: "var(--vn-card-2)", border: "1px solid var(--vn-border)" }}>
              <p className="text-white font-black text-lg">{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="mt-4 p-3 rounded-xl flex items-center gap-3"
          style={{ background: "rgba(255,107,26,0.08)", border: "1px solid rgba(255,107,26,0.2)" }}>
          <span className="text-2xl">🔥</span>
          <div>
            <p className="text-white font-semibold text-sm">Огонь недели</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Ты в топ-10 по активности!</p>
          </div>
          <span className="ml-auto text-lg">👑</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 flex gap-2 border-b" style={{ borderColor: "var(--vn-border)" }}>
        {(["posts", "photos", "audio"] as const).map((tab) => {
          const labels = { posts: "Посты", photos: "Фото", audio: "Аудио" };
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="pb-3 px-3 text-sm font-semibold transition-all relative"
              style={{ color: activeTab === tab ? "var(--vn-orange)" : "rgba(255,255,255,0.4)" }}
            >
              {labels[tab]}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: "var(--vn-grad)" }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="px-4 py-4 pb-24 space-y-3">
        {activeTab === "posts" && myPosts.map((post) => (
          <div key={post.id} className="vn-card rounded-2xl overflow-hidden">
            {post.image && (
              <img src={post.image} alt="" className="w-full object-cover" style={{ maxHeight: "200px" }} />
            )}
            {post.type === "audio" && (
              <div className="p-4 flex items-center gap-3">
                <button className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: "var(--vn-grad)" }}>
                  <Icon name="Play" size={14} className="text-white ml-0.5" />
                </button>
                <div className="flex gap-0.5 items-end h-6 flex-1">
                  {[3,5,8,4,7,6,9,5,3,7,4,6].map((h,i) => (
                    <div key={i} className="w-1 rounded-full" style={{ height: `${h*2}px`, background: "rgba(255,255,255,0.2)" }} />
                  ))}
                </div>
              </div>
            )}
            {post.text && <p className="px-4 py-3 text-sm text-white/80">{post.text}</p>}
            <div className="flex items-center gap-3 px-4 pb-3">
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>🔥 {post.fires}</span>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>💬 {post.comments}</span>
              <span className="ml-auto text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{post.time}</span>
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
              <div key={i} className="aspect-square rounded-xl overflow-hidden">
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="aspect-square rounded-xl flex items-center justify-center"
              style={{ background: "var(--vn-card-2)", border: "2px dashed var(--vn-border)" }}>
              <Icon name="Plus" size={24} style={{ color: "rgba(255,255,255,0.3)" }} />
            </div>
          </div>
        )}

        {activeTab === "audio" && (
          <div className="space-y-2">
            {["Вайнах — в сердце", "Горный ветер", "Распев #1"].map((title, i) => (
              <div key={i} className="vn-card rounded-xl p-4 flex items-center gap-3">
                <button className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: "var(--vn-grad)" }}>
                  <Icon name="Play" size={14} className="text-white ml-0.5" />
                </button>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">{title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>0:{(i + 1) * 14}</p>
                </div>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>🔥 {(i + 1) * 47}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
