"use client";

import Link from "next/link";
import { Shield, Mail, Send, FileText } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/fiyat-hesapla", label: "Fiyat Hesapla" },
  { href: "/blog", label: "Blog" },
  { href: "/yorumlar", label: "Yorumlar" },
  { href: "/sss", label: "SSS" },
  { href: "/iletisim", label: "Iletisim" },
];

const platforms = [
  { label: "Bionluk", href: "https://bionluk.com/novashieldai" },
  { label: "Fiverr", href: "https://www.fiverr.com/s/38DoGWB" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~015974a578167a5a76" },
  { label: "Apify", href: "https://apify.com/novashieldai" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-blue-500" />
              <span className="text-lg font-bold text-white">NovaShield</span>
            </div>
            <p className="text-gray-400 text-sm">
              Dijital Dunyada Kalkaniniz. Web gelistirme, AI cozumleri, dijital
              pazarlama ve daha fazlasi.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Hizli Linkler</h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Iletisim</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:novashield.dev@gmail.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-400 text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" /> novashield.dev@gmail.com
                </a>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                >
                  <FileText className="w-4 h-4" /> Hizmet Talep Formu
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Platformlar</h3>
            <ul className="space-y-2">
              {platforms.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2024 NovaShield. Tum haklari saklidir.
          </p>
        </div>
      </div>
    </footer>
  );
}
