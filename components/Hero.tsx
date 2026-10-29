"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiChevronDown,
  FiSearch,
  FiX,
  FiMenu,
  FiChevronRight,
} from "react-icons/fi";

const NAV_LINKS = [
  { label: "من نحن", id: "about" },
  { label: "خدماتنا", id: "services" },
  { label: "أبرز العروض", id: "listings" },
  { label: "الرئيسية", id: "hero" },
];

const CITIES = [
  "الكل",
  "طرابلس",
  "المينا",
  "الضم والفرز",
  "الزاهرية",
  "المعرض",
  "الكورة",
];

const PROP_TYPES = [
  "الكل",
  "شقة",
  "فيلا",
  "مكتب",
  "أرض",
  "محال تجارية",
  "عمارة",
];

const PRICES = [
  { label: "الكل", value: "" },
  { label: "أقل من $50,000", value: "50000" },
  { label: "50,000 – 150,000 $", value: "150000" },
  { label: "150,000 – 300,000 $", value: "300000" },
  { label: "أكثر من 300,000 $", value: "500000" },
];

type Step = 1 | 2 | 3 | null;

export default function HeroWithNav({ onPublish }: { onPublish: () => void }) {
  const router = useRouter();
  const [tab, setTab] = useState<"بيع" | "إيجار">("إيجار");
  const [menuOpen, setMenuOpen] = useState(false);

  // Desktop search state
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  // Mobile bottom sheet search state
  const [step, setStep] = useState<Step>(null);
  const [mobileCity, setMobileCity] = useState("");
  const [mobileType, setMobileType] = useState("");
  const [mobilePrice, setMobilePrice] = useState("");

  const pillLabel = () => {
    const selectedPriceLabel = PRICES.find(
      (p) => p.value === mobilePrice,
    )?.label;
    const parts = [
      mobileCity,
      mobileType,
      selectedPriceLabel && selectedPriceLabel !== "الكل"
        ? selectedPriceLabel
        : "",
    ].filter(Boolean);

    return parts.length ? parts.join("، ") : "اختر المدينة، النوع، السعر";
  };

  const openSheet = () => {
    setStep(1);
  };

  const closeSheet = () => {
    setStep(null);
  };

  // Immediate selection & transitions (No keyboard triggering)
  const pickCity = (v: string) => {
    setMobileCity(v === "الكل" ? "" : v);
    setStep(2); // الانتقال الفوري لنوع العقار
  };

  const pickType = (v: string) => {
    setMobileType(v === "الكل" ? "" : v);
    setStep(3); // الانتقال الفوري للسعر
  };

  const pickPrice = (v: string) => {
    setMobilePrice(v);
  };

  // Search redirection to results page
  const handleMobileSearch = () => {
    const query = new URLSearchParams();
    if (tab) query.set("type", tab === "بيع" ? "للبيع" : "للإيجار");
    if (mobileCity) query.set("location", mobileCity);
    if (mobileType) query.set("propType", mobileType);
    if (mobilePrice) query.set("maxPrice", mobilePrice);

    closeSheet();
    router.push(`/search?${query.toString()}`);
  };

  const handleDesktopSearch = () => {
    const query = new URLSearchParams();
    if (tab) query.set("type", tab === "بيع" ? "للبيع" : "للإيجار");
    if (city) query.set("location", city);
    if (type) query.set("propType", type);
    if (price) query.set("maxPrice", price);

    router.push(`/search?${query.toString()}`);
  };

  const sheetTitle = () => {
    if (step === 1) return "1. اختر المدينة / المنطقة";
    if (step === 2) return "2. اختر نوع العقار";
    if (step === 3) return "3. حدد الميزانية / السعر";
    return "";
  };

  return (
    <>
      {/* ══ HERO SECTION ══ */}
      <section
        id="hero"
        style={{
          position: "relative",
          height: "100vh",
          minHeight: 600,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Desktop BG */}
        <div
          className="hidden md:block"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/hero/desktop-hero-banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
        {/* Mobile BG */}
        <div
          className="block md:hidden"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/hero/phone-hero-banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(20,35,50,0.22)",
            zIndex: 1,
          }}
        />

        {/* ══ NAVBAR ══ */}
        <nav
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            width: "100%",
          }}
        >
          <div className="md:bg-transparent">
            <div
              className="bg-white md:bg-transparent"
              style={{
                maxWidth: 1280,
                margin: "0 auto",
                padding: "0 24px",
                height: 68,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                direction: "rtl",
              }}
            >
              {/* Logo */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-1">
                <img
                  src="/trust-logo.svg"
                  alt="Logo"
                  style={{ width: 72, height: "auto" }}
                />
              </div>

              {/* Desktop links */}
              <div
                className="hidden md:flex"
                style={{ gap: 36, alignItems: "center" }}
              >
                {NAV_LINKS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    style={{
                      color: "#ebebeb",
                      fontSize: 17,
                      fontWeight: 400,
                      textDecoration: "none",
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Desktop CTA */}
              <button
                type="button"
                onClick={onPublish}
                className="hidden md:inline-flex"
                style={{
                  background: "#1b5ebe",
                  color: "#fff",
                  border: "none",
                  borderRadius: 20,
                  padding: "10px 24px",
                  fontFamily: "ThmanyahSans, sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  alignItems: "center",
                }}
              >
                نشر إعلان
              </button>

              {/* Mobile hamburger */}
              <button
                type="button"
                className="flex md:hidden"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="فتح القائمة"
                style={{
                  background: "rgba(27,94,190,0.08)",
                  border: "1.5px solid rgba(27,94,190,0.18)",
                  borderRadius: 10,
                  width: 42,
                  height: 42,
                  cursor: "pointer",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 5,
                  padding: 0,
                }}
              >
                {menuOpen ? (
                  <FiX size={20} color="#1b5ebe" strokeWidth={2.2} />
                ) : (
                  <FiMenu size={20} color="#1b5ebe" strokeWidth={2.2} />
                )}
              </button>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
              <div
                className="md:hidden"
                style={{
                  background: "rgba(255,255,255,0.97)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderTop: "1px solid rgba(27,94,190,0.08)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.13)",
                  borderRadius: "0 0 24px 24px",
                  padding: "8px 16px 20px",
                  direction: "rtl",
                }}
              >
                {NAV_LINKS.map((item, i) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      padding: "13px 12px",
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#1a2a24",
                      textDecoration: "none",
                      borderBottom:
                        i < NAV_LINKS.length - 1
                          ? "1px solid rgba(0,0,0,0.05)"
                          : "none",
                      borderRadius: 12,
                      transition: "background 0.15s",
                    }}
                  >
                    {item.label}
                  </a>
                ))}

                <div
                  style={{
                    height: 1,
                    background: "rgba(0,0,0,0.07)",
                    margin: "10px 0 14px",
                  }}
                />

                <button
                  type="button"
                  onClick={() => {
                    onPublish();
                    setMenuOpen(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    background: "#1b5ebe",
                    color: "#fff",
                    border: "none",
                    borderRadius: 20,
                    padding: "13px 24px",
                    fontFamily: "ThmanyahSans, sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  نشر إعلان
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* ══ HERO BODY ══ */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 5,
            padding: "0 24px",
            direction: "rtl",
            marginTop: 8,
          }}
          className="md:mt-4"
        >
          <div style={{ width: "100%", maxWidth: 860, textAlign: "center" }}>
            <h1
              style={{
                color: "#fff",
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: 900,
                lineHeight: 1.3,
                marginBottom: 20,
              }}
            >
              نساعدك تشتري، تبيع،
              <br />
              تؤجر، وتدير عقارك
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: 17,
                lineHeight: 1.75,
                maxWidth: 560,
                margin: "0 auto 40px",
              }}
            >
              حلول عقارية متكاملة وخيارات متنوعة تناسب احتياجك وتساعدك على اتخاذ
              القرار المناسب.
            </p>

            {/* Tabs */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 50,
                  padding: 4,
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {(["إيجار", "بيع"] as const).map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      padding: "10px 40px",
                      borderRadius: 50,
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "ThmanyahSans, sans-serif",
                      fontWeight: 600,
                      fontSize: 15,
                      transition: "all 0.2s",
                      background: tab === t ? "#fff" : "transparent",
                      color: tab === t ? "#0e1f1a" : "rgba(255,255,255,0.85)",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* ── DESKTOP SEARCH BAR ── */}
            <div
              dir="rtl"
              className="hidden md:flex"
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                background: "#fff",
                borderRadius: 9999,
                padding: "10px 12px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                maxWidth: "100%",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {/* City */}
              <div
                style={{
                  flex: 1,
                  padding: "6px 24px",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "right",
                  position: "relative",
                }}
              >
                <span
                  style={{ fontSize: 13, color: "#6b7280", marginBottom: 2 }}
                >
                  المدينة
                </span>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      fontWeight: 700,
                      color: "#111827",
                      fontSize: 17,
                      outline: "none",
                      cursor: "pointer",
                      appearance: "none",
                      paddingLeft: 24,
                      border: "none",
                      fontFamily: "ThmanyahSans, sans-serif",
                    }}
                  >
                    <option value="">اختر المدينة</option>
                    {CITIES.filter((c) => c !== "الكل").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown
                    size={18}
                    color="#9ca3af"
                    style={{
                      position: "absolute",
                      left: 0,
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  width: 1,
                  height: 40,
                  background: "#e5e7eb",
                  flexShrink: 0,
                }}
              />

              {/* Property Type */}
              <div
                style={{
                  flex: 1,
                  padding: "6px 24px",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "right",
                  position: "relative",
                }}
              >
                <span
                  style={{ fontSize: 13, color: "#6b7280", marginBottom: 2 }}
                >
                  نوع العقار
                </span>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      fontWeight: 700,
                      color: "#111827",
                      fontSize: 17,
                      outline: "none",
                      cursor: "pointer",
                      appearance: "none",
                      paddingLeft: 24,
                      border: "none",
                      fontFamily: "ThmanyahSans, sans-serif",
                    }}
                  >
                    <option value="">جميع الأنواع</option>
                    {PROP_TYPES.filter((p) => p !== "الكل").map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown
                    size={18}
                    color="#9ca3af"
                    style={{
                      position: "absolute",
                      left: 0,
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  width: 1,
                  height: 40,
                  background: "#e5e7eb",
                  flexShrink: 0,
                }}
              />

              {/* Price */}
              <div
                style={{
                  flex: 1,
                  padding: "6px 24px",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "right",
                  position: "relative",
                }}
              >
                <span
                  style={{ fontSize: 13, color: "#6b7280", marginBottom: 2 }}
                >
                  السعر
                </span>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <select
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      fontWeight: 700,
                      color: "#111827",
                      fontSize: 17,
                      outline: "none",
                      cursor: "pointer",
                      appearance: "none",
                      paddingLeft: 24,
                      border: "none",
                      fontFamily: "ThmanyahSans, sans-serif",
                    }}
                  >
                    <option value="">بلا تحديد</option>
                    {PRICES.filter((p) => p.value !== "").map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown
                    size={18}
                    color="#9ca3af"
                    style={{
                      position: "absolute",
                      left: 0,
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>

              {/* Search button */}
              <button
                type="button"
                onClick={handleDesktopSearch}
                style={{
                  background: "#1b5ebe",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9999,
                  padding: "14px 36px",
                  fontFamily: "ThmanyahSans, sans-serif",
                  fontWeight: 700,
                  fontSize: 17,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexShrink: 0,
                  marginRight: 4,
                  boxShadow: "0 4px 16px rgba(27,94,190,0.35)",
                }}
              >
                <FiSearch size={18} strokeWidth={2.5} />
                <span>بحث</span>
              </button>
            </div>

            {/* ── MOBILE pill ── */}
            <div className="flex md:hidden justify-center w-full px-4">
              <button
                type="button"
                onClick={openSheet}
                dir="rtl"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "#fff",
                  borderRadius: 9999,
                  padding: "10px 14px",
                  width: "100%",
                  maxWidth: 360,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#1b5ebe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "auto",
                  }}
                >
                  <FiSearch size={15} color="#fff" strokeWidth={2.5} />
                </span>
                <span
                  style={{
                    flex: 1,
                    textAlign: "right",
                    fontSize: 14,
                    color:
                      mobileCity || mobileType || mobilePrice
                        ? "#111827"
                        : "#9ca3af",
                    fontWeight:
                      mobileCity || mobileType || mobilePrice ? 600 : 400,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {pillLabel()}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MOBILE BOTTOM SHEET ══ */}
      {step && (
        <>
          <div
            className="fixed inset-0 md:hidden"
            style={{ background: "rgba(0,0,0,0.4)", zIndex: 190 }}
            onClick={closeSheet}
          />
          <div
            className="fixed bottom-0 left-0 right-0 md:hidden bg-white"
            style={{
              borderRadius: "24px 24px 0 0",
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              zIndex: 200,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle Bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "12px 0 4px",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 4,
                  borderRadius: 9999,
                  background: "#e5e7eb",
                }}
              />
            </div>

            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 20px 12px",
                direction: "rtl",
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              <div className="flex items-center gap-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setStep((prev) => (prev ? prev - 1 : 1) as Step)
                    }
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 4,
                    }}
                  >
                    <FiChevronRight size={22} color="#374151" />
                  </button>
                )}
                <p style={{ fontSize: 16, fontWeight: 700, color: "#0e1f1a" }}>
                  {sheetTitle()}
                </p>
              </div>
              <button
                type="button"
                onClick={closeSheet}
                style={{
                  background: "#f3f4f6",
                  border: "none",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FiX size={16} color="#6b7280" />
              </button>
            </div>

            {/* Items list - NO KEYBOARD, Scrollbar Hidden, Highlight Selected Option */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              style={{ direction: "rtl", maxHeight: "50vh" }}
            >
              {/* STEP 1: City */}
              {step === 1 &&
                CITIES.map((item) => {
                  const isSelected =
                    (item === "الكل" && !mobileCity) || mobileCity === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => pickCity(item)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "right",
                        padding: "14px 16px",
                        fontSize: 15,
                        borderRadius: 12,
                        cursor: "pointer",
                        fontFamily: "ThmanyahSans, sans-serif",
                        transition: "all 0.15s ease",
                        background: isSelected ? "#1b5ebe" : "#f9fafb",
                        color: isSelected ? "#ffffff" : "#1f2937",
                        fontWeight: isSelected ? 700 : 500,
                        border: isSelected
                          ? "1px solid #1b5ebe"
                          : "1px solid #e5e7eb",
                      }}
                    >
                      {item}
                    </button>
                  );
                })}

              {/* STEP 2: Property Type */}
              {step === 2 &&
                PROP_TYPES.map((item) => {
                  const isSelected =
                    (item === "الكل" && !mobileType) || mobileType === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => pickType(item)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "right",
                        padding: "14px 16px",
                        fontSize: 15,
                        borderRadius: 12,
                        cursor: "pointer",
                        fontFamily: "ThmanyahSans, sans-serif",
                        transition: "all 0.15s ease",
                        background: isSelected ? "#1b5ebe" : "#f9fafb",
                        color: isSelected ? "#ffffff" : "#1f2937",
                        fontWeight: isSelected ? 700 : 500,
                        border: isSelected
                          ? "1px solid #1b5ebe"
                          : "1px solid #e5e7eb",
                      }}
                    >
                      {item}
                    </button>
                  );
                })}

              {/* STEP 3: Price */}
              {step === 3 &&
                PRICES.map((item) => {
                  const isSelected = mobilePrice === item.value;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => pickPrice(item.value)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "right",
                        padding: "14px 16px",
                        fontSize: 15,
                        borderRadius: 12,
                        cursor: "pointer",
                        fontFamily: "ThmanyahSans, sans-serif",
                        transition: "all 0.15s ease",
                        background: isSelected ? "#1b5ebe" : "#f9fafb",
                        color: isSelected ? "#ffffff" : "#1f2937",
                        fontWeight: isSelected ? 700 : 500,
                        border: isSelected
                          ? "1px solid #1b5ebe"
                          : "1px solid #e5e7eb",
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
            </div>

            {/* Bottom Search Button - Show ONLY in Step 3 */}
            {step === 3 && (
              <div
                style={{
                  padding: "12px 16px 28px",
                  borderTop: "1px solid #f3f4f6",
                }}
              >
                <button
                  type="button"
                  onClick={handleMobileSearch}
                  style={{
                    width: "100%",
                    background: "#1b5ebe",
                    color: "#fff",
                    border: "none",
                    borderRadius: 14,
                    padding: "14px 24px",
                    fontFamily: "ThmanyahSans, sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "0 4px 14px rgba(27,94,190,0.3)",
                  }}
                >
                  <FiSearch size={18} strokeWidth={2.5} />
                  عرض نتائج البحث
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
