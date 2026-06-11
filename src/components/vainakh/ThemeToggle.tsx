import Icon from "@/components/ui/icon";
import { type Theme } from "./useTheme";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => (
  <button
    onClick={onToggle}
    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
    style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      color: "var(--text-2)",
    }}
    title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
  >
    <Icon name={theme === "dark" ? "Sun" : "Moon"} size={16} />
  </button>
);

export default ThemeToggle;
