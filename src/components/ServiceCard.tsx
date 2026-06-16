"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe, ShoppingCart, Smartphone, Palette, Search, Megaphone,
  Share2, Bot, MessageCircle, Brush, PenTool, Database,
  Code, BarChart3, FileSearch, Shield, Wrench, Cloud,
} from "lucide-react";
import type { Service } from "@/data/services";

const iconMap: Record<string, React.ElementType> = {
  Globe, ShoppingCart, Smartphone, Palette, Search, Megaphone,
  Share2, Bot, MessageCircle, Brush, PenTool, Database,
  Code, BarChart3, FileSearch, Shield, Wrench, Cloud,
};

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon] || Globe;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/hizmetler/${service.slug}`}>
        <div className="group bg-[#111827] border border-white/5 rounded-xl p-6 h-full hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{service.shortDesc}</p>
          <div className="flex items-center justify-between">
            <span className="text-emerald-400 text-xs font-medium">
              {service.price}
            </span>
            <span className="text-blue-400 text-sm group-hover:translate-x-1 transition-transform">
              Detayli Bilgi &rarr;
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
