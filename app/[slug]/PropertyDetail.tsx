"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { IoLocationOutline, IoBedOutline, IoArrowBack } from "react-icons/io5";
import { BiBath, BiArea } from "react-icons/bi";
import {
  FiShare2,
  FiPhone,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineStairs } from "react-icons/md";
import properties from "../data/properties.json";
import Footer from "../../components/Footer";

type Property = (typeof properties)[0];

const NAV_LINKS = [
  { id: "listings", label: "العروض" },
  { id: "about", label: "من نحن" },
  { id: "contact", label: "تواصل معنا" },
];

export default function PropertyDetail({
  property: p,
}: {
  property: Property;
}) {
  const [activeImg, setActiveImg] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");

  const whatsappMsg = encodeURIComponent(
    `مرحباً، أود الاستفسار عن: ${p.title} — ${p.location}`,
  );

  // Calculate recommended properties based on same type & location
  const recommendedProperties = properties
    .filter((item) => item.slug !== p.slug)
    .sort((a, b) => {
      const aScore =
        (a.type === p.type ? 2 : 0) + (a.location === p.location ? 1 : 0);
      const bScore =
        (b.type === p.type ? 2 : 0) + (b.location === p.location ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, 3);

  const openLightbox = (i: number) => {
    setLightboxImg(i);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goTo = useCallback(
    (next: number, dir: "left" | "right") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setLightboxImg((next + p.images.length) % p.images.length);
        setAnimating(false);
      }, 300);
    },
    [animating, p.images.length],
  );

  const prev = () => goTo(lightboxImg - 1, "right");
  const next = () => goTo(lightboxImg + 1, "left");

  // Auto-slide every 4s
  useEffect(() => {
    if (!lightboxOpen) return;
    const t = setTimeout(() => goTo(lightboxImg + 1, "left"), 4000);
    return () => clearTimeout(t);
  }, [lightboxOpen, lightboxImg, goTo]);

  // Keyboard nav
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, lightboxImg]);

  const onPublish = () => {};

  const stats = [
    { icon: <BiArea size={18} />, label: `${p.area} م²`, sub: "المساحة" },
    ...(p.rooms > 0
      ? [
          {
            icon: <IoBedOutline size={18} />,
            label: `${p.rooms} غرف`,
            sub: "عدد الغرف",
          },
        ]
      : []),
    ...(p.baths > 0
      ? [
          {
            icon: <BiBath size={18} />,
            label: `${p.baths} حمام`,
            sub: "الحمامات",
          },
        ]
      : []),
    ...(p.floor > 0
      ? [
          {
            icon: <MdOutlineStairs size={18} />,
            label: `طابق ${p.floor}`,
            sub: "الطابق",
          },
        ]
      : []),
  ];

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white"
      style={{ fontFamily: "ThmanyahSans, sans-serif" }}
    >
      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 w-full border-b border-[#f0ece4] bg-white">
        <div
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
            <Link href="/">
              <img
                src="/trust-logo.svg"
                alt="Logo"
                style={{ width: 72, height: "auto" }}
              />
            </Link>
          </div>

          {/* Share button (desktop) + hamburger (mobile) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                navigator.share?.({ title: p.title, url: window.location.href })
              }
              className="hidden md:flex items-center gap-1.5 bg-[#f5f5f5] border-none rounded-[20px] px-4 py-2 text-sm font-medium cursor-pointer text-[#0e1f1a]"
            >
              <FiShare2 size={15} />
              <span>مشاركة</span>
            </button>

            <button
              className="flex md:hidden items-center justify-center"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="فتح القائمة"
              style={{
                background: "rgba(27,94,190,0.08)",
                border: "1.5px solid rgba(27,94,190,0.18)",
                borderRadius: 10,
                width: 42,
                height: 42,
                cursor: "pointer",
              }}
            >
              {menuOpen ? (
                <FiX size={20} color="#1b5ebe" strokeWidth={2.2} />
              ) : (
                <FiMenu size={20} color="#1b5ebe" strokeWidth={2.2} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            className="md:hidden"
            style={{
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
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
                href={`/#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center w-full px-3 py-3.5 text-[15px] font-medium text-[#1a2a24] no-underline rounded-xl transition-colors hover:bg-[rgba(27,94,190,0.06)]"
                style={{
                  borderBottom:
                    i < NAV_LINKS.length - 1
                      ? "1px solid rgba(0,0,0,0.05)"
                      : "none",
                }}
              >
                {item.label}
              </a>
            ))}
            <div className="h-px bg-black/7 my-2.5" />
            <button
              onClick={() => {
                onPublish();
                setMenuOpen(false);
              }}
              className="block w-full text-white border-none rounded-[20px] py-3.5 px-6 text-base font-semibold cursor-pointer text-center"
              style={{
                background: "#1b5ebe",
                fontFamily: "ThmanyahSans, sans-serif",
              }}
            >
              نشر إعلان
            </button>
          </div>
        )}
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 60px" }}
      >
        {/* Badge + Title */}
        <div className="mb-6">
          <span
            className="inline-block rounded-[20px] px-4 py-1 text-[13px] font-bold text-white mb-3"
            style={{ background: p.type === "للبيع" ? "#1b5ebe" : "#0e1f1a" }}
          >
            {p.type}
          </span>
          <h1
            className="font-bold text-[#0e1f1a] leading-snug mb-2"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
          >
            {p.title}
          </h1>
          <div className="flex items-center gap-1.5 text-[#5A6561]">
            <IoLocationOutline size={16} />
            <span className="text-[15px]">{p.location}</span>
          </div>
        </div>

        {/* ── IMAGE GALLERY ── */}
        <div className="mb-10">
          {/* Main image — clickable */}
          <div
            className="w-full rounded-[20px] overflow-hidden mb-3 bg-[#e5e7eb] cursor-zoom-in"
            style={{ aspectRatio: "16/9" }}
            onClick={() => openLightbox(activeImg)}
          >
            <img
              src={p.images[activeImg]}
              alt={p.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Desktop Thumbnails (Horizontal Scroll) */}
          <div className="hidden md:flex gap-2.5 overflow-x-auto pb-1">
            {p.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className="flex-shrink-0 rounded-xl overflow-hidden p-0 cursor-pointer bg-[#e5e7eb]"
                style={{
                  width: 90,
                  height: 68,
                  border:
                    activeImg === i
                      ? "2.5px solid #1b5ebe"
                      : "2.5px solid transparent",
                }}
              >
                <img
                  src={img}
                  alt={`صورة ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Mobile Grid Thumbnails (3 Columns Grid, Max 6 Images) */}
          <div className="grid md:hidden grid-cols-3 gap-2 w-full">
            {p.images.slice(1, 7).map((img, idx) => {
              const actualIndex = idx + 1;
              const isLastSlot = idx === 5;
              const hasMoreImages = p.images.length > 7;
              const remainingCount = p.images.length - 6;

              return (
                <button
                  key={actualIndex}
                  onClick={() => openLightbox(actualIndex)}
                  className="relative w-full aspect-video rounded-xl overflow-hidden p-0 border-none cursor-pointer bg-[#e5e7eb]"
                >
                  <img
                    src={img}
                    alt={`صورة ${actualIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {isLastSlot && hasMoreImages && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center text-white font-bold text-lg">
                      +{remainingCount}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── TWO COLUMN LAYOUT ── */}
        <div
          className="property-grid grid gap-8"
          style={{ gridTemplateColumns: "1fr 340px", alignItems: "start" }}
        >
          {/* LEFT */}
          <div>
            {/* Stats */}
            <div className="flex justify-between items-center w-full mb-8">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center bg-white border border-[#ede9e1] rounded-[14px] px-4 py-2.5 gap-1"
                  style={{ minWidth: 100 }}
                >
                  <span className="text-[#1b5ebe]">{stat.icon}</span>
                  <span className="text-sm md:text-base font-medium text-[#0e1f1a]">
                    {stat.label}
                  </span>
                  <span className="text-xs text-[#9ca3af] font-regular">
                    {stat.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-base md:text-lg font-medium text-[#0e1f1a] mb-3 pb-2.5 border-b border-[#ede9e1]">
                تفاصيل العقار
              </h2>
              <p className="text-[#5A6561] text-sm md:text-base leading-[1.7]">
                {p.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-base md:text-lg font-medium text-[#0e1f1a] mb-3 pb-2.5 border-b border-[#ede9e1]">
                المميزات
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {p.features.map((f, i) => (
                  <span
                    key={i}
                    className="bg-[#f0f4ff] text-[#1b5ebe] border border-[#dbe4ff] rounded-[20px] px-4 py-1.5 text-xs md:text-sm font-medium"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Price card */}
          <div
            className="bg-white border border-[#ede9e1] rounded-[20px] p-7"
            style={{ position: "sticky", top: 80 }}
          >
            <div className="mb-5">
              <p className="text-[13px] text-[#9ca3af] mb-1">السعر</p>
              <div className="flex items-baseline gap-1">
                <span className="text-[1.6rem] font-medium text-[#0e1f1a]">
                  {p.price}
                </span>
                {!p.price.includes("شهر") && (
                  <span className="text-lg font-semibold text-[#0e1f1a]">
                    $
                  </span>
                )}
              </div>
            </div>

            <div className="h-px bg-[#ede9e1] mb-5" />

            <div className="flex gap-2 mb-6 text-[#5A6561]">
              <IoLocationOutline size={16} className="flex-shrink-0 mt-0.5" />
              <span className="text-sm leading-relaxed">{p.location}</span>
            </div>

            <a
              href={`https://wa.me/96181500175?text=${whatsappMsg}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 w-full text-white rounded-sm py-2 text-sm font-medium no-underline mb-3"
              style={{ background: "#1b5ebe" }}
            >
              <FaWhatsapp size={18} />
              تواصل عبر واتساب
            </a>

            <a
              href="tel:+96181500175"
              className="flex items-center justify-center gap-1.5 w-full bg-[#f5f5f5] text-[#0e1f1a] rounded-sm py-2 text-sm font-regular no-underline"
            >
              <FiPhone size={16} />
              اتصل بنا
            </a>

            <p className="text-center text-xs text-[#9ca3af] mt-4">
              سيتواصل معك فريقنا خلال دقائق
            </p>
          </div>
        </div>
      </div>

      {/* ── RECOMMENDED PROPERTIES SECTION ── */}
      {recommendedProperties.length > 0 && (
        <section className="bg-[#]border-t border-[#ede9e1] py-12 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-[#0e1f1a]">
                  عقارات مقترحة قد تهمك
                </h2>
                <p className="text-xs md:text-sm text-[#5A6561] mt-1">
                  عروض مشابهة بناءً على نوع العقار والمنطقة
                </p>
              </div>
              <Link
                href="/#listings"
                className="flex items-center gap-1 text-[#1b5ebe] font-medium text-sm no-underline hover:underline"
              >
                <span>عرض الكل</span>
                <FiChevronLeft size={16} />
              </Link>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProperties.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="group bg-white border border-[#ede9e1] rounded-[18px] overflow-hidden no-underline transition-all duration-200 hover:shadow-md hover:-translate-y-1 flex flex-col"
                >
                  {/* Card Image + Badge */}
                  <div className="relative w-full aspect-[16/10] bg-[#e5e7eb] overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span
                      className="absolute top-3 right-3 rounded-[20px] px-3 py-0.5 text-xs font-bold text-white shadow-sm"
                      style={{
                        background:
                          item.type === "للبيع" ? "#1b5ebe" : "#0e1f1a",
                      }}
                    >
                      {item.type}
                    </span>
                  </div>

                  {/* Card Info */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Price */}
                      <div className="flex items-baseline gap-1 mb-1.5">
                        <span className="text-lg font-bold text-[#0e1f1a]">
                          {item.price}
                        </span>
                        {!item.price.includes("شهر") && (
                          <span className="text-xs font-semibold text-[#0e1f1a]">
                            $
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-bold text-[#0e1f1a] line-clamp-1 mb-2 group-hover:text-[#1b5ebe] transition-colors">
                        {item.title}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-1 text-[#5A6561] text-xs mb-4">
                        <IoLocationOutline size={14} className="shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>

                    {/* Specs Footer */}
                    <div className="pt-3 border-t border-[#f0ece4] flex items-center justify-between text-[#5A6561] text-xs">
                      <div className="flex items-center gap-1">
                        <BiArea size={14} className="text-[#1b5ebe]" />
                        <span>{item.area} م²</span>
                      </div>
                      {item.rooms > 0 && (
                        <div className="flex items-center gap-1">
                          <IoBedOutline size={14} className="text-[#1b5ebe]" />
                          <span>{item.rooms} غرف</span>
                        </div>
                      )}
                      {item.baths > 0 && (
                        <div className="flex items-center gap-1">
                          <BiBath size={14} className="text-[#1b5ebe]" />
                          <span>{item.baths} حمام</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* ── LIGHTBOX ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(6px)",
          }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 left-5 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors border-none cursor-pointer text-white"
          >
            <FiX size={22} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 right-5 text-white/70 text-sm font-medium">
            {lightboxImg + 1} / {p.images.length}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute right-4 md:right-8 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 transition-colors border-none cursor-pointer text-white"
          >
            <FiChevronRight size={26} />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-5xl px-16 md:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={lightboxImg}
              src={p.images[lightboxImg]}
              alt={`صورة ${lightboxImg + 1}`}
              className="w-full max-h-[80vh] object-contain rounded-xl select-none"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating
                  ? `translateX(${direction === "left" ? "-40px" : "40px"})`
                  : "translateX(0)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute left-4 md:left-8 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 transition-colors border-none cursor-pointer text-white"
          >
            <FiChevronLeft size={26} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-6 flex gap-2">
            {p.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i, i > lightboxImg ? "left" : "right");
                }}
                className="rounded-full border-none cursor-pointer transition-all"
                style={{
                  width: i === lightboxImg ? 24 : 8,
                  height: 8,
                  background:
                    i === lightboxImg ? "#fff" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .property-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
