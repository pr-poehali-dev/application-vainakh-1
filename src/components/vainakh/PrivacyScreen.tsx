import { useState } from "react";
import Icon from "@/components/ui/icon";

interface PrivacyScreenProps {
  onAccept: () => void;
}

const PrivacyScreen = ({ onAccept }: PrivacyScreenProps) => {
  const [checks, setChecks] = useState([false, false, false]);

  const toggle = (i: number) => {
    setChecks((p) => p.map((v, idx) => (idx === i ? !v : v)));
  };

  const allChecked = checks.every(Boolean);

  const items = [
    {
      icon: "FileText",
      title: "Пользовательское соглашение",
      desc: "Я принимаю условия пользовательского соглашения и правила сервиса Вайнах",
    },
    {
      icon: "Shield",
      title: "Обработка персональных данных",
      desc: "Даю согласие на обработку персональных данных в соответствии с ФЗ-152",
    },
    {
      icon: "Bell",
      title: "Политика конфиденциальности",
      desc: "Я ознакомился с политикой конфиденциальности и принимаю её условия",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "var(--vn-dark)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #8B5CF6, transparent)" }} />
      </div>

      <div className="relative z-10 w-full max-w-sm animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
            <Icon name="ShieldCheck" size={28} style={{ color: "var(--vn-purple-2)" }} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Соглашения</h2>
          <p className="text-white/50 text-sm">Необходимо принять все условия</p>
        </div>

        <div className="space-y-3 mb-8">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="w-full text-left p-4 rounded-2xl transition-all flex items-start gap-3"
              style={{
                background: checks[i] ? "rgba(255,107,26,0.08)" : "var(--vn-card)",
                border: `1px solid ${checks[i] ? "rgba(255,107,26,0.35)" : "var(--vn-border)"}`,
              }}
            >
              <div
                className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 transition-all"
                style={{
                  background: checks[i] ? "var(--vn-grad)" : "var(--vn-card-2)",
                  border: checks[i] ? "none" : "1px solid var(--vn-border)",
                }}
              >
                {checks[i] && <Icon name="Check" size={14} className="text-white" />}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{item.title}</p>
                <p className="text-white/45 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onAccept}
          disabled={!allChecked}
          className="w-full py-4 font-bold rounded-xl text-base transition-all"
          style={{
            background: allChecked ? "var(--vn-grad)" : "var(--vn-card-2)",
            color: allChecked ? "white" : "rgba(255,255,255,0.3)",
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
