"use client";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: "",
  });

  return (
    <section
      id="contact"
      style={{ padding: "80px 24px", background: "#FAF8F5" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 800,
              color: "#0E1F1A",
              marginBottom: 12,
            }}
          >
            تواصل معنا الآن
          </h2>
          <p style={{ color: "#5A6561" }}>سنرد عليك في أقرب وقت ممكن</p>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 48 }}
        >
          {/* Info */}
          <div>
            <h3
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: "#0E1F1A",
                marginBottom: 28,
              }}
            >
              معلومات التواصل
            </h3>
            {[
              { icon: "📱", label: "واتساب / هاتف", value: "+961 81 270 436" },
              {
                icon: "📧",
                label: "البريد الإلكتروني",
                value: "info@abtahrealestate.com",
              },
              { icon: "📍", label: "الموقع", value: "طرابلس، لبنان" },
              { icon: "📸", label: "إنستغرام", value: "@al_abtah.real.estate" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 16,
                  marginBottom: 24,
                  padding: 18,
                  background: "#fff",
                  borderRadius: 12,
                  border: "1px solid #ede9e1",
                }}
              >
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div>
                  <div
                    style={{ fontSize: 12, color: "#5A6561", marginBottom: 2 }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{ fontSize: 15, fontWeight: 600, color: "#0E1F1A" }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/96181500175?text=Hello Trust Real Estate."
              target="_blank"
              rel="noreferrer"
              style={{
                display: "block",
                background: "#25D366",
                color: "#fff",
                borderRadius: 12,
                padding: "14px 0",
                textAlign: "center",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              💬 تواصل عبر واتساب
            </a>
          </div>

          {/* Form */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 32,
              border: "1px solid #ede9e1",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <input
                placeholder="الاسم الكامل"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
              />
              <input
                placeholder="البريد الإلكتروني"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
              />
            </div>
            <input
              placeholder="رقم الجوال / واتساب"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={{ ...inputStyle, width: "100%", marginBottom: 16 }}
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              style={{ ...inputStyle, width: "100%", marginBottom: 16 }}
            >
              <option value="">نوع الاستفسار</option>
              <option>شراء</option>
              <option>بيع</option>
              <option>تأجير</option>
              <option>استشارة</option>
            </select>
            <textarea
              placeholder="تفاصيل الرسالة..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              style={{
                ...inputStyle,
                width: "100%",
                marginBottom: 20,
                resize: "vertical" as const,
              }}
            />
            <button
              style={{
                width: "100%",
                background: "#0E1F1A",
                color: "#C5A265",
                border: "none",
                borderRadius: 10,
                padding: "14px 0",
                fontFamily: "Cairo, sans-serif",
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              إرسال الطلب
            </button>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { #contact > div > div:last-of-type { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 8,
  border: "1.5px solid #e8e4dc",
  fontFamily: "Cairo, sans-serif",
  fontSize: 14,
  color: "#0E1F1A",
  background: "#FAF8F5",
  outline: "none",
};
