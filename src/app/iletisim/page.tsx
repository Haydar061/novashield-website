"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  CheckCircle, Clock, Shield, Headphones, FileText,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { services } from "@/data/services";

interface ServiceRequestForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  contactPreference: string;
}

const budgetRanges = [
  "5.000 TL altinda",
  "5.000 - 10.000 TL",
  "10.000 - 25.000 TL",
  "25.000 - 50.000 TL",
  "50.000 - 100.000 TL",
  "100.000+ TL",
  "Butce belirlemedim, teklif istiyorum",
];

const timelines = [
  "Acil (1 hafta icinde)",
  "1-2 hafta",
  "2-4 hafta",
  "1-2 ay",
  "2-3 ay",
  "Esnek / Belirli bir sure yok",
];

const contactPreferences = [
  "Telefon ile arayin",
  "Email ile donun",
  "Telegram ile yazin",
];

export default function IletisimPage() {
  return (
    <Suspense>
      <IletisimContent />
    </Suspense>
  );
}

function IletisimContent() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ServiceRequestForm>();

  useEffect(() => {
    const hizmet = searchParams.get("hizmet");
    if (hizmet) {
      setValue("service", hizmet);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: ServiceRequestForm) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      }
    } catch {
      alert("Bir hata olustu. Lutfen tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors";

  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] mb-4">
            Hizmet <span className="text-blue-500">Talep Formu</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Projeniz hakkinda bilgi verin, size en uygun cozumu ve fiyat teklifini gonderelim.
          </p>
        </motion.div>

        {/* Advantages */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Clock, title: "24 Saat Icinde Donus", desc: "Talebinize en gec 24 saat icinde donuyoruz" },
            { icon: Shield, title: "Ucretsiz Danismanlik", desc: "Ilk gorusme ve ihtiyac analizi tamamen ucretsiz" },
            { icon: Headphones, title: "Kisisel Iletisim", desc: "Size ozel iletisim, standart cevap yok" },
          ].map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <div className="bg-[#111827] border border-white/5 rounded-xl p-5 text-center">
                <item.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Form */}
        <ScrollReveal>
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 sm:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-3">Talebiniz Basariyla Alindi!</h2>
                <p className="text-gray-400 max-w-md mx-auto mb-2">
                  En kisa surede sizinle iletisime gececegiz.
                </p>
                <p className="text-gray-500 text-sm mb-8">
                  Tercih ettiginiz iletisim yontemi uzerinden size ulasacagiz.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Yeni talep olustur
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Section: Kisisel Bilgiler */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    Iletisim Bilgileriniz
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">
                        Ad Soyad <span className="text-red-400">*</span>
                      </label>
                      <input
                        {...register("name", { required: "Ad soyad zorunludur" })}
                        className={inputClass}
                        placeholder="Adiniz Soyadiniz"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email zorunludur",
                          pattern: { value: /^\S+@\S+$/i, message: "Gecerli email girin" },
                        })}
                        className={inputClass}
                        placeholder="ornek@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">
                        Telefon <span className="text-red-400">*</span>
                      </label>
                      <input
                        {...register("phone", { required: "Telefon zorunludur" })}
                        className={inputClass}
                        placeholder="+90 5xx xxx xx xx"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">
                        Firma / Isletme Adi
                      </label>
                      <input
                        {...register("company")}
                        className={inputClass}
                        placeholder="Firma adiniz (varsa)"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">
                      Mevcut Web Siteniz
                    </label>
                    <input
                      {...register("website")}
                      className={inputClass}
                      placeholder="https://www.siteniz.com (varsa)"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/5" />

                {/* Section: Proje Bilgileri */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    Proje Detaylari
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">
                        Ilgilendiginiz Hizmet <span className="text-red-400">*</span>
                      </label>
                      <select
                        {...register("service", { required: "Hizmet secimi zorunludur" })}
                        className={inputClass}
                      >
                        <option value="">Hizmet secin...</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">
                        Butce Araliginiz
                      </label>
                      <select {...register("budget")} className={inputClass}>
                        <option value="">Butce secin...</option>
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">
                        Teslim Suresi Beklentiniz
                      </label>
                      <select {...register("timeline")} className={inputClass}>
                        <option value="">Sure secin...</option>
                        {timelines.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-1">
                        Size Nasil Ulasalim? <span className="text-red-400">*</span>
                      </label>
                      <select
                        {...register("contactPreference", { required: "Iletisim tercihi zorunludur" })}
                        className={inputClass}
                      >
                        <option value="">Tercih secin...</option>
                        {contactPreferences.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.contactPreference && (
                        <p className="text-red-400 text-xs mt-1">{errors.contactPreference.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-gray-300 text-sm font-medium mb-1">
                      Proje Hakkinda Detayli Bilgi <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Proje detayi zorunludur",
                        minLength: { value: 20, message: "En az 20 karakter yazin" },
                      })}
                      className={`${inputClass} h-36 resize-none`}
                      placeholder="Projenizi anlatın: Ne yapmak istiyorsunuz? Mevcut bir sisteminiz var mi? Ozel istekleriniz neler?..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold text-lg transition-all"
                  >
                    {submitting ? "Gonderiliyor..." : "Ucretsiz Teklif Talep Et"}
                  </button>
                  <p className="text-gray-500 text-xs text-center mt-3">
                    Bilgileriniz gizli tutulur ve sadece size donus yapmak icin kullanilir.
                  </p>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
