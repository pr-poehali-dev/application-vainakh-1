import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CHATS, MESSAGES, type ChatUser, type Message } from "./data";

const OnlineBadge = ({ user }: { user: ChatUser }) => {
  if (user.online) return <span className="text-xs font-medium" style={{ color: "var(--vn-online)" }}>онлайн</span>;
  if (user.recentlyOnline) return <span className="text-xs" style={{ color: "var(--vn-recent)" }}>был только что</span>;
  return <span className="text-xs text-white/35">{user.lastSeen}</span>;
};

const ChatWindow = ({ user, onBack }: { user: ChatUser; onBack: () => void }) => {
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const [input, setInput] = useState("");
  const [speed, setSpeed] = useState(1);

  const send = () => {
    if (!input.trim()) return;
    setMessages((p) => [...p, {
      id: Date.now(), fromMe: true, text: input.trim(), time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" })
    }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 sticky top-0 z-10 vn-glass">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-white/5">
          <Icon name="ArrowLeft" size={20} className="text-white" />
        </button>
        <div className="relative">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ background: "var(--vn-card-2)" }}>
            {user.avatar}
          </div>
          {user.online && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
              style={{ background: "var(--vn-online)", borderColor: "var(--vn-dark)" }} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm">{user.name}</p>
          <OnlineBadge user={user} />
        </div>
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/5">
            <Icon name="Phone" size={18} style={{ color: "var(--vn-orange)" }} />
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/5">
            <Icon name="Video" size={18} style={{ color: "var(--vn-orange)" }} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"} animate-fade-in`}>
            <div
              className="max-w-xs px-4 py-2.5 rounded-2xl relative"
              style={{
                background: msg.fromMe ? "var(--vn-grad)" : "var(--vn-card-2)",
                borderBottomRightRadius: msg.fromMe ? "4px" : "16px",
                borderBottomLeftRadius: msg.fromMe ? "16px" : "4px",
              }}
            >
              <p className="text-white text-sm leading-relaxed">{msg.text}</p>
              <p className="text-xs mt-0.5 text-right"
                style={{ color: msg.fromMe ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)" }}>
                {msg.time}
                {msg.fromMe && <Icon name="CheckCheck" size={12} className="inline ml-1" />}
              </p>
              {msg.reaction && (
                <span className="absolute -bottom-2 -right-1 text-sm bg-[var(--vn-card)] rounded-full px-1 border border-[var(--vn-border)]">
                  {msg.reaction}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Audio message demo */}
        <div className="flex justify-start">
          <div className="max-w-xs px-4 py-3 rounded-2xl" style={{ background: "var(--vn-card-2)", borderBottomLeftRadius: "4px" }}>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--vn-grad)" }}>
                <Icon name="Play" size={12} className="text-white ml-0.5" />
              </button>
              <div className="flex gap-0.5 items-end h-5">
                {[2, 4, 6, 3, 7, 5, 4, 6, 3, 5].map((h, i) => (
                  <div key={i} className="w-1 rounded-full" style={{ height: `${h * 2}px`, background: "rgba(255,255,255,0.3)" }} />
                ))}
              </div>
              <button
                onClick={() => setSpeed((s) => s === 1 ? 1.5 : s === 1.5 ? 2 : 1)}
                className="text-xs font-bold px-1.5 py-0.5 rounded"
                style={{ background: "rgba(255,107,26,0.2)", color: "var(--vn-orange)" }}>
                {speed}x
              </button>
            </div>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>0:12 · 12:41</p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 vn-glass flex items-end gap-2">
        <button className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-white/5">
          <Icon name="Smile" size={22} style={{ color: "rgba(255,255,255,0.4)" }} />
        </button>
        <div className="flex-1 relative">
          <textarea
            placeholder="Сообщение..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            rows={1}
            className="w-full px-4 py-2.5 rounded-xl text-white placeholder-white/30 outline-none resize-none transition-all font-golos text-sm"
            style={{
              background: "var(--vn-card-2)",
              border: "1px solid var(--vn-border)",
              maxHeight: "100px",
            }}
          />
        </div>
        {input.trim() ? (
          <button onClick={send} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--vn-grad)" }}>
            <Icon name="Send" size={18} className="text-white" />
          </button>
        ) : (
          <button className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--vn-grad)" }}>
            <Icon name="Mic" size={18} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

const ChatScreen = () => {
  const [openChat, setOpenChat] = useState<ChatUser | null>(null);
  const [search, setSearch] = useState("");

  if (openChat) {
    return <ChatWindow user={openChat} onBack={() => setOpenChat(null)} />;
  }

  const filtered = CHATS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 sticky top-0 z-10"
        style={{ background: "rgba(13,15,20,0.95)", backdropFilter: "blur(20px)" }}>
        <h2 className="text-xl font-bold text-white">Сообщения</h2>
        <button className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/5"
          style={{ border: "1px solid var(--vn-border)" }}>
          <Icon name="Edit" size={18} style={{ color: "var(--vn-orange)" }} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }} />
          <input
            placeholder="Поиск по чатам..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-white placeholder-white/30 outline-none font-golos text-sm"
            style={{ background: "var(--vn-card-2)", border: "1px solid var(--vn-border)" }}
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setOpenChat(chat)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/3 transition-all"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
          >
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ background: "var(--vn-card-2)" }}>
                {chat.avatar}
              </div>
              {chat.online && (
                <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2"
                  style={{ background: "var(--vn-online)", borderColor: "var(--vn-dark)" }} />
              )}
              {!chat.online && chat.recentlyOnline && (
                <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2"
                  style={{ background: "var(--vn-recent)", borderColor: "var(--vn-dark)" }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold text-sm truncate">{chat.name}</p>
                <span className="text-xs ml-2 flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>{chat.time}</span>
              </div>
              <p className="text-sm truncate mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold flex-shrink-0"
                style={{ background: "var(--vn-orange)" }}>
                {chat.unread}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatScreen;
