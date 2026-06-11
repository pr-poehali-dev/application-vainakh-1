import { useState } from "react";
import Icon from "@/components/ui/icon";
import { STORIES, POSTS, EXPLORE_POSTS, type Post } from "./data";

interface FeedScreenProps {
  onExplore?: () => void;
}

const OnlineDot = ({ online, recent }: { online: boolean; recent?: boolean }) => {
  if (!online && !recent) return null;
  return (
    <span
      className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
      style={{
        background: online ? "var(--vn-online)" : "var(--vn-recent)",
        borderColor: "var(--vn-dark)",
      }}
    />
  );
};

const PostCard = ({ post, onFire }: { post: Post; onFire: (id: number) => void }) => {
  const [fired, setFired] = useState(false);

  const handleFire = () => {
    setFired((p) => !p);
    onFire(post.id);
  };

  return (
    <div className="vn-card rounded-2xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: "var(--vn-card-2)" }}
          >
            {post.avatar}
          </div>
          <OnlineDot online={post.online} recent={post.recentlyOnline} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm truncate">{post.name}</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{post.time}</p>
        </div>
        <button className="p-1">
          <Icon name="MoreHorizontal" size={18} style={{ color: "rgba(255,255,255,0.3)" }} />
        </button>
      </div>

      {/* Content */}
      {post.image && (
        <div className="relative">
          <img
            src={post.image}
            alt=""
            className="w-full object-cover"
            style={{ maxHeight: "280px" }}
          />
        </div>
      )}

      {post.type === "audio" && (
        <div
          className="mx-4 mb-3 p-4 rounded-xl flex items-center gap-3"
          style={{ background: "rgba(255,107,26,0.08)", border: "1px solid rgba(255,107,26,0.2)" }}
        >
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--vn-grad)" }}
          >
            <Icon name="Play" size={16} className="text-white ml-0.5" />
          </button>
          <div className="flex-1">
            <div className="flex gap-1 items-end h-6">
              {[3, 5, 8, 4, 7, 6, 9, 5, 3, 7, 4, 6, 8, 5].map((h, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full"
                  style={{
                    height: `${h * 2}px`,
                    background: i < 6 ? "var(--vn-orange)" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>0:42</p>
          </div>
          <span className="text-xs font-semibold" style={{ color: "var(--vn-orange)" }}>1.5x</span>
        </div>
      )}

      {post.text && (
        <p className="px-4 py-2 text-sm text-white/85 leading-relaxed">{post.text}</p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 px-4 py-3 pt-1">
        <button
          onClick={handleFire}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all"
          style={{
            background: fired ? "rgba(255,107,26,0.15)" : "transparent",
            color: fired ? "var(--vn-orange)" : "rgba(255,255,255,0.5)",
          }}
        >
          <span className="text-base">{fired ? "🔥" : "🔥"}</span>
          <span className="text-sm font-semibold">{post.fires + (fired ? 1 : 0)}</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all hover:bg-white/5"
          style={{ color: "rgba(255,255,255,0.5)" }}>
          <Icon name="MessageCircle" size={17} />
          <span className="text-sm font-semibold">{post.comments}</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all hover:bg-white/5"
          style={{ color: "rgba(255,255,255,0.5)" }}>
          <Icon name="Share2" size={17} />
        </button>
        <button className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all hover:bg-white/5"
          style={{ color: "rgba(255,255,255,0.3)" }}>
          <Icon name="Bookmark" size={17} />
        </button>
      </div>
    </div>
  );
};

const FeedScreen = ({ onExplore }: FeedScreenProps) => {
  const [posts, setPosts] = useState(POSTS);
  const [showExplore, setShowExplore] = useState(false);
  const [activeStory, setActiveStory] = useState<number | null>(null);

  const handleFire = (id: number) => {
    setPosts((p) => p.map((post) => post.id === id ? { ...post, fires: post.fires + 1 } : post));
  };

  const explorePosts = EXPLORE_POSTS;

  if (showExplore) {
    return (
      <div className="flex flex-col h-full animate-fade-in">
        <div className="flex items-center gap-3 px-4 py-4 sticky top-0 z-10 vn-glass">
          <button onClick={() => setShowExplore(false)} className="p-2 rounded-xl hover:bg-white/5">
            <Icon name="ArrowLeft" size={20} className="text-white" />
          </button>
          <h2 className="text-white font-bold text-lg flex-1">🔥 Популярное</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
          {explorePosts.map((post) => (
            <PostCard key={post.id} post={post} onFire={handleFire} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-4 sticky top-0 z-10"
        style={{ background: "rgba(13,15,20,0.95)", backdropFilter: "blur(20px)" }}>
        <h1 className="text-2xl font-black vn-grad-text">ВАЙНАХ</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowExplore(true)}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/5"
            style={{ border: "1px solid var(--vn-border)" }}
          >
            <Icon name="Compass" size={20} style={{ color: "rgba(255,255,255,0.6)" }} />
          </button>
          <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/5 relative"
            style={{ border: "1px solid var(--vn-border)" }}>
            <Icon name="Bell" size={20} style={{ color: "rgba(255,255,255,0.6)" }} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "var(--vn-orange)" }} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {/* Stories */}
        <div className="px-4 py-3">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {STORIES.map((story, i) => (
              <button
                key={story.id}
                onClick={() => i > 0 && setActiveStory(story.id)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0"
              >
                <div className={i === 0 ? "" : story.seen ? "vn-story-ring-seen" : "vn-story-ring"}>
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl relative"
                    style={{
                      background: "var(--vn-card-2)",
                      border: i === 0 ? "2px solid var(--vn-border)" : "2px solid var(--vn-dark)",
                    }}
                  >
                    {story.avatar}
                    {i === 0 && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "var(--vn-orange)", border: "2px solid var(--vn-dark)" }}>
                        <Icon name="Plus" size={10} className="text-white" />
                      </div>
                    )}
                    {i > 0 && story.online && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2"
                        style={{ background: "var(--vn-online)", borderColor: "var(--vn-dark)" }} />
                    )}
                  </div>
                </div>
                <span className="text-xs text-white/60 w-14 text-center truncate">
                  {story.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Story viewer overlay */}
        {activeStory !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
            style={{ background: "rgba(0,0,0,0.95)" }}
            onClick={() => setActiveStory(null)}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
                style={{ background: "var(--vn-grad)" }}>
                {STORIES.find(s => s.id === activeStory)?.avatar}
              </div>
              <p className="text-white font-bold text-lg">{STORIES.find(s => s.id === activeStory)?.name}</p>
              <p className="text-white/50 text-sm mt-1">Опубликовано {STORIES.find(s => s.id === activeStory)?.time}</p>
              <div className="mt-6 w-72 h-48 rounded-2xl mx-auto flex items-center justify-center"
                style={{ background: "var(--vn-grad)" }}>
                <span className="text-white text-4xl">🔥</span>
              </div>
              <p className="text-white/40 text-sm mt-4">Нажми, чтобы закрыть</p>
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="px-4 space-y-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onFire={handleFire} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedScreen;
