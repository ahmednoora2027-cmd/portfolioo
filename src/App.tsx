import { useEffect, useRef, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ConfirmModal, type SubmittedOrder } from './components/ConfirmModal';
import { ContactSection } from './components/ContactSection';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';
import { TroubleshooterSection } from './components/TroubleshooterSection';
import { PROFILE, SERVICES } from './data/portfolioData';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ahmed_theme');
      if (saved === 'light') return false;
      if (saved === 'dark') return true;
    } catch {
      // Ignore storage errors in sandboxed iframes
    }
    return true;
  });

  const [serviceType, setServiceType] = useState<string>(SERVICES[0].serviceValue);
  const [message, setMessage] = useState<string>('');
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(null);
  const [orderCopied, setOrderCopied] = useState(false);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('ahmed_theme', isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage errors
    }
  }, [isDark]);

  const scrollToContact = (focusTarget: 'name' | 'message') => {
    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      if (focusTarget === 'message') {
        messageInputRef.current?.focus();
      } else {
        nameInputRef.current?.focus();
      }
    }, 350);
  };

  const handleSelectService = (selectedService: string) => {
    setServiceType(selectedService);
    scrollToContact('name');
  };

  const handleRequestSupport = (issueTitle: string) => {
    setServiceType('دعم فني وحل مشاكل الويندوز أونلاين');
    setMessage(`أحتاج مساعدة أونلاين بخصوص: ${issueTitle}`);
    scrollToContact('message');
  };

  const handleCopyOrder = async () => {
    if (!submittedOrder) return;
    const formatted = `طلب خدمة إلى ${PROFILE.name}\nالاسم: ${submittedOrder.name}\nالتواصل: ${submittedOrder.contact}\nالخدمة: ${submittedOrder.service}\nالتفاصيل: ${submittedOrder.message}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setOrderCopied(true);
      setTimeout(() => setOrderCopied(false), 2500);
    } catch {
      setOrderCopied(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        <Hero isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />
        <AboutSection />
        <ServicesSection onSelectService={handleSelectService} />
        <SkillsSection />
        <TroubleshooterSection onRequestSupport={handleRequestSupport} />
        <ContactSection
          serviceType={serviceType}
          onServiceTypeChange={setServiceType}
          message={message}
          onMessageChange={setMessage}
          nameInputRef={nameInputRef}
          messageInputRef={messageInputRef}
          onSubmitOrder={(order) => {
            setOrderCopied(false);
            setSubmittedOrder(order);
          }}
        />
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-sm text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center sm:text-right">
            {PROFILE.name} · {PROFILE.location} ·{' '}
            <a
              href={`tel:${PROFILE.phone}`}
              dir="ltr"
              className="font-mono hover:text-sky-600 dark:hover:text-sky-400 transition-colors tabular-nums"
            >
              {PROFILE.phone}
            </a>
          </p>
          <p className="tabular-nums">
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>
        </div>
      </footer>

      <ConfirmModal
        order={submittedOrder}
        copied={orderCopied}
        onCopy={handleCopyOrder}
        onClose={() => setSubmittedOrder(null)}
      />
    </div>
  );
}
