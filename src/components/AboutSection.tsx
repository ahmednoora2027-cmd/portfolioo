import { PROFILE, WORK_PRINCIPLES } from '../data/portfolioData';

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Bio Column */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-sky-600 dark:text-sky-400">نبذة عني</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white [text-wrap:balance]">
                من الفكرة إلى الموقع المتكامل والحل التقني السريع
              </h2>
            </div>

            <div className="space-y-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                أنا <strong>{PROFILE.name}</strong>، عمري {PROFILE.age} وأقيم في {PROFILE.location}. أدرس في <strong>معهد الحجاز</strong> تخصص <strong>نظم ومعلومات إدارية (BIS)</strong>، مما يمنحني فهماً عملياً لربط الحلول التقنية باحتياجات المستخدمين والأعمال.
              </p>
              <p>
                أعمل في تصميم وبرمجة مواقع الويب الحديثة المتجاوبة مع جميع الشاشات، وإلى جانب ذلك أقدم خدمات الدعم الفني أونلاين لحل مشاكل أنظمة ويندوز 10 و11 عن بُعد من تسريع الأجهزة وإصلاح الأعطال وحتى تهيئة البرامج والتعريفات.
              </p>
            </div>
          </div>

          {/* Principles Column (editorial numbered list with hairline dividers) */}
          <div className="lg:col-span-6 divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
            {WORK_PRINCIPLES.map((item) => (
              <div key={item.number} className="py-5 first:pt-4 last:pb-4 flex items-start gap-4">
                <span className="font-mono text-sm font-semibold text-sky-600 dark:text-sky-400 pt-0.5 tabular-nums shrink-0">
                  {item.number}.
                </span>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
