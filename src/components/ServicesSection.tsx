import { ArrowLeft, Check } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface ServicesSectionProps {
  onSelectService: (serviceValue: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="services" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-sky-600 dark:text-sky-400">خدماتي</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white [text-wrap:balance]">
              حلول الويب والدعم الفني التي أقدمها
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            اختر الخدمة المناسبة للانتقال مباشرة إلى نموذج الطلب وتجهيز التفاصيل
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 flex flex-col justify-between gap-6 hover:border-sky-500/60 dark:hover:border-sky-500/60 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <span className="font-mono text-sm font-semibold text-sky-600 dark:text-sky-400 tabular-nums">
                    {service.number}.
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {service.shortTag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                  {service.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2 pt-1">
                  {service.highlights.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <Check className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onSelectService(service.serviceValue)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 hover:bg-sky-600 hover:border-sky-600 hover:text-white dark:hover:bg-sky-600 dark:hover:border-sky-600 text-slate-900 dark:text-slate-100 text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <span>{service.ctaLabel}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
