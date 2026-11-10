import React from "react";

// تم تعديل الأرقام لتكون واقعية ومتناسقة مع حجم العقارات المعروضة
const stats = [
  { value: "+10", label: "عقارات متوفرة حالياً" },
  { value: "+50", label: "عميل تمت خدمته" },
  { value: "100%", label: "شفافية وموثوقية" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#FFFFFF]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm md:text-base font-bold text-[var(--blue)] mb-3 tracking-wide">
          من نحن
        </p>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-snug">
          من نحن؟ خبرة محلية تفهم طموحك العقاري
        </h2>

        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-16">
          نحن وكالة{" "}
          <strong className="text-gray-900"> Trust Real Estate</strong> المتخصصة
          في تقديم حلول عقارية متكاملة للأفراد والمستثمرين في مسقط وكافة ولايات
          سلطنة عُمان. نساعد عملاءنا في الشراء، البيع، التأجير، وإدارة الأملاك
          من خلال خدمات احترافية ترتكز على الشفافية والموثوقية العالية.
        </p>

        <div className="grid grid-cols-3 gap-0 border-t border-gray-100 pt-10">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center px-3 md:px-10 ${
                i < stats.length - 1 ? "border-l border-gray-200" : ""
              }`}
              style={{ borderLeftStyle: "solid" }}
            >
              <span className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-none">
                {s.value}
              </span>
              <span className="text-xs md:text-base text-gray-500 leading-snug text-center">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
