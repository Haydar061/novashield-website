"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  ShoppingCart,
  Smartphone,
  Palette,
  Search,
  Share2,
  Bot,
  MessageSquare,
  PenTool,
  MoreHorizontal,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calculator,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// ---------- TYPES ----------
interface ServiceOption {
  id: string;
  label: string;
  base: number;
  monthly?: boolean;
  icon: React.ReactNode;
}

interface ExtraOption {
  id: string;
  label: string;
  price: number;
  monthly?: boolean;
  type: "checkbox" | "radio";
  group?: string;
}

// ---------- DATA ----------
const services: ServiceOption[] = [
  { id: "web", label: "Web Sitesi", base: 5000, icon: <Globe className="w-6 h-6" /> },
  { id: "ecommerce", label: "E-Ticaret Sitesi", base: 10000, icon: <ShoppingCart className="w-6 h-6" /> },
  { id: "mobile", label: "Mobil Uygulama", base: 15000, icon: <Smartphone className="w-6 h-6" /> },
  { id: "uiux", label: "UI/UX Tasarim", base: 3000, icon: <Palette className="w-6 h-6" /> },
  { id: "seo", label: "SEO Calismasi", base: 3000, monthly: true, icon: <Search className="w-6 h-6" /> },
  { id: "social", label: "Sosyal Medya Yonetimi", base: 5000, monthly: true, icon: <Share2 className="w-6 h-6" /> },
  { id: "ai", label: "AI & Otomasyon", base: 10000, icon: <Sparkles className="w-6 h-6" /> },
  { id: "chatbot", label: "Chatbot", base: 5000, icon: <Bot className="w-6 h-6" /> },
  { id: "logo", label: "Logo & Marka", base: 2000, icon: <PenTool className="w-6 h-6" /> },
  { id: "other", label: "Diger", base: 5000, icon: <MoreHorizontal className="w-6 h-6" /> },
];

const serviceExtras: Record<string, ExtraOption[]> = {
  web: [
    { id: "pages_1_5", label: "1-5 Sayfa", price: 0, type: "radio", group: "pages" },
    { id: "pages_6_10", label: "6-10 Sayfa", price: 2000, type: "radio", group: "pages" },
    { id: "pages_11_20", label: "11-20 Sayfa", price: 4000, type: "radio", group: "pages" },
    { id: "pages_20_plus", label: "20+ Sayfa", price: 7000, type: "radio", group: "pages" },
    { id: "blog", label: "Blog Modulu", price: 2000, type: "checkbox" },
    { id: "multilang", label: "Coklu Dil Destegi", price: 3000, type: "checkbox" },
    { id: "animations", label: "Ozel Animasyonlar", price: 2500, type: "checkbox" },
    { id: "admin", label: "Admin Paneli", price: 3000, type: "checkbox" },
  ],
  ecommerce: [
    { id: "marketplace", label: "Pazaryeri Entegrasyonu (Trendyol/HB/N11)", price: 5000, type: "checkbox" },
    { id: "payment", label: "Odeme Sistemi Entegrasyonu", price: 2000, type: "checkbox" },
    { id: "stock", label: "Stok Yonetim Sistemi", price: 3000, type: "checkbox" },
    { id: "cargo", label: "Kargo Entegrasyonu", price: 2000, type: "checkbox" },
    { id: "multilang", label: "Coklu Dil Destegi", price: 3000, type: "checkbox" },
  ],
  mobile: [
    { id: "platform_single", label: "Tek Platform (iOS veya Android)", price: 0, type: "radio", group: "platform" },
    { id: "platform_both", label: "Her Iki Platform (iOS + Android)", price: 5000, type: "radio", group: "platform" },
    { id: "push", label: "Push Bildirim", price: 2000, type: "checkbox" },
    { id: "mobile_payment", label: "Odeme Entegrasyonu", price: 3000, type: "checkbox" },
    { id: "chat", label: "Chat Ozelligi", price: 3000, type: "checkbox" },
    { id: "admin", label: "Admin Paneli", price: 3000, type: "checkbox" },
  ],
};

const genericExtras: ExtraOption[] = [
  { id: "urgent", label: "Acil Teslimat (+%30 Ek Ucret)", price: 0, type: "checkbox" },
  { id: "priority_support", label: "Oncelikli Destek", price: 2000, type: "checkbox" },
  { id: "monthly_maintenance", label: "Aylik Bakim Paketi", price: 1500, monthly: true, type: "checkbox" },
];

// ---------- ANIMATED COUNTER ----------
function AnimatedPrice({ value, monthly }: { value: number; monthly?: boolean }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const diff = value - display;
    if (diff === 0) return;
    const steps = 20;
    const increment = diff / steps;
    let current = display;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        current = value;
        clearInterval(timer);
      }
      setDisplay(Math.round(current));
    }, 20);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent font-[family-name:var(--font-poppins)]">
      {display.toLocaleString("tr-TR")} TL
      {monthly && <span className="text-lg md:text-xl opacity-70"> /ay</span>}
    </span>
  );
}

