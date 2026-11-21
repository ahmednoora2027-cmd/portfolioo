import { useState } from 'react';
import { Check, ChevronLeft, Copy, Headphones, Terminal } from 'lucide-react';
import { WINDOWS_ISSUES } from '../data/portfolioData';

interface TroubleshooterSectionProps {
  onRequestSupport: (issueTitle: string) => void;
}

export function TroubleshooterSection({ onRequestSupport }: TroubleshooterSectionProps) {
  const [activeIssueId, setActiveIssueId] = useState(WINDOWS_ISSUES[0].id);
  const [copiedCommand, setCopiedCommand] = useState(false);

  const currentIssue =
    WINDOWS_ISSUES.find((item) => item.id === activeIssueId) ?? WINDOWS_ISSUES[0];

  const handleSelectIssue = (id: string) => {
    setActiveIssueId(id);
    setCopiedCommand(false);
  };

  const handleCopyCommand = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2000);
    } catch {
      setCopiedCommand(false);
    }
  };

  return (
    <section
      id="troubleshooter"
      className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-2 mb-10 max-w-2xl">
          <p className="text-xs font-semibold text-sky-600 dark:text-sky-400">تشخيص سريع</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white [text-wrap:balance]">
            مساعد فحص مشاكل الويندوز
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            اختر المشكلة التي تواجه جهازك لاستعراض خطوات الفحص الأولية، أو اطلب جلسة دعم فني أونلاين لحلها مباشرة.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Issue selector list */}
          <div className="lg:col-span-5 space-y-2.5">
            {WINDOWS_ISSUES.map((issue) => {
              const active = issue.id === currentIssue.id;
              return (
                <button
                  key={issue.id}
                  type="button"
                  onClick={() => handleSelectIssue(issue.id)}
                  className={`w-full text-right p-4 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                    active
                      ? 'border-sky-600 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 font-bold'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-sky-500/50 font-medium'
                  }`}
                >
                  <span className="text-sm leading-snug">{issue.title}</span>
                  <ChevronLeft
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      active ? 'text-sky-600 dark:text-sky-400 -translate-x-0.5' : 'opacity-50'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Diagnostic detail panel */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                  {currentIssue.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentIssue.summary}
                </p>
              </div>

              {currentIssue.command && (
                <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Terminal className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                    <code
                      dir="ltr"
                      className="font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate"
                    >
                      {currentIssue.command}
                    </code>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyCommand(currentIssue.command!)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-sky-500 text-slate-700 dark:text-slate-200 whitespace-nowrap shrink-0 transition-colors"
                  >
                    {copiedCommand ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ الأمر</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  خطوات الفحص الأولية
                </p>
                <ol className="divide-y divide-slate-100 dark:divide-slate-800">
                  {currentIssue.steps.map((step, index) => (
                    <li
                      key={step}
                      className="py-3 first:pt-1 last:pb-1 flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                    >
                      <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400 pt-1 tabular-nums shrink-0">
                        0{index + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                تحتاج مساعدة فورية لحل هذه المشكلة على جهازك؟
              </p>
              <button
                type="button"
                onClick={() => onRequestSupport(currentIssue.title)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors"
              >
                <Headphones className="w-4 h-4" />
                <span>اطلب حلها أونلاين</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
