import { useState } from "react";
import Icon from "@/components/ui/icon";
import { USERS_SEARCH } from "./data";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [added, setAdded] = useState<number[]>([]);

  const results = query.trim()
    ? USERS_SEARCH.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.city.toLowerCase().includes(query.toLowerCase())
      )
    : USERS_SEARCH;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 sticky top-0 z-10"
        style={{ background: "rgba(13,15,20,0.95)", backdropFilter: "blur(20px)" }}>
        <h2 className="text-xl font-bold text-white mb-3">Поиск</h2>
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "rgba(255,255,255,0.3)" }} />
          <input
            placeholder="Имя, фамилия или город..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl text-white placeholder-white/30 outline-none font-golos text-base"
            style={{
              background: "var(--vn-card-2)",
              border: "1px solid var(--vn-border)",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--vn-orange)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--vn-border)")}
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <Icon name="X" size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 pb-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {["Все", "Грозный", "Гудермес", "Москва", "Нальчик"].map((city) => (
          <button
            key={city}
            onClick={() => setQuery(city === "Все" ? "" : city)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
            style={{
              background: (query === city || (city === "Все" && !query)) ? "var(--vn-grad)" : "var(--vn-card-2)",
              color: (query === city || (city === "Все" && !query)) ? "white" : "rgba(255,255,255,0.5)",
              border: "1px solid var(--vn-border)",
            }}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-4">
        {results.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl">🔍</span>
            <p className="text-white/50 mt-3">Никого не нашли</p>
          </div>
        )}
        {results.map((user) => {
          const isAdded = added.includes(user.id);
          return (
            <div
              key={user.id}
              className="vn-card rounded-2xl p-4 flex items-center gap-3 animate-fade-in"
            >
              <div className="relative flex-shrink-0">
                <div className="w-13 h-13 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
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
                <div className="flex items-center gap-2 mt-0.5">
                  <Icon name="MapPin" size={11} style={{ color: "rgba(255,255,255,0.35)" }} />
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{user.city}</span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{user.friends} друзей</span>
                </div>
                {user.online ? (
                  <p className="text-xs mt-0.5 font-medium" style={{ color: "var(--vn-online)" }}>онлайн</p>
                ) : (
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {"lastSeen" in user ? String(user.lastSeen) : ""}
                  </p>
                )}
              </div>
              <button
                onClick={() => setAdded((p) => isAdded ? p.filter((id) => id !== user.id) : [...p, user.id])}
                className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: isAdded ? "rgba(255,255,255,0.08)" : "var(--vn-grad)",
                  color: isAdded ? "rgba(255,255,255,0.6)" : "white",
                }}
              >
                {isAdded ? "Друг ✓" : "+ Друг"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchScreen;
