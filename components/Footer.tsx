import React from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiChevronDown,
} from "react-icons/fi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";
import { BsTelephone } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f5] text-gray-800 border-t border-gray-200">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-10">
        {/* 4-Column Responsive Grid (RTL Flow) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 items-start mb-12">
          {/* Column 1: Brand & Logo Block (Rightmost in RTL) */}
          <div className="flex flex-col items-start">
            <div className="flex flex-col md:flex-row items-center justify-center gap-1">
              <img
                src="/trust-logo.svg"
                alt="Logo"
                className="w-16 md:w-24 mt-1 md:mt-0"
              />
            </div>
            <p className="text-sm text-gray-600 font-regular leading-relaxed max-w-xs mt-2">
              حلول عقارية متكاملة بخبرة عالية لمساعدتك في الحصول على العقار
              المناسب بكل سهولة وأمان.
            </p>
          </div>

          {/* Column 3: Quick Links */}
          <div className="flex flex-col items-start">
            <h3 className="text-base font-bold text-gray-900 mb-4 tracking-tight">
              روابط سريعة
            </h3>
            <ul className="space-y-2.5 text-sm font-medium text-gray-600">
              <li>
                <a
                  href="#hero"
                  className="hover:text-[var(--blue)] transition-colors duration-200"
                >
                  الرئيسية
                </a>
              </li>
              <li>
                <a
                  href="#listings"
                  className="hover:text-[var(--blue)] transition-colors duration-200"
                >
                  العروض العقارية
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-[var(--blue)] transition-colors duration-200"
                >
                  عن Trust Real Estate
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[var(--blue)] transition-colors duration-200"
                >
                  الخدمات
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info (Leftmost in RTL) */}
          <div className="flex flex-col items-start">
            <h3 className="text-base font-bold text-gray-900 mb-4 tracking-tight">
              معلومات التواصل
            </h3>
            <ul className="space-y-3 text-sm font-medium text-gray-600 dir-rtl">
              <li className="flex items-center gap-3">
                <BsTelephone className="w-4 h-4 text-gray-700 flex-shrink-0" />
                <a
                  href="tel:+96181500175"
                  className="hover:text-[var(--blue)] transition-colors dir-ltr"
                >
                  81500175
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="w-4 h-4 text-gray-700 flex-shrink-0" />
                <a
                  href="https://wa.me/96181500175"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--blue)] transition-colors dir-ltr"
                >
                  81500175
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-4 h-4 text-gray-700 flex-shrink-0" />
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd0ifRLWCYE67VCnEMabufP5FTBObMPsYpK5Ov_i6eShrptBQ/viewform?pli=1"
                  className="hover:text-[var(--blue)] transition-colors dir-ltr"
                >
                  تقديم كمندوب عقارات
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="w-4 h-4 text-gray-700 flex-shrink-0 mt-1" />
                <span className="leading-relaxed">
                  الضم والفرز - خلف حياة دونر
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar Divider */}
        <div className="pt-8 border-t border-gray-300/70 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          {/* Right: Controls & Social Links */}
          <div className="flex items-center gap-3">
            {/* Social Icons Pills */}
            <a
              href="https://www.instagram.com/al_abtah.real.estate/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-gray-200/80 hover:bg-gray-300/80 flex items-center justify-center text-gray-800 transition-colors"
            >
              <FaInstagram className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://wa.me/96181500175"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-full bg-gray-200/80 hover:bg-gray-300/80 flex items-center justify-center text-gray-800 transition-colors"
            >
              <FaWhatsapp className="w-3.5 h-3.5" />
            </a>
          </div>{" "}
          {/* Left: Copyright Notice */}
          <p className="text-sm font-medium text-gray-500 text-center md:text-right">
            جميع الحقوق محفوظة لدى Trust Real Estate ©{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
