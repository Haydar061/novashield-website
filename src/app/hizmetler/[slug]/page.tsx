"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe, ShoppingCart, Smartphone, Palette, Search, Megaphone,
  Share2, Bot, MessageCircle, Brush, PenTool, Database,
  Code, BarChart3, FileSearch, Shield, Wrench, Cloud,
  CheckCircle, ArrowLeft, Star,
} from "lucide-react";
import { services } from "@/data/services";
import { reviews } from "@/data/reviews";
import ScrollReveal from "@/components/ScrollReveal";

const iconMap: Record<string, React.ElementType> = {
  Globe, ShoppingCart, Smartphone, Palette, Search, Megaphone,
  Share2, Bot, MessageCircle, Brush, PenTool, Database,
  Code, BarChart3, FileSearch, Shield, Wrench, Cloud,
};

const stepColors = [
  "from-blue-500 to-blue-600",
  "from-purple-500 to-purple-600",
  "from-emerald-500 to-emerald-600",
  "from-amber-500 to-amber-600",
];

export default function HizmetDetayPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Hizmet Bulunamadi</h1>
          <p className="text-gray-400 mb-8">Aradiginiz hizmet mevcut degil.</p>
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tum Hizmetlere Don
          </Link>
        </div>
      </main>
    );
  }

  const Icon = iconMap[service.icon] || Globe;

  // Match reviews by checking if the review service name appears in the service title or vice versa
  const relatedReviews = reviews.filter((r) => {
    const rService = r.service.toLowerCase();
    const sTitle = service.title.toLowerCase();
    const sSlug = service.slug.toLowerCase();
    return (
      sTitle.includes(rService) ||
      rService.includes(sSlug.replace(/-/g, " ")) ||
      sSlug.includes(rService.replace(/\s/g, "-"))
    );
  });

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Back Link */}
      <div className="pt-28 pb-4 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/hizmetler"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Tum Hizmetler
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Hero */}
      <section className="pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center">
              <Icon className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-poppins)]">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  {service.title}
                </span>
              </h1>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-gray-400 text-lg sm:text-xl max-w-2xl"
          >
            {service.shortDesc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-4"
          >
            <span className="inline-block bg-emerald-500/10 text-emerald-400 font-semibold px-4 py-2 rounded-lg text-sm">
              {service.price}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-poppins)] mb-8">
              Neler <span className="text-blue-400">Dahil?</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.features.map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 bg-[#111827] border border-white/5 rounded-xl p-4 hover:border-blue-500/20 transition-colors">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-poppins)] mb-8">
              Calisma <span className="text-purple-400">Surecimiz</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="relative bg-[#111827] border border-white/5 rounded-xl p-6 h-full hover:border-purple-500/20 transition-colors">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stepColors[i]} flex items-center justify-center text-white font-bold text-lg mb-4`}
                  >
                    {step.step}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related Reviews */}
      {relatedReviews.length > 0 && (
        <section className="pb-16 px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-poppins)] mb-8">
                Musteri <span className="text-emerald-400">Yorumlari</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedReviews.map((review, i) => (
                <ScrollReveal key={review.id} delay={i * 0.1}>
                  <div className="bg-[#111827] border border-white/5 rounded-xl p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm mb-4 italic">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {review.name}
                      </p>
                      <p className="text-gray-500 text-xs">{review.title}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-24 px-4">
        <ScrollReveal delay={0.2}>
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-white/5 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-poppins)] mb-4">
              Bu hizmeti almak ister misiniz?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Ucretsiz teklif alin, projenizi birlikte konusalim.
            </p>
            <Link
              href={`/iletisim?hizmet=${encodeURIComponent(service.title)}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Bu Hizmeti Al
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
