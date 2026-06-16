"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { reviews as defaultReviews, type Review } from "@/data/reviews";
import { services } from "@/data/services";
import { Star, MessageSquarePlus } from "lucide-react";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  company: string;
  service: string;
  rating: number;
  text: string;
}

interface DbReview {
  id: number;
  name: string;
  company: string | null;
  service: string;
  rating: number;
  text: string;
}

export default function YorumlarPage() {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dbReviews, setDbReviews] = useState<Review[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      company: "",
      service: "",
      rating: 0,
      text: "",
    },
  });

  // DB'den onaylanmis yorumlari cek
  useEffect(() => {
    fetch("/api/yorumlar")
      .then((res) => res.json())
      .then((data: DbReview[]) => {
        if (Array.isArray(data)) {
          setDbReviews(
            data.map((r) => ({
              id: r.id + 1000,
              name: r.name,
              title: r.company || "Musteri",
              service: r.service,
              rating: r.rating,
              text: r.text,
            }))
          );
        }
      })
      .catch(() => {});
  }, [submitted]);

  const allReviews = [...dbReviews, ...defaultReviews];

  const avgRating =
    allReviews.length > 0
      ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
      : "0";

  const onSubmit = async (data: FormData) => {
    if (selectedRating === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/yorumlar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, rating: selectedRating }),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
        setSelectedRating(0);
      }
    } catch {
      // handle error
    } finally {
      setSubmitting(false);
    }
  };

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    setValue("rating", rating);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="pt-32 pb-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] mb-4"
          >
            Musteri <span className="text-blue-500">Yorumlari</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Musterilerimizin gercek deneyimlerini okuyun
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <div className="bg-[#111827] border border-white/5 rounded-xl px-6 py-4 text-center">
              <div className="flex items-center gap-1 justify-center mb-1">
                <Star size={20} className="text-yellow-400 fill-yellow-400" />
                <span className="text-2xl font-bold text-white">{avgRating}</span>
              </div>
              <p className="text-gray-500 text-xs">Ortalama Puan</p>
            </div>
            <div className="bg-[#111827] border border-white/5 rounded-xl px-6 py-4 text-center">
              <span className="text-2xl font-bold text-white">{allReviews.length}</span>
              <p className="text-gray-500 text-xs">Toplam Yorum</p>
            </div>
            <div className="bg-[#111827] border border-white/5 rounded-xl px-6 py-4 text-center">
              <span className="text-2xl font-bold text-emerald-400">%100</span>
              <p className="text-gray-500 text-xs">Memnuniyet</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allReviews.map((review, index) => (
              <ScrollReveal key={`${review.id}-${index}`} delay={index * 0.04}>
                <div className="bg-[#111827] border border-white/5 rounded-xl p-6 h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-700"
                        }
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-4">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {review.name}
                      </p>
                      <p className="text-gray-500 text-xs">{review.title}</p>
                    </div>
                    <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-md">
                      {review.service}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Review Form */}
      <section className="pb-24 px-4">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <MessageSquarePlus className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <h2 className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-2">
                Siz de Yorumunuzu Yazin
              </h2>
              <p className="text-gray-400 text-sm">
                NovaShield'den hizmet aldiniz mi? Deneyiminizi paylasin.
              </p>
            </div>
          </ScrollReveal>

          {submitted ? (
            <ScrollReveal>
              <div className="bg-[#111827] border border-emerald-500/20 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star size={28} className="text-emerald-400 fill-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Tesekkurler!
                </h3>
                <p className="text-gray-400 mb-1">
                  Yorumunuz basariyla gonderildi.
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  Onay sonrasi bu sayfada yayinlanacaktir.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Baska bir yorum yaz
                </button>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#111827] border border-white/5 rounded-xl p-6 sm:p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1.5">
                      Ad Soyad <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Adiniz Soyadiniz"
                      {...register("name", { required: "Ad soyad zorunludur" })}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1.5">
                      Firma Adi
                    </label>
                    <input
                      type="text"
                      placeholder="Firma adiniz (opsiyonel)"
                      {...register("company")}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">
                    Aldiginiz Hizmet <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register("service", { required: "Hizmet secimi zorunludur" })}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-gray-500">
                      Hizmet seciniz
                    </option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title} className="bg-[#0a0a0a]">
                        {service.title}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">
                    Puaniniz <span className="text-red-400">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-125"
                      >
                        <Star
                          size={30}
                          className={
                            star <= (hoverRating || selectedRating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-600 hover:text-gray-500"
                          }
                        />
                      </button>
                    ))}
                    {selectedRating > 0 && (
                      <span className="text-gray-400 text-sm ml-2">
                        {selectedRating}/5
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">
                    Yorumunuz <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Deneyiminizi paylasın... Ne yaptırdınız, nasıl bir sonuc aldınız?"
                    {...register("text", {
                      required: "Yorum zorunludur",
                      minLength: {
                        value: 20,
                        message: "En az 20 karakter yazin",
                      },
                    })}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  />
                  {errors.text && (
                    <p className="text-red-400 text-xs mt-1">{errors.text.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting || selectedRating === 0}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-40 text-white font-semibold py-3 rounded-lg transition-all"
                >
                  {submitting ? "Gonderiliyor..." : "Yorumu Gonder"}
                </button>

                <p className="text-gray-600 text-xs text-center">
                  Yorumunuz incelendikten sonra yayinlanacaktir.
                </p>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>
    </main>
  );
}
