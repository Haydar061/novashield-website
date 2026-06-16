"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import Counter from "@/components/Counter";
import {
  Lightbulb,
  ShieldCheck,
  Users,
  Award,
  Target,
  Eye,
} from "lucide-react";

const values = [
  {
    icon: <Lightbulb className="w-8 h-8 text-blue-500" />,
    title: "Yenilikcilik",
    description:
      "Teknolojiyi yakindan takip eder, en guncel cozumleri projelerimize entegre ederiz. Surekli ogrenme ve gelisim felsefemizin temelini olusturur.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-500" />,
    title: "Guvenilirlik",
    description:
      "Sozumuzun arkasinda dururuz. Teslim tarihleri, kalite standartlari ve iletisimde seffaflik bizim icin vazgecilmezdir.",
  },
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    title: "Musteri Odaklilik",
    description:
      "Her projeye musterimizin gozunden bakariz. Ihtiyaclarinizi anlamak ve beklentilerinizi asmak en buyuk oncelimizdir.",
  },
  {
    icon: <Award className="w-8 h-8 text-purple-500" />,
    title: "Kalite",
    description:
      "Her satirda, her pikselde ve her etkilesimde kusursuzlugu hedefleriz. Kaliteden asla odun vermeyiz.",
  },
];

const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "TypeScript",
  "TailwindCSS",
  "Flutter",
  "Docker",
  "AWS",
  "PostgreSQL",
  "MongoDB",
  "Figma",
];

const stats = [
  { value: 500, suffix: "+", label: "Proje" },
  { value: 300, suffix: "+", label: "Musteri" },
  { value: 18, suffix: "+", label: "Hizmet" },
  { value: 5, suffix: "+", label: "Yil Deneyim" },
];

export default function HakkimizdaPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[60vh] bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-poppins)] bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          >
            Hakkimizda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Dijital dunyada isletmelerin buyumesine yardimci olan tutkulu bir
            ekibiz. Teknolojiyi sanatla birlestirerek markalara hayat veriyoruz.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-[#111827]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-center mb-12">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                NovaShield Hikayesi
              </span>
            </h2>
          </ScrollReveal>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <ScrollReveal>
              <p>
                NovaShield, dijital dunyanin hizla donustugu bir donemde, Turkiye&apos;nin
                kalbinde dogdu. Kurucularimiz, yerel isletmelerin dijital
                donusum surecinde yasadigi zorluklari bizzat deneyimledikten
                sonra bir karar aldi: teknolojinin gucunu her olcekteki
                isletmeye ulastirmak.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <p>
                Kucuk bir ofiste, buyuk hayallerle yola ciktik. Ilk projemiz
                yerel bir esnafinweb sitesiydi. O projede gorduk ki, dogru
                dijital stratejiyle kucuk bir isletme bile buyuk markalara
                rakip olabilir. Bu bizi atesleyen kivilcim oldu.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <p>
                Bugün NovaShield olarak web gelistirme, mobil uygulama, UI/UX
                tasarim, dijital pazarlama ve siber guvenlik alanlarinda yuzlerce
                projeye imza attik. Her projemizde ayni felsefeyi tasiyoruz:
                musterilerimizin basarisi bizim basarimizdir. Teknolojiyi sadece
                bir arac olarak degil, isletmelerin hikayesini anlatmanin en
                guclu yolu olarak goruyoruz.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <p>
                Ekibimiz; yazilim muhendisleri, tasarimcilar, dijital
                pazarlamacilar ve proje yoneticilerinden olusan cok disiplinli
                bir yapiyla calisiyor. Her birimiz kendi alaninda uzman, ama
                hepimiz ayni hedefe odakli: sizin dijital dunyadaki yerinizi
                saglamlastirmak.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-center mb-16">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Misyon & Vizyon
              </span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 h-full hover:border-blue-500/50 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-blue-500/10">
                    <Target className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)]">
                    Misyonumuz
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Isletmelerin dijital donusum yolculugunda guvenilir bir partner
                  olmak. En son teknolojileri kullanarak, olceklenebilir,
                  performansli ve kullanici dostu cozumler uretmek. Her
                  projemizde musterilerimizin hedeflerini kendi hedeflerimiz
                  gibi benimseyerek, olculebilir basarilar elde etmek.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 h-full hover:border-purple-500/50 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-purple-500/10">
                    <Eye className="w-8 h-8 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)]">
                    Vizyonumuz
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Turkiye&apos;nin lider dijital ajanslarindan biri olmak ve global
                  arenada soz sahibi bir teknoloji markasi haline gelmek.
                  Yenilikci yaklasimimiz ve musteri odakli calisma kulturumuzle,
                  dijital dunyanin sinirlarini zorlayarak sektore yon veren
                  projeler uretmek.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#111827]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-center mb-16">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Degerlerimiz
              </span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={index}>
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 text-center hover:border-blue-500/30 transition-colors duration-300 h-full">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-center mb-6">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Teknoloji Yiginimiz
              </span>
            </h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Projelerimizde kullandigimiz modern teknolojiler ve araclar
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <ScrollReveal key={index}>
                <div className="group relative bg-[#111827] border border-gray-800 rounded-xl p-4 text-center hover:border-blue-500/50 transition-all duration-300 hover:scale-105 cursor-default">
                  <span className="text-sm md:text-base font-semibold font-[family-name:var(--font-poppins)] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {tech}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Counter Stats Section */}
      <section className="py-24 bg-[#111827]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-center mb-16">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Rakamlarla NovaShield
              </span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={index}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                    <Counter end={stat.value} suffix={stat.suffix} label={stat.label} />
                  </div>
                  <p className="text-gray-400 text-lg">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
