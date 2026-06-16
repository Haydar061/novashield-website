"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts, blogCategories } from "@/data/blog";
import ScrollReveal from "@/components/ScrollReveal";

const categoryColors: Record<string, string> = {
  "Web Tasarim": "bg-blue-500/10 text-blue-400",
  "E-Ticaret": "bg-emerald-500/10 text-emerald-400",
  SEO: "bg-amber-500/10 text-amber-400",
  AI: "bg-purple-500/10 text-purple-400",
  Pazarlama: "bg-pink-500/10 text-pink-400",
  Mobil: "bg-cyan-500/10 text-cyan-400",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Tumu");

  const filteredPosts =
    activeCategory === "Tumu"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

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
              Blog
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto"
          >
            Dijital dunyanin en guncel bilgileri
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3">
              {blogCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-[#111827] text-gray-400 border border-white/5 hover:border-blue-500/30 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 sm:p-8 h-full hover:border-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
                    {/* Category Badge */}
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold mb-4 ${
                        categoryColors[post.category] ||
                        "bg-gray-500/10 text-gray-400"
                      }`}
                    >
                      {post.category}
                    </span>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-poppins)] mb-3 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm sm:text-base mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <span className="text-blue-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                        Devamini Oku &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                Bu kategoride henuz yazi bulunmuyor.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
