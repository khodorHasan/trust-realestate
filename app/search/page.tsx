import React, { Suspense } from "react";
import Link from "next/link";
import {
  IoLocationOutline,
  IoBedOutline,
  IoArrowForward,
} from "react-icons/io5";
import { BiBath, BiArea } from "react-icons/bi";
import properties from "../data/properties.json"; // تأكد من تحديث بيانات JSON لاحقاً لتطابق عُمان
import Navbar from "../../components/Navbar";

// دالة مساعدة لاستخراج الأرقام فقط من نصوص الأسعار
function parseNumericPrice(priceStr: string): number {
  if (!priceStr) return 0;
  const clean = priceStr.replace(/[^0-9]/g, "");
  return clean ? parseInt(clean, 10) : 0;
}

type SearchParamsProps = {
  searchParams:
    | Promise<{
        type?: string;
        location?: string;
        propType?: string;
        maxPrice?: string;
      }>
    | {
        type?: string;
        location?: string;
        propType?: string;
        maxPrice?: string;
      };
};

async function SearchResultsList({ searchParams }: SearchParamsProps) {
  // فك تشفير المعاملات من الرابط لتقبل الأحرف العربية بكل أمان (Next.js 14/15)
  const resolvedParams = await searchParams;

  const typeParam = resolvedParams.type
    ? decodeURIComponent(resolvedParams.type)
    : "";
  const locationParam = resolvedParams.location
    ? decodeURIComponent(resolvedParams.location)
    : "";
  const propTypeParam = resolvedParams.propType
    ? decodeURIComponent(resolvedParams.propType)
    : "";
  const maxPriceParam = resolvedParams.maxPrice
    ? parseInt(resolvedParams.maxPrice, 10)
    : null;

  // فلترة العقارات بحسب الخيارات المختارة
  const filteredProperties = properties.filter((p) => {
    // 1. التصفية حسب نوع العقد (للبيع / للإيجار)
    if (typeParam && p.type !== typeParam) {
      return false;
    }

    // 2. التصفية حسب المدينة/المنطقة
    if (
      locationParam &&
      locationParam !== "الكل" &&
      !p.location.includes(locationParam)
    ) {
      return false;
    }

    // 3. التصفية حسب نوع العقار (فلة، توين فلة، أرض...)
    if (propTypeParam && propTypeParam !== "الكل") {
      const matchTitle = p.title ? p.title.includes(propTypeParam) : false;
      const matchType = (p as any).propType
        ? (p as any).propType === propTypeParam
        : false;
      if (!matchTitle && !matchType) return false;
    }

    // 4. التصفية حسب الحد الأقصى للسعر
    if (maxPriceParam && maxPriceParam > 0) {
      const priceValue = parseNumericPrice(p.price);
      if (priceValue > 0 && priceValue > maxPriceParam) {
        return false;
      }
    }

    return true;
  });

  return (
    <div dir="rtl" className="min-h-screen bg-white py-6 px-6 md:px-20">
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white mt-12">
        {/* Navigation & Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            نتائج البحث عن العقارات
          </h1>

          {/* Active Search Filter Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
            <span className="text-gray-500 font-medium">الفلاتر المطبقة:</span>
            {typeParam && (
              <span className="bg-blue-50 text-[var(--blue,#1b5ebe)] px-3 py-1 rounded-full border border-blue-200 font-medium">
                النوع: {typeParam}
              </span>
            )}
            {locationParam && (
              <span className="bg-blue-50 text-[var(--blue,#1b5ebe)] px-3 py-1 rounded-full border border-blue-200 font-medium">
                المنطقة: {locationParam}
              </span>
            )}
            {propTypeParam && (
              <span className="bg-blue-50 text-[var(--blue,#1b5ebe)] px-3 py-1 rounded-full border border-blue-200 font-medium">
                نوع العقار: {propTypeParam}
              </span>
            )}
            {maxPriceParam && (
              <span className="bg-blue-50 text-[var(--blue,#1b5ebe)] px-3 py-1 rounded-full border border-blue-200 font-medium">
                السعر الأقصى: {maxPriceParam.toLocaleString()} ر.ع
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm md:text-base">
            تم العثور على{" "}
            <strong className="text-gray-900 font-bold">
              {filteredProperties.length}
            </strong>{" "}
            عقار يتطابق مع معايير البحث
          </p>
        </div>

        {/* Properties Grid or Empty State */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-blue-50 text-[var(--blue,#1b5ebe)] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              !
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              لم نجد عقارات تطابق خياراتك الحالية
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
              جرّب تغيير المنطقة أو الميزانية للحصول على نتائج أكثر.
            </p>
            <Link
              href="/"
              className="inline-block bg-[var(--blue,#1b5ebe)] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:opacity-95 transition-opacity"
            >
              تصفح جميع العقارات
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {filteredProperties.map((p) => (
              <Link
                key={p.id}
                href={`/${encodeURIComponent(p.slug)}`}
                className="group flex flex-col cursor-pointer no-underline bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200">
                  <img
                    src={p.mainImg}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div
                    className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-sm font-bold shadow-md ${
                      p.type === "للبيع"
                        ? "bg-[var(--blue,#1b5ebe)] text-white"
                        : "bg-white text-gray-900"
                    }`}
                  >
                    {p.type}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col p-5 flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--blue,#1b5ebe)] transition-colors duration-300">
                    {p.title}
                  </h3>

                  <div className="flex items-center gap-1 text-gray-700 mb-3">
                    <IoLocationOutline className="w-4 h-4 flex-shrink-0" />
                    <span className="text-[13px] font-regular">
                      {p.location}
                    </span>
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

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <div className="text-xl font-medium text-gray-900 flex items-center gap-1.5 tracking-tight">
                      <span>{p.price}</span>
                      {/* إخفاء إشارة الدولار وإظهار ر.ع إذا لم تكن موجودة في النص الأصلي */}
                      {!p.price.includes("ر.ع") && !p.price.includes("شهر") && (
                        <span className="text-lg font-medium">ر.ع</span>
                      )}
                    </div>
                    <span className="bg-[var(--blue,#1b5ebe)] text-white px-5 py-2.5 rounded-xl text-xs font-light">
                      التفاصيل
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage({ searchParams }: SearchParamsProps) {
  return (
    <Suspense
      fallback={
        <div className="p-20 text-center text-gray-500 font-medium">
          جاري تحميل نتائج البحث...
        </div>
      }
    >
      <SearchResultsList searchParams={searchParams} />
    </Suspense>
  );
}
