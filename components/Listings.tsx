"use client";
import React from "react";
import Link from "next/link";
import { IoLocationOutline, IoBedOutline } from "react-icons/io5";
import { BiBath, BiArea } from "react-icons/bi";
import properties from "../app/data/properties.json";

export default function Listings() {
  return (
    <section id="listings" className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center md:mb-8 md:mb-16 flex flex-col items-center">
          <span className="text-sm md:text-base font-bold text-[var(--blue)] mb-2 tracking-wide">
            أحدث العروض
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            نقدم لك مجموعة من أبرز عقاراتنا في السلطنة
          </h2>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
          {properties.map((p) => (
            <Link
              key={p.id}
              href={`/${encodeURIComponent(p.slug)}`}
              className="group flex flex-col cursor-pointer no-underline"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-5 bg-gray-200">
                <img
                  src={p.mainImg}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-sm font-bold shadow-md ${
                    p.type === "للبيع"
                      ? "bg-[var(--blue)] text-white"
                      : "bg-white text-gray-900"
                  }`}
                >
                  {p.type}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col px-2 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--blue)] transition-colors duration-300">
                  {p.title}
                </h3>

                <div className="flex items-center gap-1 text-gray-700 mb-3">
                  <IoLocationOutline className="w-4 h-4 flex-shrink-0" />
                  <span className="text-[13px] font-regular">{p.location}</span>
                </div>

                <div className="flex flex-wrap items-center gap-5 text-gray-700 mb-6">
                  {p.area && (
                    <div className="flex items-center gap-1.5">
                      <BiArea className="w-[16px] h-[16px] flex-shrink-0" />
                      <span className="text-[13px] font-regular">
                        {p.area} م²
                      </span>
                    </div>
                  )}
                  {p.rooms > 0 && (
                    <div className="flex items-center gap-1.5">
                      <IoBedOutline className="w-[16px] h-[16px] flex-shrink-0" />
                      <span className="text-[13px] font-regular">
                        {p.rooms} نوم
                      </span>
                    </div>
                  )}
                  {p.baths > 0 && (
                    <div className="flex items-center gap-1.5">
                      <BiBath className="w-[16px] h-[16px] flex-shrink-0" />
                      <span className="text-[13px] font-regular">
                        {p.baths} دورات مياه
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                  <div className="text-xl font-medium text-gray-900 flex items-center gap-1.5 tracking-tight pt-3">
                    <span>{p.price}</span>
                    {/* عرض 'ر.ع' إذا لم يكن السعر يحتوي عليها أو على كلمة 'شهر' */}
                    {!p.price.includes("ر.ع") && !p.price.includes("شهر") && (
                      <span className="text-lg font-medium">ر.ع</span>
                    )}
                  </div>
                  <span className="mt-3 bg-[var(--blue)] text-white px-6 py-2.5 rounded-xl text-xs font-light">
                    التفاصيل
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8 md:mt-12">
          <button className="bg-[#f5f5f5] text-gray-900 px-10 py-3.5 rounded-full font-medium text-base hover:bg-[#ebebeb] transition-colors duration-300">
            تصفح المزيد من العروض
          </button>
        </div>
      </div>
    </section>
  );
}
