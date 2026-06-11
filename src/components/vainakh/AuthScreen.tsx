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
      setEmailError("Введите почту на @mail.ru");
      return;
    }
    setEmailError("");
    onEmailSubmit(emailInput);
  };

  const handleOtpSubmit = () => {
    if (otp.length >= 4) {
      onOtpVerified();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "var(--vn-dark)" }}>
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #FF6B1A, transparent)" }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #8B5CF6, transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #EC4899, transparent)" }} />
      </div>

      <div className="relative z-10 w-full max-w-sm px-6 animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-4 pulse-glow"
            style={{ background: "var(--vn-grad)" }}>
            <span className="text-4xl">🔥</span>
          </div>
          <h1 className="text-4xl font-black mb-1 vn-grad-text">ВАЙНАХ</h1>
          <p className="text-sm" style={{ color: "var(--vn-orange-2)" }}>
            Социальная сеть нового поколения
          </p>
        </div>

        {step === "auth" ? (
          <div className="space-y-4 animate-fade-in">
            <div>
              <p className="text-white/60 text-sm mb-3 text-center">
                Войди через почту Mail.ru
              </p>
              <div className="relative">
                <Icon name="Mail" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  placeholder="твоя@mail.ru"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                  className="w-full pl-11 pr-4 py-4 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 transition-all font-golos"
                  style={{
                    background: "var(--vn-card-2)",
                    border: "1px solid var(--vn-border)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--vn-orange)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--vn-border)")}
                />
              </div>
              {emailError && (
                <p className="text-red-400 text-xs mt-2 ml-1 animate-fade-in">{emailError}</p>
              )}
            </div>

            <button
              onClick={handleEmailSubmit}
              className="vn-btn w-full py-4 text-base font-bold rounded-xl flex items-center justify-center gap-2"
            >
              Получить код
              <Icon name="ArrowRight" size={18} />
            </button>

            <p className="text-center text-white/30 text-xs">
              Только для пользователей @mail.ru
            </p>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-2">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,107,26,0.15)", border: "1px solid rgba(255,107,26,0.3)" }}>
                <Icon name="MessageSquare" size={22} style={{ color: "var(--vn-orange)" }} />
              </div>
              <p className="text-white/70 text-sm">
                Код отправлен на
              </p>
              <p className="text-white font-semibold text-sm mt-0.5">{email}</p>
            </div>

            <input
              type="text"
              inputMode="numeric"
              placeholder="Введи код из письма"
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && handleOtpSubmit()}
              className="w-full px-4 py-4 rounded-xl text-white text-center text-2xl tracking-widest placeholder-white/30 outline-none transition-all font-golos"
              style={{
                background: "var(--vn-card-2)",
                border: "1px solid var(--vn-border)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--vn-orange)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--vn-border)")}
            />

            <button
              onClick={handleOtpSubmit}
              className="vn-btn w-full py-4 text-base font-bold rounded-xl"
            >
              Войти
            </button>

            <button
              onClick={() => window.location.reload()}
              className="w-full text-center text-white/40 text-sm hover:text-white/60 transition-colors"
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
