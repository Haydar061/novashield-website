"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Merhaba! NovaShield'e hosgeldiniz. Size nasil yardimci olabilirim?" },
  ]);
  const [input, setInput] = useState("");

  const botResponses: Record<string, string> = {
    fiyat: "Fiyatlarimiz hizmete gore degisiyor. Detayli teklif icin /fiyat-hesapla sayfamizi kullanabilir veya /iletisim formunu doldurabilirsiniz.",
    hizmet: "18 farkli hizmet sunuyoruz: Web tasarim, e-ticaret, mobil uygulama, SEO, sosyal medya, AI otomasyon ve daha fazlasi. /hizmetler sayfamizdan detaylara bakabilirsiniz.",
    iletisim: "Bize /iletisim sayfasindan ulasabilirsiniz. Formu doldurun, 24 saat icinde donecegiz!",
    sure: "Proje suresi karmasikliga gore degisir. Basit web sitesi 1-2 hafta, e-ticaret 2-4 hafta, mobil uygulama 4-8 hafta surer genelde.",
    merhaba: "Merhaba! Hosgeldiniz. Bir sorunuz varsa yazabilirsiniz, ya da /iletisim formundan bize ulasabilirsiniz.",
    selam: "Selam! Size nasil yardimci olabilirim?",
  };

  const getBotResponse = (msg: string): string => {
    const lower = msg.toLowerCase();
    for (const [key, response] of Object.entries(botResponses)) {
      if (lower.includes(key)) return response;
    }
    return "Tesekkurler! Bu konuda size daha detayli yardimci olabilmemiz icin /iletisim formunu doldurmanizi oneririm. En kisa surede donecegiz.";
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: getBotResponse(userMsg) }]);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg shadow-blue-500/30 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
              <h3 className="text-white font-semibold">NovaShield Destek</h3>
              <p className="text-blue-100 text-xs">Genelde 1 saat icinde donus yapiyoruz</p>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                      msg.from === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-[#0a0a0a] text-gray-300 border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Mesajinizi yazin..."
                  className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={send}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
