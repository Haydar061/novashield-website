"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import ScrollReveal from "@/components/ScrollReveal";

export default function HizmetlerPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-[family-name:var(--font-poppins)] mb-6"
          >
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Hizmetlerimiz
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto"
          >
            Dijital dunyanin tum ihtiyaclarini tek catida karsiliyoruz.
            18 farkli hizmet kategorisinde profesyonel cozumler sunuyoruz.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 px-4">
        <ScrollReveal delay={0.2}>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-white/5 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-poppins)] mb-4">
              Hangi hizmeti secerseniz secin,{" "}
              <span className="text-blue-400">sonuc garantili</span> calisiyoruz.
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Projenizi konusmak ve ucretsiz teklif almak icin hemen iletisime gecin.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Ucretsiz Teklif Al
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
