import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CHATS, MESSAGES, type ChatUser, type Message } from "./data";

const OnlineBadge = ({ user }: { user: ChatUser }) => {
  if (user.online)         return <span className="text-xs font-medium" style={{ color: "var(--online)" }}>онлайн</span>;
  if (user.recentlyOnline) return <span className="text-xs" style={{ color: "var(--recent)" }}>только что</span>;
  return <span className="text-xs" style={{ color: "var(--text-3)" }}>{user.lastSeen}</span>;
};

const ChatWindow = ({ user, onBack }: { user: ChatUser; onBack: () => void }) => {
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const [input, setInput] = useState("");
  const [speed, setSpeed] = useState(1);

  const send = () => {
    if (!input.trim()) return;
    setMessages((p) => [
      ...p,
      { id: Date.now(), fromMe: true, text: input.trim(),
        time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center gap-3 px-4 py-3 sticky top-0 z-10"
        style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <button onClick={onBack} className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <Icon name="ArrowLeft" size={16} style={{ color: "var(--text)" }} />
        </button>
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
            style={{ background: "var(--bg-3)" }}>
            {user.avatar}
          </div>
          {user.online && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
              style={{ background: "var(--online)", borderColor: "var(--bg)" }} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{user.name}</p>
          <OnlineBadge user={user} />
        </div>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}>
          <Icon name="Phone" size={15} style={{ color: "var(--accent)" }} />
        </button>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}>
          <Icon name="Video" size={15} style={{ color: "var(--accent)" }} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"} animate-fade-in`}>
            <div className="max-w-xs px-3.5 py-2.5 rounded-2xl relative"
              style={{
                background: msg.fromMe ? "var(--accent-dark)" : "var(--surface)",
                border: msg.fromMe ? "none" : "1px solid var(--border)",
                borderBottomRightRadius: msg.fromMe ? "4px" : "16px",
                borderBottomLeftRadius:  msg.fromMe ? "16px" : "4px",
              }}>
              <p className="text-sm leading-relaxed text-white">{msg.text}</p>
              <p className="text-xs mt-0.5 text-right"
                style={{ color: msg.fromMe ? "rgba(255,255,255,0.5)" : "var(--text-3)" }}>
                {msg.time}
                {msg.fromMe && <Icon name="CheckCheck" size={11} className="inline ml-1" />}
              </p>
              {msg.reaction && (
                <span className="absolute -bottom-2 -right-1 text-sm px-1 rounded-full border"
                  style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  {msg.reaction}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Audio demo */}
        <div className="flex justify-start">
          <div className="max-w-xs px-3.5 py-3 rounded-2xl"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderBottomLeftRadius: "4px" }}>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--accent-dark)" }}>
                <Icon name="Play" size={12} className="text-white ml-0.5" />
              </button>
              <div className="flex gap-0.5 items-end h-5">
                {[2, 4, 6, 3, 7, 5, 4, 6, 3, 5].map((h, i) => (
                  <div key={i} className="w-1 rounded-full"
                    style={{ height: `${h * 2}px`, background: "var(--border-2)" }} />
                ))}
              </div>
              <button onClick={() => setSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
                className="text-xs font-semibold px-1.5 py-0.5 rounded"
                style={{ background: "var(--accent-bg)", color: "var(--accent)" }}>
                {speed}x
              </button>
            </div>
            <p className="text-xs mt-1.5" style={{ color: "var(--text-3)" }}>0:12 · 12:41</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 flex items-end gap-2"
        style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <button className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <Icon name="Smile" size={18} style={{ color: "var(--text-3)" }} />
        </button>
        <textarea
          placeholder="Сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          rows={1}
          className="flex-1 px-3.5 py-2.5 rounded-xl text-sm resize-none outline-none"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", maxHeight: "100px" }}
        />
        <button onClick={send}
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--accent-dark)" }}>
          <Icon name={input.trim() ? "Send" : "Mic"} size={15} className="text-white" />
        </button>
      </div>
    </div>
  );
};

const ChatScreen = () => {
  const [openChat, setOpenChat] = useState<ChatUser | null>(null);
  const [search, setSearch] = useState("");

  if (openChat) return <ChatWindow user={openChat} onBack={() => setOpenChat(null)} />;

  const filtered = CHATS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 sticky top-0 z-10"
        style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <span className="font-semibold" style={{ color: "var(--accent)", letterSpacing: "-0.02em" }}>
          Сообщения
        </span>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}>
          <Icon name="Edit" size={15} style={{ color: "var(--accent)" }} />
        </button>
      </div>

      <div className="px-4 py-2.5">
        <div className="relative">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-3)" }} />
          <input
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.map((chat) => (
          <button key={chat.id} onClick={() => setOpenChat(chat)}
            className="w-full flex items-center gap-3 px-4 py-3 transition-all text-left"
            style={{ borderBottom: "1px solid var(--border)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl"
                style={{ background: "var(--bg-3)" }}>
                {chat.avatar}
              </div>
              {chat.online && (
                <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full border-2"
                  style={{ background: "var(--online)", borderColor: "var(--bg)" }} />
              )}
              {!chat.online && chat.recentlyOnline && (
                <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full border-2"
                  style={{ background: "var(--recent)", borderColor: "var(--bg)" }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{chat.name}</p>
                <span className="text-xs ml-2 flex-shrink-0" style={{ color: "var(--text-3)" }}>{chat.time}</span>
              </div>
              <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-3)" }}>{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white"
                style={{ background: "var(--accent-dark)" }}>
                {chat.unread}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatScreen;
