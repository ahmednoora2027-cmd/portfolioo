import { useState } from 'react';
import { SKILLS, type SkillCategory } from '../data/portfolioData';

const FILTER_TABS: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'web', label: 'تصميم وبرمجة' },
  { id: 'support', label: 'دعم فني وويندوز' },
  { id: 'bis', label: 'نظم معلومات BIS' },
];

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<SkillCategory>('all');

  const filteredSkills =
    activeFilter === 'all'
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === activeFilter);

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-10">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-sky-600 dark:text-sky-400">المهارات والأدوات</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
              الخبرات التقنية والأكاديمية
            </h2>
          </div>

          {/* Interactive segmented filter tabs */}
          <div
            role="tablist"
            aria-label="تصفية المهارات"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 self-start lg:self-auto"
          >
            {FILTER_TABS.map((tab) => {
              const selected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                    selected
                      ? 'bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3"
            >
              <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{skill.categoryLabel}</span>
                <span className="font-semibold text-sky-600 dark:text-sky-400">{skill.level}</span>
              </div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white">{skill.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
