import React from "react";

const stats = [
  { value: "+10", label: "عقارات متوفرة اليوم" },
  { value: "+20", label: "عقار مباع ومؤجر" },
  { value: "200K+", label: "نعرض العقار لأكثر من 200 ألف شخص" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#FFFFFF]">
      <div className="max-w-4xl mx-auto text-center">
        {/* Label */}
        <p className="text-sm md:text-base font-bold text-[var(--blue)] mb-3 tracking-wide">
          من نحن
        </p>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-snug">
          من نحن؟ نعرف السوق أكثر من السوق نفسه
        </h2>

        {/* Paragraph */}
        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-16">
          نحن وكالة{" "}
          <strong className="text-gray-900"> Trust Real Estate</strong> المتخصصة
          في تقديم حلول عقارية شاملة للأفراد والمستثمرين في طرابلس وشمال لبنان.
          نساعد عملاءنا في الشراء والبيع والتأجير وإدارة العقارات من خلال خدمات
          احترافية تتميز بالشفافية والموثوقية وفهم احتياجات كل عميل.
        </p>

        {/* Stats */}
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