// ---------- MAIN PAGE ----------
export default function FiyatHesaplaPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({});
  const [radioSelections, setRadioSelections] = useState<Record<string, string>>({});

  // ---- price calculation ----
  const calcTotal = () => {
    if (!selectedService) return 0;
    const svc = services.find((s) => s.id === selectedService);
    if (!svc) return 0;

    let total = svc.base;

    // extras
    const extras = serviceExtras[selectedService] || genericExtras;
    const isGeneric = !serviceExtras[selectedService];

    extras.forEach((ext) => {
      if (ext.type === "radio") {
        if (radioSelections[ext.group!] === ext.id) {
          total += ext.price;
        }
      } else if (selectedExtras[ext.id]) {
        if (ext.id === "urgent" && isGeneric) {
          // urgent = +30% calculated at the end
        } else {
          total += ext.price;
        }
      }
    });

    // urgent delivery for generic
    if (isGeneric && selectedExtras["urgent"]) {
      total = Math.round(total * 1.3);
    }

    return total;
  };

  const hasMonthly = () => {
    if (!selectedService) return false;
    const svc = services.find((s) => s.id === selectedService);
    if (svc?.monthly) return true;
    const extras = serviceExtras[selectedService] || genericExtras;
    return extras.some((e) => e.monthly && (selectedExtras[e.id] || radioSelections[e.group!] === e.id));
  };

  const handleServiceSelect = (id: string) => {
    setSelectedService(id);
    setSelectedExtras({});
    setRadioSelections({});
  };

  const handleCheckbox = (id: string) => {
    setSelectedExtras((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRadio = (group: string, id: string) => {
    setRadioSelections((prev) => ({ ...prev, [group]: id }));
  };

  const canProceed = () => {
    if (step === 1) return !!selectedService;
    return true;
  };

  const getExtras = () => {
    if (!selectedService) return genericExtras;
    return serviceExtras[selectedService] || genericExtras;
  };

  const getSelectedServiceLabel = () => services.find((s) => s.id === selectedService)?.label || "";

  const getSummaryItems = () => {
    const items: { label: string; price: string }[] = [];
    const svc = services.find((s) => s.id === selectedService);
    if (!svc) return items;

    items.push({
      label: svc.label + (svc.monthly ? " (Aylik)" : ""),
      price: svc.base.toLocaleString("tr-TR") + " TL" + (svc.monthly ? "/ay" : ""),
    });

    const extras = getExtras();
    const isGeneric = !serviceExtras[selectedService!];

    extras.forEach((ext) => {
      const selected =
        ext.type === "radio"
          ? radioSelections[ext.group!] === ext.id
          : selectedExtras[ext.id];
      if (selected && (ext.price > 0 || ext.id === "urgent")) {
        if (ext.id === "urgent") {
          items.push({ label: ext.label, price: "+%30" });
        } else {
          items.push({
            label: ext.label,
            price: "+" + ext.price.toLocaleString("tr-TR") + " TL" + (ext.monthly ? "/ay" : ""),
          });
        }
      }
    });

    if (isGeneric && selectedExtras["urgent"]) {
      // already shown
    }

    return items;
  };

  // ---- steps ----
  const steps = [
    { num: 1, label: "Hizmet Turu" },
    { num: 2, label: "Detaylar" },
    { num: 3, label: "Ozet" },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Calculator className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">Aninda Fiyat Hesapla</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
              Projenizin{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Tahmini Maliyetini
              </span>{" "}
              Hesaplayin
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Secenekleri belirleyin, aninda tahmini fiyat gorun. Kesin teklif icin bizimle iletisime gecin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 mb-10">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center flex-1">
              <motion.button
                onClick={() => {
                  if (s.num < step || (s.num === 2 && selectedService) || s.num === 1) {
                    setStep(s.num);
                  }
                }}
                className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                  step >= s.num ? "text-blue-400" : "text-gray-600"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                    step > s.num
                      ? "bg-blue-500 border-blue-500 text-white"
                      : step === s.num
                      ? "border-blue-500 text-blue-400"
                      : "border-gray-700 text-gray-600"
                  }`}
                >
                  {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                </div>
                <span className="hidden sm:inline text-sm font-medium">{s.label}</span>
              </motion.button>
              {i < steps.length - 1 && (
                <div className="flex-1 mx-4 h-[2px] rounded-full overflow-hidden bg-gray-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: "0%" }}
                    animate={{ width: step > s.num ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Live Price Display */}
      <div className="max-w-4xl mx-auto px-4 mb-10">
        <motion.div
          className="bg-[#111827] border border-white/5 rounded-2xl p-6 text-center"
          layout
        >
          <p className="text-gray-400 text-sm mb-2">Tahmini Fiyat</p>
          <AnimatedPrice value={calcTotal()} monthly={hasMonthly()} />
        </motion.div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-poppins)]">
                Hangi Hizmeti Ariyorsunuz?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((svc) => (
                  <motion.button
                    key={svc.id}
                    onClick={() => handleServiceSelect(svc.id)}
                    className={`relative p-6 rounded-xl border-2 text-left transition-all duration-300 cursor-pointer group ${
                      selectedService === svc.id
                        ? "border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                        : "border-white/5 bg-[#111827] hover:border-white/20"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`mb-3 transition-colors duration-300 ${
                        selectedService === svc.id ? "text-blue-400" : "text-gray-400 group-hover:text-white"
                      }`}
                    >
                      {svc.icon}
                    </div>
                    <h3 className="font-semibold mb-1 font-[family-name:var(--font-poppins)]">{svc.label}</h3>
                    <p className="text-sm text-gray-400">
                      {svc.base.toLocaleString("tr-TR")} TL{svc.monthly ? "/ay" : "'den baslayan"}
                    </p>
                    {selectedService === svc.id && (
                      <motion.div
                        className="absolute top-3 right-3 text-blue-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-2 font-[family-name:var(--font-poppins)]">
                {getSelectedServiceLabel()} Detaylari
              </h2>
              <p className="text-gray-400 mb-6">Projenize uygun secenekleri belirleyin.</p>

              <div className="space-y-4">
                {(() => {
                  const extras = getExtras();
                  const groups: Record<string, ExtraOption[]> = {};
                  const standalone: ExtraOption[] = [];

                  extras.forEach((ext) => {
                    if (ext.type === "radio" && ext.group) {
                      if (!groups[ext.group]) groups[ext.group] = [];
                      groups[ext.group].push(ext);
                    } else {
                      standalone.push(ext);
                    }
                  });

                  return (
                    <>
                      {Object.entries(groups).map(([group, options]) => (
                        <div key={group} className="bg-[#111827] border border-white/5 rounded-xl p-5">
                          <p className="text-sm text-gray-400 mb-3 font-medium uppercase tracking-wider">
                            {group === "pages" ? "Sayfa Sayisi" : group === "platform" ? "Platform Secimi" : group}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {options.map((opt) => (
                              <motion.button
                                key={opt.id}
                                onClick={() => handleRadio(group, opt.id)}
                                className={`p-4 rounded-lg border-2 text-left transition-all duration-300 cursor-pointer ${
                                  radioSelections[group] === opt.id
                                    ? "border-blue-500 bg-blue-500/10"
                                    : "border-white/5 hover:border-white/20"
                                }`}
                                whileTap={{ scale: 0.97 }}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">{opt.label}</span>
                                  <span className="text-xs text-gray-400">
                                    {opt.price === 0 ? "Dahil" : "+" + opt.price.toLocaleString("tr-TR") + " TL"}
                                  </span>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="bg-[#111827] border border-white/5 rounded-xl p-5">
                        <p className="text-sm text-gray-400 mb-3 font-medium uppercase tracking-wider">
                          Ek Ozellikler
                        </p>
                        <div className="space-y-3">
                          {standalone.map((opt) => (
                            <motion.button
                              key={opt.id}
                              onClick={() => handleCheckbox(opt.id)}
                              className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                                selectedExtras[opt.id]
                                  ? "border-blue-500 bg-blue-500/10"
                                  : "border-white/5 hover:border-white/20"
                              }`}
                              whileTap={{ scale: 0.97 }}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                                    selectedExtras[opt.id]
                                      ? "bg-blue-500 border-blue-500"
                                      : "border-gray-600"
                                  }`}
                                >
                                  {selectedExtras[opt.id] && <CheckCircle2 className="w-3 h-3 text-white" />}
                                </div>
                                <span className="text-sm font-medium">{opt.label}</span>
                              </div>
                              <span className="text-xs text-gray-400">
                                {opt.id === "urgent"
                                  ? "+%30"
                                  : "+" + opt.price.toLocaleString("tr-TR") + " TL" + (opt.monthly ? "/ay" : "")}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-poppins)]">
                Fiyat Ozeti
              </h2>

              <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden">
                {/* Summary Items */}
                <div className="p-6 space-y-4">
                  {getSummaryItems().map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                    >
                      <span className="text-gray-300">{item.label}</span>
                      <span className="text-white font-semibold">{item.price}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Total */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-t border-white/5 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold font-[family-name:var(--font-poppins)]">
                      Toplam Tahmini Fiyat
                    </span>
                    <AnimatedPrice value={calcTotal()} monthly={hasMonthly()} />
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="px-6 py-4 bg-yellow-500/5 border-t border-yellow-500/10">
                  <p className="text-sm text-yellow-400/80 text-center">
                    Bu fiyat tahminidir, kesin teklif icin iletisime gecin.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href={`/iletisim?hizmet=${encodeURIComponent(getSelectedServiceLabel())}`}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)]"
                >
                  Teklif Al
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-10">
          {step > 1 ? (
            <motion.button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
              whileHover={{ x: -4 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Geri
            </motion.button>
          ) : (
            <div />
          )}

          {step < 3 && (
            <motion.button
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                canProceed()
                  ? "bg-blue-500 hover:bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  : "bg-gray-800 text-gray-600 cursor-not-allowed"
              }`}
              whileHover={canProceed() ? { scale: 1.03 } : {}}
              whileTap={canProceed() ? { scale: 0.97 } : {}}
            >
              Devam Et
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </main>
  );
}
