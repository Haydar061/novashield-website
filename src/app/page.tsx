"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe, ShoppingCart, Smartphone, BarChart3, Bot, Shield,
  Zap, DollarSign, Headphones, Target, ArrowRight,
} from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import Counter from "@/components/Counter";
import ReviewSlider from "@/components/ReviewSlider";
import ScrollReveal from "@/components/ScrollReveal";
import BeforeAfter from "@/components/BeforeAfter";

const featuredServices = [
  { icon: Globe, title: "Web Gelistirme", slug: "web-tasarim", desc: "Modern, hizli ve SEO dostu web siteleri" },
  { icon: Bot, title: "AI & Otomasyon", slug: "ai-otomasyon", desc: "Akilli otomasyon ve yapay zeka cozumleri" },
  { icon: ShoppingCart, title: "E-Ticaret Cozumleri", slug: "e-ticaret", desc: "Online satis platformlari ve entegrasyonlar" },
  { icon: BarChart3, title: "Dijital Pazarlama", slug: "reklam-yonetimi", desc: "Google Ads, sosyal medya ve SEO" },
  { icon: Smartphone, title: "Mobil Uygulama", slug: "mobil-uygulama", desc: "iOS ve Android uygulamalar" },
  { icon: Shield, title: "Siber Guvenlik", slug: "siber-guvenlik", desc: "Guvenlik danismanligi ve koruma" },
];

const whyUs = [
  { icon: Zap, title: "Hizli Teslimat", desc: "Projelerinizi zamaninda, bazen daha erken teslim ediyoruz" },
  { icon: DollarSign, title: "Uygun Fiyat", desc: "Kurumsal kalitede, freelancer fiyatinda" },
  { icon: Headphones, title: "7/24 Destek", desc: "Her zaman ulasabilirsiniz" },
  { icon: Target, title: "Sonuc Odakli", desc: "Sadece tasarim degil, donusum sagliyoruz" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-[family-name:var(--font-poppins)] mb-6"
          >
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Dijital Dunyada
            </span>
            <br />
            Kalkaniniz
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl mb-8"
          >
            Web Gelistirme | AI Cozumleri | Dijital Pazarlama | Otomasyon
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/hizmetler"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Hizmetlerimiz
            </Link>
            <Link
              href="/iletisim"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Ucretsiz Teklif Al
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </section>

      {/* Counter Stats */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <Counter end={500} suffix="+" label="Tamamlanan Proje" />
          <Counter end={300} suffix="+" label="Mutlu Musteri" />
          <Counter end={18} suffix="+" label="Hizmet Alani" />
          <Counter end={7} suffix="/24" label="Teknik Destek" />
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-4">
                One Cikan <span className="text-blue-500">Hizmetlerimiz</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Isletmenizi dijital dunyada buyutmek icin ihtiyaciniz olan tum cozumler
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((s, i) => (
              <ScrollReveal key={s.slug} delay={i * 0.1}>
                <Link href={`/hizmetler/${s.slug}`}>
                  <div className="group bg-[#111827] border border-white/5 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                      <s.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{s.desc}</p>
                    <span className="text-blue-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Detayli Bilgi <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why NovaShield */}
      <section className="py-20 px-4 bg-[#111827]/50">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-4">
                Neden <span className="text-purple-500">NovaShield</span>?
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyUs.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="flex gap-4 p-6 bg-[#0a0a0a] border border-white/5 rounded-xl">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <BeforeAfter />

      {/* Reviews Slider */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-4">
                Musteri <span className="text-blue-500">Yorumlari</span>
              </h2>
            </div>
          </ScrollReveal>
          <ReviewSlider />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-4">
              Projenizi Hayata Gecirelim
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Fikirlerinizi gercege donusturmek icin hemen iletisime gecin.
              Ucretsiz danismanlik ile baslayalim.
            </p>
            <Link
              href="/iletisim"
              className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Ucretsiz Teklif Al
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
