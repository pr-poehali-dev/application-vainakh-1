import { useState } from "react";
import Icon from "@/components/ui/icon";
import { USERS_SEARCH } from "./data";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [added, setAdded] = useState<number[]>([]);
  const [activeCity, setActiveCity] = useState("Все");

  const cities = ["Все", "Грозный", "Гудермес", "Москва", "Нальчик"];

  const results = USERS_SEARCH.filter((u) => {
    const matchQuery = !query.trim() || u.name.toLowerCase().includes(query.toLowerCase());
    const matchCity = activeCity === "Все" || u.city === activeCity;
    return matchQuery && matchCity;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 sticky top-0 z-10"
        style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <span className="font-semibold block mb-3" style={{ color: "var(--accent)", letterSpacing: "-0.02em" }}>
          Поиск
        </span>
        <div className="relative">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-3)" }} />
          <input
            placeholder="Имя, фамилия или город..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-lg text-sm outline-none"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <Icon name="X" size={14} style={{ color: "var(--text-3)" }} />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-2.5 flex gap-2 overflow-x-auto"
        style={{ scrollbarWidth: "none", borderBottom: "1px solid var(--border)" }}>
        {cities.map((city) => {
          const isActive = activeCity === city;
          return (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: isActive ? "var(--accent-dark)" : "var(--surface)",
                color: isActive ? "#fff" : "var(--text-3)",
                border: `1px solid ${isActive ? "transparent" : "var(--border)"}`,
              }}
            >
              {city}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto">
        {results.length === 0 && (
          <div className="text-center py-16">
            <Icon name="SearchX" size={32} className="mx-auto mb-3" style={{ color: "var(--text-3)" }} />
            <p className="text-sm" style={{ color: "var(--text-3)" }}>Никого не нашли</p>
          </div>
        )}
        {results.map((user) => {
          const isAdded = added.includes(user.id);
          return (
            <div key={user.id} className="flex items-center gap-3 px-4 py-3 animate-fade-in"
              style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ background: "var(--bg-3)" }}>
                  {user.avatar}
                </div>
                {user.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                    style={{ background: "var(--online)", borderColor: "var(--bg)" }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{user.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Icon name="MapPin" size={10} style={{ color: "var(--text-3)" }} />
                  <span className="text-xs" style={{ color: "var(--text-3)" }}>{user.city}</span>
                  <span style={{ color: "var(--border-2)" }}>·</span>
                  <span className="text-xs" style={{ color: "var(--text-3)" }}>{user.friends} друзей</span>
                </div>
                {user.online ? (
                  <p className="text-xs mt-0.5 font-medium" style={{ color: "var(--online)" }}>онлайн</p>
                ) : (
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>
                    {"lastSeen" in user ? String(user.lastSeen) : ""}
                  </p>
                )}
              </div>
              <button
                onClick={() => setAdded((p) => isAdded ? p.filter((id) => id !== user.id) : [...p, user.id])}
                className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: isAdded ? "var(--surface)" : "var(--accent-dark)",
                  color: isAdded ? "var(--text-3)" : "#fff",
                  border: `1px solid ${isAdded ? "var(--border)" : "transparent"}`,
                }}
              >
                {isAdded ? "Добавлен ✓" : "+ Добавить"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchScreen;
