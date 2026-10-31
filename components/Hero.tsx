"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiChevronDown,
  FiSearch,
  FiX,
  FiMenu,
  FiChevronRight,
} from "react-icons/fi";

const HERO_SLIDES = [
  {
    desktop: "/hero/desktop-hero-banner.jpg",
    mobile: "/hero/phone-hero-banner.jpg",
  },
  {
    desktop: "/hero/desktop-hero-banner-2.webp",
    mobile: "/hero/phone-hero-banner-2.webp",
  },
];

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

  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play interval for Hero Slider (Reduced to 3 seconds for faster transition)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

  const pickCity = (v: string) => {
    setMobileCity(v === "الكل" ? "" : v);
    setStep(2);
  };

  const pickType = (v: string) => {
    setMobileType(v === "الكل" ? "" : v);
    setStep(3);
  };

  const pickPrice = (v: string) => {
    setMobilePrice(v);
  };

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
        className="relative h-screen min-h-[600px] flex flex-col overflow-hidden"
      >
        {/* ══ HERO SLIDER BACKGROUNDS ══ */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.desktop}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out z-0 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Desktop BG */}
            <div
              className="hidden md:block absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.desktop}')` }}
            />
            {/* Mobile BG */}
            <div
              className="block md:hidden absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.mobile}')` }}
            />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#142332]/30 z-[1]" />

        {/* ══ NAVBAR ══ */}
        <nav className="absolute top-0 left-0 right-0 z-10 w-full">
          <div className="md:bg-transparent">
            <div className="bg-white md:bg-transparent max-w-[1280px] mx-auto px-6 h-[68px] flex items-center justify-between [direction:rtl]">
              {/* Logo */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-1">
                <img
                  src="/trust-logo.svg"
                  alt="Logo"
                  className="w-[72px] h-auto"
                />
              </div>

              {/* Desktop links */}
              <div className="hidden md:flex gap-[36px] items-center">
                {NAV_LINKS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-[#ebebeb] text-[17px] font-normal no-underline"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Desktop CTA */}
              <button
                type="button"
                onClick={onPublish}
                className="hidden md:inline-flex bg-[#1b5ebe] text-white border-none rounded-[20px] px-6 py-2.5 font-['ThmanyahSans',sans-serif] font-medium text-base cursor-pointer whitespace-nowrap items-center"
              >
                نشر إعلان
              </button>

              {/* Mobile hamburger */}
              <button
                type="button"
                className="flex md:hidden bg-[#1b5ebe]/[0.08] border-[1.5px] border-[#1b5ebe]/[0.18] rounded-[10px] w-[42px] h-[42px] cursor-pointer items-center justify-center flex-col gap-[5px] p-0"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="فتح القائمة"
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
              <div className="md:hidden bg-white/95 backdrop-blur-[20px] border-t border-[#1b5ebe]/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.13)] rounded-b-[24px] px-4 pt-2 pb-5 [direction:rtl]">
                {NAV_LINKS.map((item, i) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center w-full py-[13px] px-3 text-[15px] font-medium text-[#1a2a24] no-underline rounded-xl transition-colors ${
                      i < NAV_LINKS.length - 1
                        ? "border-b border-black/5"
                        : "border-none"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}

                <div className="h-[1px] bg-black/5 my-[10px] mb-[14px]" />

                <button
                  type="button"
                  onClick={() => {
                    onPublish();
                    setMenuOpen(false);
                  }}
                  className="block w-full bg-[#1b5ebe] text-white border-none rounded-[20px] py-[13px] px-6 font-['ThmanyahSans',sans-serif] font-semibold text-base cursor-pointer text-center"
                >
                  نشر إعلان
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* ══ HERO BODY ══ */}
        <div className="flex-1 flex items-center justify-center relative z-[5] px-6 [direction:rtl] mt-2 md:mt-4">
          <div className="w-full max-w-[860px] text-center">
            <h1 className="text-white text-[clamp(2.2rem,5vw,4rem)] font-black leading-[1.3] mb-5">
              نساعدك تشتري، تبيع،
              <br />
              تؤجر، وتدير عقارك
            </h1>
            <p className="text-white/75 text-[17px] leading-[1.75] max-w-[560px] mx-auto mb-[40px]">
              حلول عقارية متكاملة وخيارات متنوعة تناسب احتياجك وتساعدك على اتخاذ
              القرار المناسب.
            </p>

            {/* Tabs */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex bg-white/15 rounded-full p-1 backdrop-blur-md border border-white/20">
                {(["إيجار", "بيع"] as const).map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-[40px] py-[10px] rounded-full border-none cursor-pointer font-['ThmanyahSans',sans-serif] font-semibold text-[15px] transition-all duration-200 ${
                      tab === t
                        ? "bg-white text-[#0e1f1a]"
                        : "bg-transparent text-white/85"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* ── DESKTOP SEARCH BAR ── */}
            <div className="hidden md:flex items-center justify-between bg-white rounded-full p-[10px_12px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] max-w-full border border-black/[0.06] [direction:rtl]">
              {/* City */}
              <div className="flex-1 px-6 py-[6px] flex flex-col text-right relative">
                <span className="text-[13px] text-gray-500 mb-[2px]">
                  المدينة
                </span>
                <div className="relative flex items-center">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-transparent font-bold text-gray-900 text-[17px] outline-none cursor-pointer appearance-none pl-6 border-none font-['ThmanyahSans',sans-serif]"
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
                    className="text-gray-400 absolute left-0 pointer-events-none"
                  />
                </div>
              </div>

              <div className="w-[1px] h-[40px] bg-gray-200 shrink-0" />

              {/* Property Type */}
              <div className="flex-1 px-6 py-[6px] flex flex-col text-right relative">
                <span className="text-[13px] text-gray-500 mb-[2px]">
                  نوع العقار
                </span>
                <div className="relative flex items-center">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-transparent font-bold text-gray-900 text-[17px] outline-none cursor-pointer appearance-none pl-6 border-none font-['ThmanyahSans',sans-serif]"
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
                    className="text-gray-400 absolute left-0 pointer-events-none"
                  />
                </div>
              </div>

              <div className="w-[1px] h-[40px] bg-gray-200 shrink-0" />

              {/* Price */}
              <div className="flex-1 px-6 py-[6px] flex flex-col text-right relative">
                <span className="text-[13px] text-gray-500 mb-[2px]">
                  السعر
                </span>
                <div className="relative flex items-center">
                  <select
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-transparent font-bold text-gray-900 text-[17px] outline-none cursor-pointer appearance-none pl-6 border-none font-['ThmanyahSans',sans-serif]"
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
                    className="text-gray-400 absolute left-0 pointer-events-none"
                  />
                </div>
              </div>

              {/* Search button */}
              <button
                type="button"
                onClick={handleDesktopSearch}
                className="bg-[#1b5ebe] text-white border-none rounded-full px-[36px] py-[14px] font-['ThmanyahSans',sans-serif] font-bold text-[17px] cursor-pointer flex items-center gap-2 shrink-0 mr-1 shadow-[0_4px_16px_rgba(27,94,190,0.35)]"
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
                className="flex items-center gap-[12px] bg-white rounded-full p-[10px_14px] w-full max-w-[360px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] border-none cursor-pointer [direction:rtl]"
              >
                <span className="shrink-0 w-9 h-9 rounded-full bg-[#1b5ebe] flex items-center justify-center ml-auto">
                  <FiSearch size={15} color="#fff" strokeWidth={2.5} />
                </span>
                <span
                  className={`flex-1 text-right text-sm overflow-hidden text-ellipsis whitespace-nowrap ${
                    mobileCity || mobileType || mobilePrice
                      ? "text-gray-900 font-semibold"
                      : "text-gray-400 font-normal"
                  }`}
                >
                  {pillLabel()}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ══ SLIDER DOTS INDICATORS ══ */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-[6]">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`الشريحة ${idx + 1}`}
              className={`h-[10px] rounded-full border-none cursor-pointer transition-all duration-300 ease-in-out ${
                currentSlide === idx
                  ? "w-[28px] bg-white"
                  : "w-[10px] bg-white/45"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ══ MOBILE BOTTOM SHEET ══ */}
      {step && (
        <>
          <div
            className="fixed inset-0 md:hidden bg-black/40 z-[190]"
            onClick={closeSheet}
          />
          <div
            className="fixed bottom-0 left-0 right-0 md:hidden bg-white rounded-t-[24px] max-h-[80vh] flex flex-col z-[200]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-[40px] h-[4px] rounded-full bg-gray-200" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-2 pb-3 [direction:rtl] border-b border-gray-100">
              <div className="flex items-center gap-2">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setStep((prev) => (prev ? prev - 1 : 1) as Step)
                    }
                    className="bg-transparent border-none cursor-pointer p-1"
                  >
                    <FiChevronRight size={22} className="text-gray-700" />
                  </button>
                )}
                <p className="text-base font-bold text-[#0e1f1a]">
                  {sheetTitle()}
                </p>
              </div>
              <button
                type="button"
                onClick={closeSheet}
                className="bg-gray-100 border-none rounded-full w-8 h-8 cursor-pointer flex items-center justify-center"
              >
                <FiX size={16} className="text-gray-500" />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[50vh] [direction:rtl] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
                      className={`block w-full text-right px-4 py-[14px] text-[15px] rounded-[12px] cursor-pointer font-['ThmanyahSans',sans-serif] transition-all duration-150 ease-in-out ${
                        isSelected
                          ? "bg-[#1b5ebe] text-white font-bold border border-[#1b5ebe]"
                          : "bg-gray-50 text-gray-800 font-medium border border-gray-200"
                      }`}
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
                      className={`block w-full text-right px-4 py-[14px] text-[15px] rounded-[12px] cursor-pointer font-['ThmanyahSans',sans-serif] transition-all duration-150 ease-in-out ${
                        isSelected
                          ? "bg-[#1b5ebe] text-white font-bold border border-[#1b5ebe]"
                          : "bg-gray-50 text-gray-800 font-medium border border-gray-200"
                      }`}
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
                      className={`block w-full text-right px-4 py-[14px] text-[15px] rounded-[12px] cursor-pointer font-['ThmanyahSans',sans-serif] transition-all duration-150 ease-in-out ${
                        isSelected
                          ? "bg-[#1b5ebe] text-white font-bold border border-[#1b5ebe]"
                          : "bg-gray-50 text-gray-800 font-medium border border-gray-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
            </div>

            {/* Bottom Search Button - Show ONLY in Step 3 */}
            {step === 3 && (
              <div className="px-4 pt-3 pb-[28px] border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleMobileSearch}
                  className="w-full bg-[#1b5ebe] text-white border-none rounded-[14px] px-6 py-[14px] font-['ThmanyahSans',sans-serif] font-bold text-base cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(27,94,190,0.3)]"
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
