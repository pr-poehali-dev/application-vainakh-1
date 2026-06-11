import { useState } from "react";
import Icon from "@/components/ui/icon";
import { STORIES, POSTS, EXPLORE_POSTS, type Post } from "./data";
import ThemeToggle from "./ThemeToggle";
import { type Theme } from "./useTheme";

interface FeedScreenProps {
  theme?: Theme;
  onThemeToggle?: () => void;
}

const PostCard = ({ post, onFire }: { post: Post; onFire: (id: number) => void }) => {
  const [fired, setFired] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden animate-fade-in"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <div className="relative">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: "var(--bg-3)" }}>
            {post.avatar}
          </div>
          {post.online && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
              style={{ background: "var(--online)", borderColor: "var(--surface)" }} />
          )}
          {!post.online && post.recentlyOnline && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
              style={{ background: "var(--recent)", borderColor: "var(--surface)" }} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>{post.name}</p>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>{post.time}</p>
        </div>
        <button><Icon name="MoreHorizontal" size={16} style={{ color: "var(--text-3)" }} /></button>
      </div>

      {post.image && (
        <img src={post.image} alt="" className="w-full object-cover" style={{ maxHeight: "260px" }} />
      )}

      {post.type === "audio" && (
        <div className="mx-4 mb-3 p-3 rounded-lg flex items-center gap-3"
          style={{ background: "var(--bg-3)", border: "1px solid var(--border)" }}>
          <button className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--accent-dark)" }}>
            <Icon name="Play" size={13} className="text-white ml-0.5" />
          </button>
          <div className="flex gap-0.5 items-end h-5 flex-1">
            {[3, 5, 8, 4, 7, 6, 9, 5, 3, 7, 4, 6, 8].map((h, i) => (
              <div key={i} className="w-1 rounded-full"
                style={{ height: `${h * 2}px`, background: i < 6 ? "var(--accent)" : "var(--border-2)" }} />
            ))}
          </div>
          <span className="text-xs font-medium" style={{ color: "var(--text-3)" }}>0:42</span>
        </div>
      )}

      {post.text && (
        <p className="px-4 py-2 text-sm leading-relaxed" style={{ color: "var(--text)" }}>{post.text}</p>
      )}

      <div className="flex items-center gap-0.5 px-3 py-2 mt-1"
        style={{ borderTop: "1px solid var(--border)" }}>
        <button
          onClick={() => { setFired((p) => !p); onFire(post.id); }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all"
          style={{
            color: fired ? "var(--accent)" : "var(--text-3)",
            background: fired ? "var(--accent-bg)" : "transparent",
            fontWeight: fired ? 600 : 400,
          }}
        >
          🔥 {post.fires + (fired ? 1 : 0)}
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm"
          style={{ color: "var(--text-3)" }}>
          <Icon name="MessageCircle" size={15} /> {post.comments}
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm"
          style={{ color: "var(--text-3)" }}>
          <Icon name="Share2" size={15} />
        </button>
        <button className="ml-auto px-3 py-2 rounded-lg" style={{ color: "var(--text-3)" }}>
          <Icon name="Bookmark" size={15} />
        </button>
      </div>
    </div>
  );
};

const FeedScreen = ({ theme, onThemeToggle }: FeedScreenProps) => {
  const [posts, setPosts] = useState(POSTS);
  const [showExplore, setShowExplore] = useState(false);
  const [activeStory, setActiveStory] = useState<number | null>(null);

  const handleFire = (id: number) =>
    setPosts((p) => p.map((post) => (post.id === id ? { ...post, fires: post.fires + 1 } : post)));

  if (showExplore) {
    return (
      <div className="flex flex-col h-full animate-fade-in">
        <div className="flex items-center gap-3 px-4 py-3 sticky top-0 z-10"
          style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
          <button onClick={() => setShowExplore(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <Icon name="ArrowLeft" size={16} style={{ color: "var(--text)" }} />
          </button>
          <h2 className="font-semibold flex-1" style={{ color: "var(--text)" }}>Популярное</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 pt-3">
          {EXPLORE_POSTS.map((post) => (
            <PostCard key={post.id} post={post} onFire={handleFire} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 sticky top-0 z-10"
        style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <span className="text-xl font-bold" style={{ color: "var(--accent)", letterSpacing: "-0.04em" }}>
          ВАЙНАХ
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExplore(true)}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <Icon name="Compass" size={16} style={{ color: "var(--text-2)" }} />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center relative"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <Icon name="Bell" size={16} style={{ color: "var(--text-2)" }} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }} />
          </button>
          {theme && onThemeToggle && <ThemeToggle theme={theme} onToggle={onThemeToggle} />}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Stories */}
        <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {STORIES.map((story, i) => (
              <button key={story.id}
                onClick={() => i > 0 && setActiveStory(story.id)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div className={i === 0 ? "" : story.seen ? "vn-story-ring-seen" : "vn-story-ring"}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl relative"
                    style={{
                      background: "var(--bg-3)",
                      border: i === 0 ? "1px solid var(--border)" : `2px solid var(--bg)`,
                    }}>
                    {story.avatar}
                    {i === 0 && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: "var(--accent-dark)", border: `2px solid var(--bg)` }}>
                        <Icon name="Plus" size={9} className="text-white" />
                      </div>
                    )}
                    {i > 0 && story.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                        style={{ background: "var(--online)", borderColor: "var(--bg)" }} />
                    )}
                  </div>
                </div>
                <span className="text-xs w-12 text-center truncate" style={{ color: "var(--text-3)" }}>
                  {story.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Story viewer */}
        {activeStory !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
            style={{ background: "rgba(6,13,31,0.97)" }}
            onClick={() => setActiveStory(null)}>
            <div className="text-center px-8">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border-2)" }}>
                {STORIES.find((s) => s.id === activeStory)?.avatar}
              </div>
              <p className="font-semibold text-base" style={{ color: "var(--text)" }}>
                {STORIES.find((s) => s.id === activeStory)?.name}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-3)" }}>
                Опубликовано {STORIES.find((s) => s.id === activeStory)?.time}
              </p>
              <div className="mt-6 w-72 h-48 rounded-xl mx-auto flex items-center justify-center"
                style={{ background: "var(--surface)", border: "1px solid var(--accent-border)" }}>
                <span className="text-5xl">🔥</span>
              </div>
              <p className="text-xs mt-5" style={{ color: "var(--text-3)" }}>Нажми, чтобы закрыть</p>
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="px-4 py-3 space-y-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onFire={handleFire} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedScreen;
