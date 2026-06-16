"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface Project {
  title: string;
  category: string;
  beforeDesc: string;
  afterDesc: string;
  stats: { label: string; before: string; after: string }[];
}

const projects: Project[] = [
  {
    title: "Restoran Web Sitesi",
    category: "Web Tasarim",
    beforeDesc: "Eski, mobil uyumsuz, yavas yuklenen WordPress sitesi. Online siparis yok.",
    afterDesc: "Modern, hizli, mobil uyumlu site. Online siparis sistemi entegre.",
    stats: [
      { label: "Sayfa Hizi", before: "8.2sn", after: "1.4sn" },
      { label: "Aylik Ziyaretci", before: "320", after: "2.800" },
      { label: "Online Siparis", before: "0", after: "200+/ay" },
    ],
  },
  {
    title: "Giyim E-Ticaret",
    category: "E-Ticaret",
    beforeDesc: "Sadece Instagram uzerinden satis. Stok takibi excel ile.",
    afterDesc: "Profesyonel e-ticaret sitesi. Trendyol + HB entegrasyonu. Otomatik stok.",
    stats: [
      { label: "Aylik Satis", before: "45", after: "180+" },
      { label: "Ciro", before: "12K TL", after: "58K TL" },
      { label: "Iade Orani", before: "%18", after: "%6" },
    ],
  },
  {
    title: "Dis Klinigi SEO",
    category: "SEO",
    beforeDesc: "Google'da 5+ sayfada. Organik trafik neredeyse sifir.",
    afterDesc: "Hedef kelimelerde ilk sayfa. Blog icerikleri ile otorite.",
    stats: [
      { label: "Google Sirasi", before: "50+", after: "Top 5" },
      { label: "Organik Trafik", before: "15/gun", after: "120/gun" },
      { label: "Randevu", before: "3/hafta", after: "15/hafta" },
    ],
  },
];

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const p = projects[active];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-4">
              Oncesi & <span className="text-blue-500">Sonrasi</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Musterilerimizin projelerinde elde ettigi gercek sonuclar
            </p>
          </div>
        </ScrollReveal>

        {/* Project Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {projects.map((proj, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                active === i
                  ? "bg-blue-600 text-white"
                  : "bg-[#111827] text-gray-400 border border-white/5 hover:border-blue-500/30"
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>

        {/* Before / After Cards */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Before */}
            <div className="bg-[#111827] border border-red-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Oncesi</span>
              </div>
              <p className="text-gray-400 text-sm">{p.beforeDesc}</p>
            </div>

            {/* After */}
            <div className="bg-[#111827] border border-emerald-500/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">Sonrasi</span>
              </div>
              <p className="text-gray-300 text-sm">{p.afterDesc}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {p.stats.map((stat, i) => (
              <div key={i} className="bg-[#111827] border border-white/5 rounded-xl p-5 text-center">
                <p className="text-gray-500 text-xs mb-3">{stat.label}</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-red-400 line-through text-lg">{stat.before}</span>
                  <span className="text-gray-600">&rarr;</span>
                  <span className="text-emerald-400 font-bold text-xl">{stat.after}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
