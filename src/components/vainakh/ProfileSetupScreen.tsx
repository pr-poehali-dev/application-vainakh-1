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
    { icon: "User",  placeholder: "Имя",            value: firstName, onChange: setFirstName, type: "text" },
    { icon: "User",  placeholder: "Фамилия",         value: lastName,  onChange: setLastName,  type: "text" },
    { icon: "Phone", placeholder: "+7 (___) ___-__-__", value: phone, onChange: setPhone,     type: "tel"  },
  ];

  const inputStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    outline: "none",
    transition: "border-color 0.15s",
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "var(--bg)" }}
    >
      <div className="w-full max-w-sm animate-slide-up">
        <div className="mb-10">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-6"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            <Icon name="UserCheck" size={18} />
          </div>
          <h2
            className="text-2xl font-bold tracking-tight mb-1"
            style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
          >
            Расскажи о себе
          </h2>
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            Это увидят твои друзья
          </p>
        </div>

        <div className="space-y-2.5 mb-8">
          {fields.map((f, i) => (
            <div key={i} className="relative">
              <Icon
                name={f.icon}
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: "var(--text-3)" }}
              />
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={f.value}
                onChange={(e) => f.onChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => canProceed && onComplete({ firstName, lastName, phone })}
          disabled={!canProceed}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: canProceed ? "var(--text)" : "var(--surface)",
            color: canProceed ? "var(--bg)" : "var(--text-3)",
            border: `1px solid ${canProceed ? "transparent" : "var(--border)"}`,
            cursor: canProceed ? "pointer" : "not-allowed",
          }}
        >
          Войти в Вайнах
        </button>
      </div>
    </div>
  );
};

export default ProfileSetupScreen;
