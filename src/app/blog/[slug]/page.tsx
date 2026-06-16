"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog";
import ScrollReveal from "@/components/ScrollReveal";

const categoryColors: Record<string, string> = {
  "Web Tasarim": "bg-blue-500/10 text-blue-400",
  "E-Ticaret": "bg-emerald-500/10 text-emerald-400",
  SEO: "bg-amber-500/10 text-amber-400",
  AI: "bg-purple-500/10 text-purple-400",
  Pazarlama: "bg-pink-500/10 text-pink-400",
  Mobil: "bg-cyan-500/10 text-cyan-400",
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Yazi Bulunamadi</h1>
          <p className="text-gray-400 mb-8">Aradiginiz blog yazisi mevcut degil.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tum Yazilara Don
          </Link>
        </div>
      </main>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  const paragraphs = post.content.split("\n\n");

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Back Link */}
      <div className="pt-28 pb-4 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Tum Yazilar
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Article Header */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span
              className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${
                categoryColors[post.category] || "bg-gray-500/10 text-gray-400"
              }`}
            >
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.date}</span>
            <span className="text-gray-500 text-sm">{post.readTime}</span>
            <span className="text-gray-500 text-sm">{post.author}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-poppins)] mb-8"
          >
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {post.title}
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {paragraphs.map((paragraph, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-16 px-4">
        <ScrollReveal delay={0.2}>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-white/5 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-poppins)] mb-4">
              Bu konuda yardim mi lazim?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Uzman ekibimizle projenizi konusalim ve size ozel cozumler uretellim.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Bize Ulasin
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Related Posts */}
      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-poppins)] mb-8">
              Diger <span className="text-blue-400">Yazilar</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((related, i) => (
              <ScrollReveal key={related.id} delay={i * 0.1}>
                <Link href={`/blog/${related.slug}`} className="block group">
                  <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 h-full hover:border-blue-500/20 transition-all duration-300">
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold mb-3 ${
                        categoryColors[related.category] ||
                        "bg-gray-500/10 text-gray-400"
                      }`}
                    >
                      {related.category}
                    </span>
                    <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-2 group-hover:text-blue-400 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{related.date}</span>
                      <span>{related.readTime}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
