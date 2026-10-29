"use client";
import { useState } from "react";
import { FiX, FiCheckCircle } from "react-icons/fi";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  type: "publish" | "request";
}

interface PublishForm {
  propType: string;
  status: string;
  area_name: string;
  price: string;
  area: string;
  phone: string;
  notes: string;
}

interface RequestForm {
  propType: string;
  budget: string;
  location: string;
  phone: string;
  notes: string;
}

type Errors<T> = Partial<Record<keyof T, string>>;

export default function Modal({ open, onClose, type }: ModalProps) {
  const isPublish = type === "publish";
  const [submitted, setSubmitted] = useState(false);

  /* ── Publish state ── */
  const [pub, setPub] = useState<PublishForm>({
    propType: "",
    status: "",
    area_name: "",
    price: "",
    area: "",
    phone: "",
    notes: "",
  });
  const [pubErr, setPubErr] = useState<Errors<PublishForm>>({});

  /* ── Request state ── */
  const [req, setReq] = useState<RequestForm>({
    propType: "",
    budget: "",
    location: "",
    phone: "",
    notes: "",
  });
  const [reqErr, setReqErr] = useState<Errors<RequestForm>>({});

  if (!open) return null;

  /* ── Validation ── */
  function validatePublish() {
    const e: Errors<PublishForm> = {};
    if (!pub.propType) e.propType = "يرجى اختيار نوع العقار";
    if (!pub.status) e.status = "يرجى اختيار حالة العقار";
    if (!pub.area_name) e.area_name = "يرجى إدخال المنطقة";
    if (!pub.phone) e.phone = "رقم التواصل مطلوب";
    setPubErr(e);
    return Object.keys(e).length === 0;
  }

  function validateRequest() {
    const e: Errors<RequestForm> = {};
    if (!req.propType) e.propType = "يرجى اختيار نوع العقار";
    if (!req.phone) e.phone = "رقم الهاتف مطلوب";
    setReqErr(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    const valid = isPublish ? validatePublish() : validateRequest();
    if (valid) setSubmitted(true);
  }

  function handleClose() {
    setSubmitted(false);
    setPub({
      propType: "",
      status: "",
      area_name: "",
      price: "",
      area: "",
      phone: "",
      notes: "",
    });
    setReq({ propType: "", budget: "", location: "", phone: "", notes: "" });
    setPubErr({});
    setReqErr({});
    onClose();
  }

  /* ── Field helpers ── */
  const fieldBase =
    "w-full px-4 py-3.5 rounded-xl border bg-[#f5f5f5] text-primary text-[15px] outline-none transition-colors placeholder:text-muted/60";
  const fieldNormal = `${fieldBase} border-border focus:border-blue`;
  const fieldError = `${fieldBase} border-red-400 bg-red-50 focus:border-red-500`;

  const ErrMsg = ({ msg }: { msg?: string }) =>
    msg ? <p className="text-red-500 text-xs mt-1 font-medium">{msg}</p> : null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center p-0 md:p-6 transition-opacity"
      style={{ background: "rgba(14,31,26,0.6)", backdropFilter: "blur(4px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
        className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-full md:max-w-[480px] shadow-2xl flex flex-col transition-all duration-300 max-h-[88vh] md:max-h-[calc(100dvh-48px)] overflow-hidden"
      >
        {/* ── Mobile Handle Bar ── */}
        <div className="flex justify-center pt-3 pb-1 md:hidden flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* ── Header (Fixed) ── */}
        <div className="flex items-center justify-center px-6 md:px-7 pt-2 md:pt-7 pb-4 flex-shrink-0">
          <div>
            <h2 className="text-xl text-center md:text-2xl font-black text-primary leading-snug">
              {isPublish
                ? "أضف عقارك وسنتواصل معك"
                : "أخبرنا عن العقار الذي تبحث عنه"}
            </h2>
          </div>
          {/* <button
            onClick={handleClose}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors mr-2"
          >
            <FiX size={18} className="text-muted" />
          </button> */}
        </div>

        {/* ── Scrollable Body (Scrollbar Hidden on Mobile) ── */}
        <div className="overflow-y-auto flex-1 px-6 md:px-7 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {submitted ? (
            /* ── Success ── */
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue/10 flex items-center justify-center">
                <FiCheckCircle size={32} className="text-blue" />
              </div>
              <h3 className="text-xl font-black text-primary">
                تم الإرسال بنجاح!
              </h3>
              <p className="text-muted text-sm leading-relaxed max-w-xs">
                شكراً لك، سيتواصل معك فريق Trust Real Estate للعقارات في أقرب
                وقت ممكن.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 bg-blue text-white font-bold text-sm px-8 py-3.5 rounded-full hover:bg-blue/90 transition-colors"
              >
                إغلاق
              </button>
            </div>
          ) : isPublish ? (
            /* ── Publish form ── */
            <div className="flex flex-col gap-3.5 pb-4">
              <div>
                <select
                  value={pub.propType}
                  onChange={(e) => setPub({ ...pub, propType: e.target.value })}
                  className={
                    pub.propType === "" && pubErr.propType
                      ? fieldError
                      : fieldNormal
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
                <ErrMsg msg={pubErr.propType} />
              </div>

              <div>
                <select
                  value={pub.status}
                  onChange={(e) => setPub({ ...pub, status: e.target.value })}
                  className={
                    pub.status === "" && pubErr.status
                      ? fieldError
                      : fieldNormal
                  }
                >
                  <option value="">حالة العقار</option>
                  <option>للبيع</option>
                  <option>للإيجار</option>
                </select>
                <ErrMsg msg={pubErr.status} />
              </div>

              <div>
                <input
                  placeholder="المنطقة"
                  value={pub.area_name}
                  onChange={(e) =>
                    setPub({ ...pub, area_name: e.target.value })
                  }
                  className={pubErr.area_name ? fieldError : fieldNormal}
                />
                <ErrMsg msg={pubErr.area_name} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="السعر (USD)"
                  type="number"
                  value={pub.price}
                  onChange={(e) => setPub({ ...pub, price: e.target.value })}
                  className={fieldNormal}
                />
                <input
                  placeholder="المساحة (م²)"
                  type="number"
                  value={pub.area}
                  onChange={(e) => setPub({ ...pub, area: e.target.value })}
                  className={fieldNormal}
                />
              </div>

              <div>
                <input
                  placeholder="رقم التواصل *"
                  value={pub.phone}
                  onChange={(e) => setPub({ ...pub, phone: e.target.value })}
                  className={
                    pubErr.phone ? fieldError : `${fieldNormal} border-blue/40`
                  }
                />
                <ErrMsg msg={pubErr.phone} />
              </div>

              <textarea
                placeholder="تفاصيل إضافية..."
                rows={3}
                value={pub.notes}
                onChange={(e) => setPub({ ...pub, notes: e.target.value })}
                className={`${fieldNormal} resize-none`}
              />
            </div>
          ) : (
            /* ── Request form ── */
            <div className="flex flex-col gap-3.5 pb-4">
              <div>
                <select
                  value={req.propType}
                  onChange={(e) => setReq({ ...req, propType: e.target.value })}
                  className={
                    req.propType === "" && reqErr.propType
                      ? fieldError
                      : fieldNormal
                  }
                >
                  <option value="">نوع العقار المطلوب</option>
                  <option>شقة</option>
                  <option>فيلا</option>
                  <option>مكتب</option>
                  <option>أرض</option>
                </select>
                <ErrMsg msg={reqErr.propType} />
              </div>

              <input
                placeholder="الميزانية التقريبية (USD)"
                value={req.budget}
                onChange={(e) => setReq({ ...req, budget: e.target.value })}
                className={fieldNormal}
              />

              <input
                placeholder="المنطقة المفضلة"
                value={req.location}
                onChange={(e) => setReq({ ...req, location: e.target.value })}
                className={fieldNormal}
              />

              <div>
                <input
                  placeholder="رقم الهاتف / واتساب *"
                  value={req.phone}
                  onChange={(e) => setReq({ ...req, phone: e.target.value })}
                  className={
                    reqErr.phone ? fieldError : `${fieldNormal} border-blue/40`
                  }
                />
                <ErrMsg msg={reqErr.phone} />
              </div>

              <textarea
                placeholder="ملاحظات خاصة..."
                rows={3}
                value={req.notes}
                onChange={(e) => setReq({ ...req, notes: e.target.value })}
                className={`${fieldNormal} resize-none`}
              />
            </div>
          )}
        </div>

        {/* ── Footer CTA (Fixed at Bottom) ── */}
        {!submitted && (
          <div className="px-6 md:px-7 pb-6 md:pb-7 pt-3 border-t border-gray-100 flex-shrink-0 bg-white">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue text-white font-bold text-base py-4 rounded-2xl hover:bg-blue/90 active:scale-[0.98] transition-all shadow-md"
            >
              {isPublish ? "إرسال الإعلان" : "إرسال الطلب"}
            </button>
            <p className="text-center text-xs text-muted mt-2.5">
              سيتواصل معك فريقنا في أقرب وقت ممكن
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
