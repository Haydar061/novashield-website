"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: "Proje teslim suresi ne kadar?",
    a: "Projenin buyuklugune gore degisir. Basit bir web sitesi 1-2 haftada, e-ticaret sitesi 2-4 haftada, mobil uygulama 4-8 haftada teslim edilir. Acil projeler icin hizlandirilmis surec de sunuyoruz. Kesin sure, proje detaylari netlestikten sonra belirlenir.",
  },
  {
    q: "Odeme nasil yapiliyor?",
    a: "Genelde %50 on odeme, %50 teslimde odeme seklinde calisiyoruz. Buyuk projelerde 3 taksit de mumkun. Bionluk, Fiverr gibi platformlar uzerinden guvenli odeme de yapilabilir. Bu platformlarda paraniz teslim onayi verene kadar guvende kalir.",
  },
  {
    q: "Revizyon hakkim var mi?",
    a: "Evet, her projede en az 3 revizyon hakki bulunur. Buyuk projelerde bu sayi artabilir. Amacimiz siz memnun kalana kadar calismak. Proje kapsamini asan buyuk degisiklikler ek ucrete tabi olabilir, ama bunu onceden net sekilde konusuyoruz.",
  },
  {
    q: "Projeden memnun kalmazsam ne olur?",
    a: "Oncelikle memnuniyetsizligin nedenini anlamaya calisiyoruz. Revizyon haklariniz dahilinde degisiklikleri yapiyoruz. Platform uzerinden yapilan odemelerde platformun iade politikasi gecerlidir. Amacimiz her zaman memnun musteri birakmak.",
  },
  {
    q: "Teslimden sonra destek var mi?",
    a: "Evet, teslimden sonra 30 gun ucretsiz teknik destek sagliyoruz. Bu sure icinde cikan hatalari ve kucuk duzeltmeleri ucretsiz yapiyoruz. Daha uzun sureli destek icin aylik bakim paketlerimiz mevcut (aylik 2.000 TL'den baslayan fiyatlarla).",
  },
  {
    q: "Hangi teknolojileri kullaniyorsunuz?",
    a: "Projenin ihtiyacina gore en uygun teknolojiyi seciyoruz. Web icin React, Next.js, Vue.js; mobil icin React Native, Flutter; backend icin Node.js, Python; veritabani icin PostgreSQL, MongoDB kullaniyoruz. WordPress ve Shopify ile de calisiyoruz.",
  },
  {
    q: "SEO sonuclari ne zaman gorunur?",
    a: "SEO uzun vadeli bir yatirimdir. Ilk sonuclar genelde 2-3 ayda gorulmeye baslar, ciddi sonuclar 4-6 ayda gelir. Google'in algoritmasina bagli olarak bu sure degisebilir. Aylik raporlarla ilerlemeyi takip edebilirsiniz.",
  },
  {
    q: "Uzaktan calisabiliyor musunuz?",
    a: "Evet, tum musterilerimizle uzaktan calisiyoruz. Turkiye'nin her yerinden ve yurt disindan musteri kabul ediyoruz. Zoom, Google Meet veya Telegram uzerinden gorusme yapiyoruz. Zaman farki olan ulkelerdeki musterilerle de sorunsuz calisiyoruz.",
  },
  {
    q: "Fiyatlar neden degisiyor?",
    a: "Her proje farkli ihtiyaclara sahip. Bir 5 sayfalik tanitim sitesi ile 500 urunlu e-ticaret sitesinin maliyeti ayni olmaz. Fiyati etkileyen faktorler: sayfa sayisi, ozel ozellikler, entegrasyonlar, tasarim karmasikligi ve teslim suresi. Fiyat hesaplayicimizdan tahmini fiyat alabilirsiniz.",
  },
  {
    q: "Kaynak kodlari bana mi ait oluyor?",
    a: "Evet, proje tamamlanip odeme yapildiktan sonra tum kaynak kodlar ve dosyalar size teslim edilir. Tamamen sizin mulkunuz olur. Hosting ve domain bilgileri de sizin adiniza kayitlidir.",
  },
];

function FaqItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="border border-white/5 rounded-xl overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-5 text-left bg-[#111827] hover:bg-[#111827]/80 transition-colors"
        >
          <span className="text-white font-medium pr-4">{faq.q}</span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-5 pt-0 bg-[#111827]">
            <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
          </div>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

export default function SSSPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <HelpCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] mb-4">
            Sikca Sorulan <span className="text-blue-500">Sorular</span>
          </h1>
          <p className="text-gray-400">
            Merak ettiginiz her seyin cevabi burada
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-12 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/5 rounded-xl p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Baska sorunuz mu var?</h3>
            <p className="text-gray-400 text-sm mb-6">
              Cevabini bulamadiginiz sorular icin bize yazin
            </p>
            <Link
              href="/iletisim"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Iletisime Gecin
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
