"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

interface NavLink {
  label: string;
  id: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "من نحن", id: "about" },
  { label: "خدماتنا", id: "services" },
  { label: "أبرز العروض", id: "listings" },
  { label: "الرئيسية", id: "hero" },
];

interface NavbarProps {
  logoSrc?: string;
}

export default function Navbar({ logoSrc = "/trust-logo.svg" }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Modal State for Publishing Ad
  const [isPublishOpen, setIsPublishOpen] = useState(false);

  const closePublishModal = () => setIsPublishOpen(false);
  const openPublishModal = () => setIsPublishOpen(true);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <nav className="max-w-[1280px] mx-auto px-4 sm:px-6 md:h-[68px] flex items-center justify-between [direction:rtl]">
          <a href="/" className="flex items-center gap-2 no-underline shrink-0">
            <img
              src={logoSrc}
              alt="Logo"
              className="w-[72px] h-auto object-contain"
            />
          </a>

          <div className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[#142332] hover:text-[#1b5ebe] text-[16px] font-medium transition-colors duration-150 no-underline"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={openPublishModal}
            className="hidden md:inline-flex bg-[#1b5ebe] hover:bg-[#164ea2] text-white border-none rounded-full px-6 py-2.5 font-['ThmanyahSans',sans-serif] font-medium text-base cursor-pointer whitespace-nowrap items-center transition-all duration-150"
          >
            نشر إعلان
          </button>

          <button
            type="button"
            className="flex md:hidden bg-[#1b5ebe]/[0.08] hover:bg-[#1b5ebe]/[0.15] border border-[#1b5ebe]/[0.18] rounded-[10px] w-[42px] h-[42px] cursor-pointer items-center justify-center transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="فتح القائمة"
          >
            {menuOpen ? (
              <FiX size={22} className="text-[#1b5ebe]" strokeWidth={2.2} />
            ) : (
              <FiMenu size={22} className="text-[#1b5ebe]" strokeWidth={2.2} />
            )}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-5 [direction:rtl] transition-all absolute w-full shadow-md">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center w-full py-3 px-3 text-[15px] font-medium text-[#142332] hover:bg-gray-50 rounded-xl transition-colors no-underline ${
                    index < NAV_LINKS.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="h-[1px] bg-gray-100 my-3" />

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openPublishModal();
              }}
              className="w-full bg-[#1b5ebe] hover:bg-[#164ea2] text-white border-none rounded-full py-3 px-6 font-['ThmanyahSans',sans-serif] font-semibold text-base cursor-pointer text-center transition-colors"
            >
              نشر إعلان
            </button>
          </div>
        )}
      </header>

      {/* ══ PUBLISH AD MODAL / BOTTOM SHEET ══ */}
      {isPublishOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-[190] transition-opacity"
            onClick={closePublishModal}
          />

          {/* Modal Container */}
          <div
            className="fixed bottom-0 left-0 right-0 md:top-1/2 md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-t-[24px] md:rounded-[24px] max-h-[85vh] flex flex-col z-[200] shadow-2xl transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Handle Bar */}
            <div className="flex justify-center pt-3 pb-1 md:hidden">
              <div className="w-[40px] h-[4px] rounded-full bg-gray-200" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-2 pb-3 [direction:rtl] border-b border-gray-100">
              <p className="text-base font-bold text-[#0e1f1a]">
                نشر إعلان جديد
              </p>
              <button
                type="button"
                onClick={closePublishModal}
                className="bg-gray-100 hover:bg-gray-200 transition-colors border-none rounded-full w-8 h-8 cursor-pointer flex items-center justify-center"
              >
                <FiX size={16} className="text-gray-500" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5 [direction:rtl]">
              {/* TODO: Add your Publish Ad Form here */}

              <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                <p className="text-center text-[15px] font-medium mb-4">
                  محتوى نموذج إضافة الإعلان يوضع هنا
                </p>
                <div className="w-16 h-1 bg-gray-100 rounded-full" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
