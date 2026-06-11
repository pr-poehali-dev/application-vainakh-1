import Icon from "@/components/ui/icon";
import { type Theme } from "./useTheme";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => (
  <button
    onClick={onToggle}
    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
    style={{
      background: "var(--accent-bg)",
      border: "1px solid var(--accent-border)",
      color: "var(--accent)",
    }}
    title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
  >
    <Icon name={theme === "dark" ? "Sun" : "Moon"} size={15} />
  </button>
);

export default ThemeToggle;
