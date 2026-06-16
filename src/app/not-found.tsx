"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Shield className="w-20 h-20 text-blue-500 mx-auto mb-6" />
        <h1 className="text-6xl md:text-8xl font-bold font-[family-name:var(--font-poppins)] mb-4">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            404
          </span>
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Sayfa Bulunamadi</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Aradiginiz sayfa mevcut degil veya tasindi.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Home className="w-5 h-5" />
          Ana Sayfaya Don
        </Link>
      </motion.div>
    </div>
  );
}
