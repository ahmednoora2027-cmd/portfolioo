import { useState } from 'react';
import { ArrowLeft, MessageCircle, Moon, Phone, Sun, Wrench } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface HeroProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Hero({ isDark, onToggleTheme }: HeroProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="hero" className="pt-10 pb-14 sm:pt-16 sm:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Primary editorial intro */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2 space-y-6">
            <div className="space-y-5">
              {/* Clean unboxed metadata kicker */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                <span>القاهرة، المرج</span>
                <span aria-hidden="true">·</span>
                <span>معهد الحجاز (BIS)</span>
                <span aria-hidden="true">·</span>
                <span className="text-sky-600 dark:text-sky-400 font-semibold">
                  متاح لتصميم المواقع والدعم أونلاين
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.2] tracking-tight text-slate-950 dark:text-white [text-wrap:balance]">
                {PROFILE.name}
              </h1>

              <p className="text-lg sm:text-xl font-semibold text-sky-700 dark:text-sky-400 [text-wrap:balance]">
                {PROFILE.role}
              </p>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                أجمع بين دراسة نظم المعلومات الإدارية وتصميم وبرمجة مواقع الويب السريعة، مع خبرة عملية في الدعم الفني وحل مشاكل أنظمة ويندوز عن بُعد بكفاءة ووضوح.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm sm:text-base font-semibold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <span>اطلب خدمة الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </a>

              <a
                href="#troubleshooter"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-sky-500 dark:hover:border-sky-500 text-slate-800 dark:text-slate-100 text-sm sm:text-base font-semibold whitespace-nowrap shrink-0 transition-colors"
              >
                <Wrench className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>فحص مشاكل الويندوز</span>
              </a>

              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={isDark ? 'التبديل إلى المظهر الفاتح' : 'التبديل إلى المظهر الداكن'}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/70 hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium whitespace-nowrap shrink-0 transition-colors"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>فاتح</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-700" />
                    <span>داكن</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Personal Circular Portrait Container */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center gap-5 py-2">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 aspect-square rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-900 shadow-lg shrink-0">
              {!imgFailed ? (
                <img
                  src={PROFILE.photoUrl}
                  alt={`الصورة الشخصية — ${PROFILE.name}`}
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full object-cover object-[50%_22%]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-white p-6 text-center">
                  <span className="text-5xl font-extrabold tracking-tight text-sky-400 mb-2">
                    AE
                  </span>
                  <p className="text-sm font-bold">{PROFILE.shortName}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-3">
              <div>
                <p className="text-base font-bold text-slate-950 dark:text-white">
                  {PROFILE.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {PROFILE.location} · {PROFILE.age}
                </p>
              </div>

              <a
                href={PROFILE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold whitespace-nowrap shrink-0 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>تواصل عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>

        {/* Full-width 4-column summary strip below hero split */}
        <div className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-slate-200 dark:divide-slate-800">
          <div className="p-5">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">الدراسة الأكاديمية</p>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
              معهد الحجاز — نظم ومعلومات (BIS)
            </p>
          </div>
          <div className="p-5">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">التخصص العملي</p>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
              تصميم مواقع + دعم فني ويندوز
            </p>
          </div>
          <div className="p-5">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">الإقامة والعمر</p>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
              {PROFILE.location} · {PROFILE.age}
            </p>
          </div>
          <div className="p-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">اتصال مباشر</p>
              <a
                href={`tel:${PROFILE.phone}`}
                dir="ltr"
                className="inline-block font-mono text-sm font-semibold text-sky-700 dark:text-sky-400 hover:underline mt-1 tabular-nums"
              >
                {PROFILE.phone}
              </a>
            </div>
            <a
              href={`tel:${PROFILE.phone}`}
              aria-label="اتصال هاتفي"
              className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shrink-0"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
