import { useState } from "react";
import Icon from "@/components/ui/icon";

interface AuthScreenProps {
  step: "auth" | "otp";
  email: string;
  onEmailSubmit: (email: string) => void;
  onOtpVerified: () => void;
}

const AuthScreen = ({ step, email, onEmailSubmit, onOtpVerified }: AuthScreenProps) => {
  const [emailInput, setEmailInput] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailSubmit = () => {
    if (!emailInput.endsWith("@mail.ru")) {
      setEmailError("Введите почту @mail.ru");
      return;
    }
    setEmailError("");
    onEmailSubmit(emailInput);
  };

  const handleOtpSubmit = () => {
    if (otp.length >= 4) onOtpVerified();
  };

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

        {/* Logo */}
        <div className="mb-12">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            <span className="text-xl font-black" style={{ fontFamily: "Inter" }}>В</span>
          </div>
          <h1
            className="text-3xl font-bold tracking-tight mb-1"
            style={{ color: "var(--text)", letterSpacing: "-0.03em" }}
          >
            ВАЙНАХ
          </h1>
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            {step === "auth" ? "Вход через почту Mail.ru" : "Введите код из письма"}
          </p>
        </div>

        {step === "auth" ? (
          <div className="space-y-3 animate-fade-in">
            <div className="relative">
              <Icon
                name="Mail"
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: "var(--text-3)" }}
              />
              <input
                type="email"
                placeholder="имя@mail.ru"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>
            {emailError && (
              <p className="text-xs animate-fade-in" style={{ color: "var(--danger)" }}>
                {emailError}
              </p>
            )}
            <button
              onClick={handleEmailSubmit}
              className="vn-btn w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2"
            >
              Получить код
              <Icon name="ArrowRight" size={15} />
            </button>
            <p className="text-center text-xs" style={{ color: "var(--text-3)" }}>
              Только для пользователей @mail.ru
            </p>
          </div>
        ) : (
          <div className="space-y-3 animate-fade-in">
            <div
              className="flex items-center gap-3 p-3 rounded-xl mb-4"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <Icon name="Mail" size={15} style={{ color: "var(--text-3)" }} />
              <span className="text-sm" style={{ color: "var(--text-2)" }}>{email}</span>
            </div>
            <input
              type="text"
              inputMode="numeric"
              placeholder="— — — — — —"
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && handleOtpSubmit()}
              className="w-full px-4 py-4 rounded-xl text-center text-3xl tracking-[0.5em]"
              style={{ ...inputStyle, fontVariantNumeric: "tabular-nums" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
            <button
              onClick={handleOtpSubmit}
              className="vn-btn w-full py-3 rounded-xl text-sm"
            >
              Войти
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full text-center text-xs transition-colors"
              style={{ color: "var(--text-3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-2)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}
            >
              Изменить почту
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
