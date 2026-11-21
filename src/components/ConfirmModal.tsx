import { useEffect } from 'react';
import { CheckCircle2, Copy, MessageCircle, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export interface SubmittedOrder {
  name: string;
  contact: string;
  service: string;
  message: string;
}

interface ConfirmModalProps {
  order: SubmittedOrder | null;
  copied: boolean;
  onCopy: () => void;
  onClose: () => void;
}

export function ConfirmModal({ order, copied, onCopy, onClose }: ConfirmModalProps) {
  useEffect(() => {
    if (!order) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [order, onClose]);

  if (!order) return null;

  const formattedText = `طلب خدمة إلى ${PROFILE.name}\nالاسم: ${order.name}\nالتواصل: ${order.contact}\nالخدمة: ${order.service}\nالتفاصيل: ${order.message}`;
  const whatsappHref = `${PROFILE.whatsappUrl}?text=${encodeURIComponent(formattedText)}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <h3 id="order-modal-title" className="text-lg font-bold text-slate-950 dark:text-white">
              تم تجهيز طلبك بنجاح
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق النافذة"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-4 text-sm space-y-2 text-slate-700 dark:text-slate-300">
          <p>
            <strong className="text-slate-950 dark:text-white">الاسم:</strong> {order.name}
          </p>
          <p>
            <strong className="text-slate-950 dark:text-white">وسيلة التواصل:</strong> {order.contact}
          </p>
          <p>
            <strong className="text-slate-950 dark:text-white">الخدمة:</strong> {order.service}
          </p>
          <p>
            <strong className="text-slate-950 dark:text-white">التفاصيل:</strong> {order.message}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold whitespace-nowrap transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>إرسال عبر واتساب</span>
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold whitespace-nowrap transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? 'تم النسخ!' : 'نسخ التفاصيل'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
