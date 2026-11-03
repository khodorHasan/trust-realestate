"use client";
import { useState } from "react";
import { FiX, FiCheckCircle, FiUser, FiHome } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  type: "publish" | "request";
}

interface PublisherForm {
  publisherType: "individual" | "agency" | "";
  name: string;
  phone: string;
  agencyName: string;
}

interface PublishForm {
  propType: string;
  status: string;
  area_name: string;
  price: string;
  area: string;
  notes: string;
}

interface RequestForm {
  propType: string;
  budget: string;
  location: string;
  notes: string;
}

type Step = "publisher" | "details";

export default function Modal({ open, onClose, type }: ModalProps) {
  const isPublish = type === "publish";
  const [step, setStep] = useState<Step>("publisher");
  const [submitted, setSubmitted] = useState(false);

  const [publisher, setPublisher] = useState<PublisherForm>({
    publisherType: "",
    name: "",
    phone: "",
    agencyName: "",
  });
  const [pubErrors, setPubErrors] = useState<
    Partial<Record<keyof PublisherForm, string>>
  >({});

  const [pub, setPub] = useState<PublishForm>({
    propType: "",
    status: "",
    area_name: "",
    price: "",
    area: "",
    notes: "",
  });
  const [pubErr, setPubErr] = useState<
    Partial<Record<keyof PublishForm, string>>
  >({});

  const [req, setReq] = useState<RequestForm>({
    propType: "",
    budget: "",
    location: "",
    notes: "",
  });
  const [reqErr, setReqErr] = useState<
    Partial<Record<keyof RequestForm, string>>
  >({});

  if (!open) return null;

  function handleClose() {
    setStep("publisher");
    setSubmitted(false);
    setPublisher({ publisherType: "", name: "", phone: "", agencyName: "" });
    setPubErrors({});
    setPub({
      propType: "",
      status: "",
      area_name: "",
      price: "",
      area: "",
      notes: "",
    });
    setPubErr({});
    setReq({ propType: "", budget: "", location: "", notes: "" });
    setReqErr({});
    onClose();
  }

  /* ── Validate publisher step ── */
  function validatePublisher() {
    const e: Partial<Record<keyof PublisherForm, string>> = {};
    if (!publisher.publisherType) e.publisherType = "يرجى اختيار نوع الحساب";
    if (!publisher.name.trim()) e.name = "الاسم مطلوب";
    if (!publisher.phone.trim()) e.phone = "رقم الهاتف مطلوب";
    if (publisher.publisherType === "agency" && !publisher.agencyName.trim())
      e.agencyName = "اسم المكتب مطلوب";
    setPubErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNextStep() {
    if (validatePublisher()) setStep("details");
  }

  /* ── Validate details step ── */
  function validatePublish() {
    const e: Partial<Record<keyof PublishForm, string>> = {};
    if (!pub.propType) e.propType = "يرجى اختيار نوع العقار";
    if (!pub.status) e.status = "يرجى اختيار حالة العقار";
    if (!pub.area_name) e.area_name = "المنطقة مطلوبة";
    setPubErr(e);
    return Object.keys(e).length === 0;
  }

  function validateRequest() {
    const e: Partial<Record<keyof RequestForm, string>> = {};
    if (!req.propType) e.propType = "يرجى اختيار نوع العقار";
    setReqErr(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    const valid = isPublish ? validatePublish() : validateRequest();
    if (valid) setSubmitted(true);
  }

  /* ── Shared field classes ── */
  const base =
    "w-full px-4 py-3.5 rounded-xl border text-primary text-[15px] outline-none transition-colors placeholder:text-muted/50 bg-[#f9f9f7]";
  const normal = `${base} border-border focus:border-blue`;
  const error = `${base} border-red-400 bg-red-50 focus:border-red-500`;

  const Err = ({ msg }: { msg?: string }) =>
    msg ? (
      <p className="text-red-500 text-xs mt-1.5 font-medium">{msg}</p>
    ) : null;

  /* ── Progress indicator ── */
  const showProgress = !submitted && isPublish;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center p-0 md:p-6"
      style={{ background: "rgba(14,31,26,0.6)", backdropFilter: "blur(4px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
        className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-full md:max-w-[480px] shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "92dvh" }}
      >
        {/* Handle bar — mobile only */}
        <div className="flex justify-center pt-3 pb-0 md:hidden flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* ── Header ── */}
        <div className="flex items-start justify-between px-6 md:px-7 pt-5 pb-3 flex-shrink-0">
          <div className="flex-1">
            {/* Progress dots — publish flow only */}
            {showProgress && (
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={`h-1.5 w-8 rounded-full transition-colors ${step === "publisher" ? "bg-blue" : "bg-blue"}`}
                />
                <div
                  className={`h-1.5 w-8 rounded-full transition-colors ${step === "details" ? "bg-blue" : "bg-gray-200"}`}
                />
              </div>
            )}
            <p className="text-[11px] font-bold text-blue tracking-widest mb-1">
              {submitted
                ? "تم الإرسال"
                : step === "publisher"
                  ? isPublish
                    ? "الخطوة 1 من 2"
                    : "معلوماتك"
                  : "الخطوة 2 من 2"}
            </p>
            <h2 className="text-lg md:text-xl font-black text-primary leading-snug">
              {submitted
                ? "تم الإرسال بنجاح!"
                : step === "publisher"
                  ? "من أنت؟"
                  : isPublish
                    ? "تفاصيل العقار"
                    : "ما الذي تبحث عنه؟"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0 mt-1"
          >
            <FiX size={16} className="text-muted" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 px-6 md:px-7 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* ── SUCCESS ── */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue/10 flex items-center justify-center">
                <FiCheckCircle size={30} className="text-blue" />
              </div>
              <div>
                <h3 className="text-lg font-black text-primary mb-2">
                  وصل طلبك بنجاح
                </h3>
                <p className="text-muted text-sm leading-relaxed max-w-xs">
                  شكراً {publisher.name}، سيتواصل معك فريق الأبطح للعقارات في
                  أقرب وقت ممكن.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="mt-2 bg-blue text-white font-bold text-sm px-10 py-3.5 rounded-full hover:bg-blue/90 transition-colors"
              >
                إغلاق
              </button>
            </div>
          ) : /* ── STEP 1: Publisher type ── */
          step === "publisher" ? (
            <div className="flex flex-col gap-4 pb-4">
              {/* Type selector cards */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    val: "individual" as const,
                    label: "فرد / مالك",
                    icon: <FiUser size={22} />,
                  },
                  {
                    val: "agency" as const,
                    label: "مكتب عقاري",
                    icon: <HiOutlineBuildingOffice2 size={22} />,
                  },
                ].map(({ val, label, icon }) => (
                  <button
                    key={val}
                    onClick={() =>
                      setPublisher({ ...publisher, publisherType: val })
                    }
                    className={`flex flex-col items-center justify-center gap-2 py-5 rounded-2xl border-2 transition-all font-bold text-sm
                      ${
                        publisher.publisherType === val
                          ? "border-blue bg-blue/5 text-blue"
                          : "border-border bg-[#f9f9f7] text-muted hover:border-blue/40"
                      }`}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>
              {pubErrors.publisherType && (
                <p className="text-red-500 text-xs font-medium -mt-2">
                  {pubErrors.publisherType}
                </p>
              )}

              {/* Agency name — only if agency */}
              {publisher.publisherType === "agency" && (
                <div>
                  <input
                    placeholder="اسم المكتب العقاري *"
                    value={publisher.agencyName}
                    onChange={(e) =>
                      setPublisher({ ...publisher, agencyName: e.target.value })
                    }
                    className={pubErrors.agencyName ? error : normal}
                  />
                  <Err msg={pubErrors.agencyName} />
                </div>
              )}

              {/* Name */}
              <div>
                <input
                  placeholder={
                    publisher.publisherType === "agency"
                      ? "اسم المسؤول *"
                      : "الاسم الكامل *"
                  }
                  value={publisher.name}
                  onChange={(e) =>
                    setPublisher({ ...publisher, name: e.target.value })
                  }
                  className={pubErrors.name ? error : normal}
                />
                <Err msg={pubErrors.name} />
              </div>

              {/* Phone */}
              <div>
                <input
                  placeholder="رقم الهاتف / واتساب *"
                  value={publisher.phone}
                  onChange={(e) =>
                    setPublisher({ ...publisher, phone: e.target.value })
                  }
                  className={pubErrors.phone ? error : normal}
                />
                <Err msg={pubErrors.phone} />
              </div>
            </div>
          ) : /* ── STEP 2: Property details ── */
          isPublish ? (
            <div className="flex flex-col gap-3.5 pb-4">
              <div>
                <select
                  value={pub.propType}
                  onChange={(e) => setPub({ ...pub, propType: e.target.value })}
                  className={
                    pub.propType === "" && pubErr.propType ? error : normal
                  }
                >
                  <option value="">نوع العقار</option>
                  <option>شقة</option>
                  <option>فيلا</option>
                  <option>مكتب</option>
                  <option>أرض</option>
                  <option>محل تجاري</option>
                  <option>عمارة</option>
                </select>
                <Err msg={pubErr.propType} />
              </div>

              <div>
                <select
                  value={pub.status}
                  onChange={(e) => setPub({ ...pub, status: e.target.value })}
                  className={
                    pub.status === "" && pubErr.status ? error : normal
                  }
                >
                  <option value="">حالة العقار</option>
                  <option>للبيع</option>
                  <option>للإيجار</option>
                </select>
                <Err msg={pubErr.status} />
              </div>

              <div>
                <input
                  placeholder="المنطقة *"
                  value={pub.area_name}
                  onChange={(e) =>
                    setPub({ ...pub, area_name: e.target.value })
                  }
                  className={pubErr.area_name ? error : normal}
                />
                <Err msg={pubErr.area_name} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="السعر (USD)"
                  type="number"
                  value={pub.price}
                  onChange={(e) => setPub({ ...pub, price: e.target.value })}
                  className={normal}
                />
                <input
                  placeholder="المساحة (م²)"
                  type="number"
                  value={pub.area}
                  onChange={(e) => setPub({ ...pub, area: e.target.value })}
                  className={normal}
                />
              </div>

              <textarea
                placeholder="تفاصيل إضافية..."
                rows={3}
                value={pub.notes}
                onChange={(e) => setPub({ ...pub, notes: e.target.value })}
                className={`${normal} resize-none`}
              />
            </div>
          ) : (
            /* ── Request details ── */
            <div className="flex flex-col gap-3.5 pb-4">
              <div>
                <select
                  value={req.propType}
                  onChange={(e) => setReq({ ...req, propType: e.target.value })}
                  className={
                    req.propType === "" && reqErr.propType ? error : normal
                  }
                >
                  <option value="">نوع العقار المطلوب</option>
                  <option>شقة</option>
                  <option>فيلا</option>
                  <option>مكتب</option>
                  <option>أرض</option>
                </select>
                <Err msg={reqErr.propType} />
              </div>
              <input
                placeholder="الميزانية التقريبية (USD)"
                value={req.budget}
                onChange={(e) => setReq({ ...req, budget: e.target.value })}
                className={normal}
              />
              <input
                placeholder="المنطقة المفضلة"
                value={req.location}
                onChange={(e) => setReq({ ...req, location: e.target.value })}
                className={normal}
              />
              <textarea
                placeholder="ملاحظات خاصة..."
                rows={3}
                value={req.notes}
                onChange={(e) => setReq({ ...req, notes: e.target.value })}
                className={`${normal} resize-none`}
              />
            </div>
          )}
        </div>

        {/* ── Footer CTA ── */}
        {!submitted && (
          <div className="px-6 md:px-7 pb-7 pt-3 border-t border-gray-100 flex-shrink-0 bg-white">
            <div className="flex gap-3">
              {step === "details" && isPublish && (
                <button
                  onClick={() => setStep("publisher")}
                  className="flex-shrink-0 px-5 py-4 rounded-2xl border border-border text-primary font-bold text-sm hover:bg-gray-50 transition-colors"
                >
                  رجوع
                </button>
              )}
              <button
                onClick={
                  step === "publisher"
                    ? isPublish
                      ? handleNextStep
                      : handleSubmit
                    : handleSubmit
                }
                className="flex-1 bg-blue text-white font-bold text-base py-4 rounded-2xl hover:bg-blue/90 active:scale-[0.98] transition-all shadow-sm"
              >
                {step === "publisher"
                  ? isPublish
                    ? "التالي"
                    : "إرسال الطلب"
                  : "نشر الإعلان"}
              </button>
            </div>
            <p className="text-center text-xs text-muted mt-2.5">
              سيتواصل معك فريقنا في أقرب وقت ممكن
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
