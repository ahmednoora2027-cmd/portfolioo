import { useState, type FormEvent, type RefObject } from 'react';
import { Check, CheckCircle2, Copy, MessageCircle, PhoneCall } from 'lucide-react';
import { PROFILE, SERVICES } from '../data/portfolioData';
import type { SubmittedOrder } from './ConfirmModal';

interface ContactSectionProps {
  serviceType: string;
  onServiceTypeChange: (value: string) => void;
  message: string;
  onMessageChange: (value: string) => void;
  nameInputRef: RefObject<HTMLInputElement | null>;
  messageInputRef: RefObject<HTMLTextAreaElement | null>;
  onSubmitOrder: (order: SubmittedOrder) => void;
}

export function ContactSection({
  serviceType,
  onServiceTypeChange,
  message,
  onMessageChange,
  nameInputRef,
  messageInputRef,
  onSubmitOrder,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [formError, setFormError] = useState('');
  const [phoneCopied, setPhoneCopied] = useState(false);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.phone);
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2200);
    } catch {
      setPhoneCopied(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedContact = contact.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedContact || !trimmedMessage) {
      setFormError('يرجى إدخال الاسم، وسيلة التواصل، وتفاصيل الطلب قبل المتابعة.');
      return;
    }

    setFormError('');
    onSubmitOrder({
      name: trimmedName,
      contact: trimmedContact,
      service: serviceType,
      message: trimmedMessage,
    });
    setName('');
    setContact('');
    onMessageChange('');
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/30"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <p className="text-xs font-semibold text-sky-600 dark:text-sky-400">تواصل معي</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
            اطلب خدمة أو استشارة تقنية
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            تواصل مباشرة عبر الهاتف أو واتساب، أو جهّز تفاصيل طلبك عبر النموذج التالي
          </p>
        </div>

        {/* Direct contact quick strip */}
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <a
            href={`tel:${PROFILE.phone}`}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center gap-3 hover:border-sky-500 transition-colors"
          >
            <PhoneCall className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">اتصال مباشر</p>
              <p dir="ltr" className="font-mono text-sm font-semibold text-slate-950 dark:text-white tabular-nums">
                {PROFILE.phone}
              </p>
            </div>
          </a>

          <a
            href={PROFILE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center gap-3 hover:border-emerald-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">واتساب فوري</p>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                مراسلة عبر واتساب
              </p>
            </div>
          </a>

          <button
            type="button"
            onClick={handleCopyPhone}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center gap-3 hover:border-sky-500 transition-colors text-right"
          >
            {phoneCopied ? (
              <Check className="w-5 h-5 text-emerald-500 shrink-0" />
            ) : (
              <Copy className="w-5 h-5 text-slate-600 dark:text-slate-400 shrink-0" />
            )}
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">نسخ رقم الهاتف</p>
              <p className="text-sm font-semibold text-slate-950 dark:text-white tabular-nums">
                {phoneCopied ? 'تم نسخ الرقم!' : `نسخ ${PROFILE.phone}`}
              </p>
            </div>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="client-name"
                className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5"
              >
                الاسم بالكامل
              </label>
              <input
                ref={nameInputRef}
                id="client-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: محمد أحمد"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label
                htmlFor="client-contact"
                className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5"
              >
                رقم الواتساب أو البريد الإلكتروني
              </label>
              <input
                id="client-contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="رقم الهاتف أو البريد الإلكتروني"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="service-type"
              className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5"
            >
              نوع الخدمة المطلوبة
            </label>
            <select
              id="service-type"
              value={serviceType}
              onChange={(e) => onServiceTypeChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {SERVICES.map((service) => (
                <option key={service.id} value={service.serviceValue}>
                  {service.serviceValue}
                </option>
              ))}
              <option value="استشارة عامة / أخرى">استشارة عامة / أخرى</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="client-message"
              className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5"
            >
              تفاصيل الطلب أو المشكلة
            </label>
            <textarea
              ref={messageInputRef}
              id="client-message"
              rows={4}
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              placeholder="اكتب فكرة الموقع المطلوب أو وصف مشكلة الويندوز على جهازك..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {formError && (
            <div
              role="alert"
              className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-sm font-medium"
            >
              {formError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm sm:text-base font-semibold transition-colors inline-flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>تأكيد وتجهيز الطلب</span>
          </button>
        </form>
      </div>
    </section>
  );
}
