import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ProfileSetupScreenProps {
  onComplete: (data: { firstName: string; lastName: string; phone: string }) => void;
}

const ProfileSetupScreen = ({ onComplete }: ProfileSetupScreenProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const canProceed = firstName.trim() && lastName.trim() && phone.trim();

  const fields = [
    {
      icon: "User",
      placeholder: "Имя",
      value: firstName,
      onChange: setFirstName,
      type: "text",
    },
    {
      icon: "User",
      placeholder: "Фамилия",
      value: lastName,
      onChange: setLastName,
      type: "text",
    },
    {
      icon: "Phone",
      placeholder: "+7 (___) ___-__-__",
      value: phone,
      onChange: setPhone,
      type: "tel",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "var(--vn-dark)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #FF6B1A, transparent)" }} />
      </div>

      <div className="relative z-10 w-full max-w-sm animate-slide-up">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
              style={{ background: "var(--vn-grad)" }}>
              👤
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "var(--vn-card-2)", border: "2px solid var(--vn-dark)" }}>
              <Icon name="Plus" size={14} style={{ color: "var(--vn-orange)" }} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Расскажи о себе</h2>
          <p className="text-white/50 text-sm">Это увидят твои друзья</p>
        </div>

        <div className="space-y-3 mb-8">
          {fields.map((f, i) => (
            <div key={i} className="relative">
              <Icon
                name={f.icon}
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(255,255,255,0.25)" }}
              />
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={f.value}
                onChange={(e) => f.onChange(e.target.value)}
                className="w-full pl-11 pr-4 py-4 rounded-xl text-white placeholder-white/30 outline-none transition-all font-golos text-base"
                style={{
                  background: "var(--vn-card-2)",
                  border: "1px solid var(--vn-border)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--vn-orange)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--vn-border)")}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => canProceed && onComplete({ firstName, lastName, phone })}
          disabled={!canProceed}
          className="w-full py-4 font-bold rounded-xl text-base transition-all"
          style={{
            background: canProceed ? "var(--vn-grad)" : "var(--vn-card-2)",
            color: canProceed ? "white" : "rgba(255,255,255,0.3)",
            cursor: canProceed ? "pointer" : "not-allowed",
          }}
        >
          Войти в Вайнах 🔥
        </button>
      </div>
    </div>
  );
};

export default ProfileSetupScreen;