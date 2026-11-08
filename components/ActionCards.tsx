import React from "react";

export default function ActionCards({
  onPublish,
  onRequest,
}: {
  onPublish: () => void;
  onRequest: () => void;
}) {
  const cards = [
    {
      title: "هل ترغب ببيع أو تأجير عقارك؟",
      desc: "شارك معنا تفاصيل عقارك وسيقوم فريقنا بمراجعته والتواصل معك لإتمام الإجراءات وإدراج إعلانك ضمن عروضنا المميزة.",
      btn: "أضف عقارك الآن",
      action: onPublish,
    },
    {
      title: "تبحث عن عقار بمواصفات معينة؟",
      desc: "إذا لم تجد العقار المناسب ضمن عروضنا الحالية، أرسل لنا طلبك وسيتولى فريقنا البحث والتواصل معك لتوفير ما يلبي طموحك.",
      btn: "اطلب عقاراً",
      action: onRequest,
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header (Right Aligned in RTL) */}
        <div className="text-center md:mb-8 md:mb-16 flex flex-col items-center">
          <span className="text-sm md:text-base font-bold text-[var(--blue)] mb-2 tracking-wide">
            خدماتنا العقارية
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            كيف يمكننا مساعدتك؟
          </h2>
        </div>

        {/* Action Blocks (Split Layout with Vertical Divider) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 relative">
          {/* Subtle Vertical Divider for Desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-gray-300 transform -translate-x-1/2"></div>

          {/* Cards Loop */}
          {cards.map((card, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center px-4 md:px-12 lg:px-20 ${
                i === 0 ? "md:pl-16 lg:pl-24" : "md:pr-16 lg:pr-24"
              }`}
            >
              <h3 className="text-gray-900 text-xl lg:text-[26px] font-medium mb-3 leading-tight">
                {card.title}
              </h3>

              <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-md font-regular">
                {card.desc}
              </p>

              <button
                onClick={card.action}
                className="w-full bg-[var(--blue)] text-white py-2.5 rounded-full font-medium text-base hover:bg-blue-700 transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                {card.btn}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
