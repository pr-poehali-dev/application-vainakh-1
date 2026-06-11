import { useState } from "react";
import Icon from "@/components/ui/icon";

interface PrivacyScreenProps {
  onAccept: () => void;
}

const items = [
  {
    icon: "FileText",
    title: "Пользовательское соглашение",
    desc: "Принимаю условия использования сервиса Вайнах",
  },
  {
    icon: "Shield",
    title: "Обработка персональных данных",
    desc: "Согласие на обработку ПДн согласно ФЗ-152",
  },
  {
    icon: "Eye",
    title: "Политика конфиденциальности",
    desc: "Ознакомился и принимаю политику конфиденциальности",
  },
];

const PrivacyScreen = ({ onAccept }: PrivacyScreenProps) => {
  const [checks, setChecks] = useState([false, false, false]);

  const toggle = (i: number) =>
    setChecks((p) => p.map((v, idx) => (idx === i ? !v : v)));

  const allChecked = checks.every(Boolean);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "var(--bg)" }}
    >
      <div className="w-full max-w-sm animate-slide-up">
        <div className="mb-10">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-6"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <Icon name="ShieldCheck" size={18} style={{ color: "var(--text)" }} />
          </div>
          <h2
            className="text-2xl font-bold tracking-tight mb-1"
            style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
          >
            Соглашения
          </h2>
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            Необходимо принять все условия
          </p>
        </div>

        <div className="space-y-2 mb-8">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="w-full text-left p-4 rounded-xl transition-all flex items-start gap-3"
              style={{
                background: checks[i] ? "var(--surface-2)" : "var(--surface)",
                border: `1px solid ${checks[i] ? "var(--border-2)" : "var(--border)"}`,
              }}
            >
              <div
                className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center mt-0.5 transition-all"
                style={{
                  background: checks[i] ? "var(--text)" : "transparent",
                  border: `1.5px solid ${checks[i] ? "var(--text)" : "var(--border-2)"}`,
                }}
              >
                {checks[i] && (
                  <Icon name="Check" size={11} style={{ color: "var(--bg)" }} />
                )}
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                  {item.title}
                </p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--text-3)" }}>
                  {item.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={allChecked ? onAccept : undefined}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: allChecked ? "var(--text)" : "var(--surface)",
            color: allChecked ? "var(--bg)" : "var(--text-3)",
            border: `1px solid ${allChecked ? "transparent" : "var(--border)"}`,
            cursor: allChecked ? "pointer" : "not-allowed",
          }}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default PrivacyScreen;
