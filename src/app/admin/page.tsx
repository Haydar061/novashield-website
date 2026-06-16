"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Shield,
  LayoutDashboard,
  MessageSquare,
  Star,
  ArrowLeft,
  Trash2,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Calendar,
  ChevronDown,
  ChevronUp,
  Lock,
  Users,
  Clock,
  AlertCircle,
} from "lucide-react";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  read: number;
  created_at: string;
}

interface Review {
  id: number;
  name: string;
  company: string | null;
  service: string;
  rating: number;
  text: string;
  approved: number;
  created_at: string;
}

interface Stats {
  totalContacts: number;
  todayContacts: number;
  totalReviews: number;
  pendingReviews: number;
}

type Tab = "dashboard" | "contacts" | "reviews";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    todayContacts: 0,
    totalReviews: 0,
    pendingReviews: 0,
  });
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [recentReviews, setRecentReviews] = useState<Review[]>([]);
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [expandedContact, setExpandedContact] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("novashield-admin");
    if (stored === "authenticated") {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "novashield2024") {
      setAuthenticated(true);
      sessionStorage.setItem("novashield-admin", "authenticated");
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch("/api/admin");
      const data = await res.json();
      setStats(data.stats);
      setRecentContacts(data.recentContacts);
      setRecentReviews(data.recentReviews);
    } catch (err) {
      console.error("Dashboard verisi alinamadi:", err);
    }
  }, []);

  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/contacts");
      const data = await res.json();
      setAllContacts(data);
    } catch (err) {
      console.error("Talepler alinamadi:", err);
    }
  }, []);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json();
      setAllReviews(data);
    } catch (err) {
      console.error("Yorumlar alinamadi:", err);
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);
    if (activeTab === "dashboard") {
      fetchDashboard().finally(() => setLoading(false));
    } else if (activeTab === "contacts") {
      fetchContacts().finally(() => setLoading(false));
    } else if (activeTab === "reviews") {
      fetchReviews().finally(() => setLoading(false));
    }
  }, [authenticated, activeTab, fetchDashboard, fetchContacts, fetchReviews]);

  const deleteContact = async (id: number) => {
    if (!confirm("Bu talebi silmek istediginize emin misiniz?")) return;
    await fetch("/api/admin/contacts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (activeTab === "contacts") fetchContacts();
    else fetchDashboard();
  };

  const deleteReview = async (id: number) => {
    if (!confirm("Bu yorumu silmek istediginize emin misiniz?")) return;
    await fetch("/api/admin/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (activeTab === "reviews") fetchReviews();
    else fetchDashboard();
  };

  const toggleReviewApproval = async (id: number, currentApproved: number) => {
    await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved: currentApproved ? 0 : 1 }),
    });
    if (activeTab === "reviews") fetchReviews();
    else fetchDashboard();
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
      />
    ));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="bg-[#111827] rounded-2xl p-8 w-full max-w-md border border-gray-800">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Shield className="text-blue-500" size={32} />
            <h1 className="text-2xl font-bold text-white">NovaShield Admin</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Sifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Admin sifresi"
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">Yanlis sifre!</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Giris Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#111827] border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="text-blue-500" size={28} />
            <h1 className="text-xl font-bold text-white">NovaShield Admin</h1>
          </div>
          <a
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Siteye Don
          </a>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-[#111827]/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1">
            {[
              { id: "dashboard" as Tab, label: "Genel Bakis", icon: LayoutDashboard },
              { id: "contacts" as Tab, label: "Talepler", icon: MessageSquare },
              { id: "reviews" as Tab, label: "Yorumlar", icon: Star },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    icon={Users}
                    label="Toplam Talep"
                    value={stats.totalContacts}
                    color="blue"
                  />
                  <StatCard
                    icon={Clock}
                    label="Bugunun Talepleri"
                    value={stats.todayContacts}
                    color="emerald"
                  />
                  <StatCard
                    icon={Star}
                    label="Toplam Yorum"
                    value={stats.totalReviews}
                    color="yellow"
                  />
                  <StatCard
                    icon={AlertCircle}
                    label="Onay Bekleyen"
                    value={stats.pendingReviews}
                    color="red"
                  />
                </div>

                {/* Recent Data */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Contacts */}
                  <div className="bg-[#111827] rounded-xl border border-gray-800 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <MessageSquare size={20} className="text-blue-500" />
                      Son Talepler
                    </h2>
                    {recentContacts.length === 0 ? (
                      <p className="text-gray-500 text-sm">Henuz talep yok.</p>
                    ) : (
                      <div className="space-y-3">
                        {recentContacts.map((contact) => (
                          <div
                            key={contact.id}
                            className="bg-[#0a0a0a] rounded-lg p-3 border border-gray-800"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-white text-sm">
                                {contact.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(contact.created_at)}
                              </span>
                            </div>
                            <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                              <Mail size={12} /> {contact.email}
                            </p>
                            <p className="text-gray-500 text-xs mt-1 line-clamp-1">
                              {contact.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Recent Reviews */}
                  <div className="bg-[#111827] rounded-xl border border-gray-800 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Star size={20} className="text-yellow-500" />
                      Son Yorumlar
                    </h2>
                    {recentReviews.length === 0 ? (
                      <p className="text-gray-500 text-sm">Henuz yorum yok.</p>
                    ) : (
                      <div className="space-y-3">
                        {recentReviews.map((review) => (
                          <div
                            key={review.id}
                            className="bg-[#0a0a0a] rounded-lg p-3 border border-gray-800"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-white text-sm">
                                {review.name}
                              </span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  review.approved
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : "bg-yellow-500/20 text-yellow-400"
                                }`}
                              >
                                {review.approved ? "Onaylanmis" : "Bekliyor"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-gray-500 text-xs mt-1 line-clamp-1">
                              {review.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === "contacts" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">
                  Tum Talepler ({allContacts.length})
                </h2>
                {allContacts.length === 0 ? (
                  <div className="bg-[#111827] rounded-xl border border-gray-800 p-12 text-center">
                    <MessageSquare className="mx-auto text-gray-600 mb-3" size={40} />
                    <p className="text-gray-500">Henuz talep yok.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {allContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden"
                      >
                        <div
                          className="p-4 cursor-pointer hover:bg-[#1a2332] transition-colors"
                          onClick={() =>
                            setExpandedContact(
                              expandedContact === contact.id ? null : contact.id
                            )
                          }
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="flex-shrink-0">
                                {expandedContact === contact.id ? (
                                  <ChevronUp size={18} className="text-gray-500" />
                                ) : (
                                  <ChevronDown size={18} className="text-gray-500" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <span className="font-medium text-white text-sm block">
                                  {contact.name}
                                </span>
                                <span className="text-gray-400 text-xs flex items-center gap-1">
                                  <Mail size={12} /> {contact.email}
                                  {contact.phone && (
                                    <>
                                      <span className="mx-1">|</span>
                                      <Phone size={12} /> {contact.phone}
                                    </>
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0 ml-7 sm:ml-0">
                              {contact.service && (
                                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                                  {contact.service}
                                </span>
                              )}
                              {contact.budget && (
                                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                                  {contact.budget}
                                </span>
                              )}
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar size={12} />
                                {formatDate(contact.created_at)}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteContact(contact.id);
                                }}
                                className="text-red-500 hover:text-red-400 transition-colors p-1"
                                title="Sil"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                        {expandedContact === contact.id && (
                          <div className="px-4 pb-4 pt-0 border-t border-gray-800">
                            <div className="bg-[#0a0a0a] rounded-lg p-4 mt-3">
                              <p className="text-sm text-gray-300 whitespace-pre-wrap">
                                {contact.message}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">
                  Tum Yorumlar ({allReviews.length})
                </h2>
                {allReviews.length === 0 ? (
                  <div className="bg-[#111827] rounded-xl border border-gray-800 p-12 text-center">
                    <Star className="mx-auto text-gray-600 mb-3" size={40} />
                    <p className="text-gray-500">Henuz yorum yok.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {allReviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-[#111827] rounded-xl border border-gray-800 p-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="font-medium text-white">
                                {review.name}
                              </span>
                              {review.company && (
                                <span className="text-xs text-gray-500">
                                  ({review.company})
                                </span>
                              )}
                              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                                {review.service}
                              </span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  review.approved
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : "bg-yellow-500/20 text-yellow-400"
                                }`}
                              >
                                {review.approved ? "Onaylanmis" : "Bekliyor"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-gray-300 text-sm mt-2">
                              {review.text}
                            </p>
                            <span className="text-xs text-gray-600 mt-2 block">
                              {formatDate(review.created_at)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() =>
                                toggleReviewApproval(review.id, review.approved)
                              }
                              className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors ${
                                review.approved
                                  ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                                  : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                              }`}
                            >
                              {review.approved ? (
                                <>
                                  <XCircle size={16} /> Reddet
                                </>
                              ) : (
                                <>
                                  <CheckCircle size={16} /> Onayla
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => deleteReview(review.id)}
                              className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                            >
                              <Trash2 size={16} /> Sil
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/20 text-blue-500",
    emerald: "bg-emerald-500/20 text-emerald-500",
    yellow: "bg-yellow-500/20 text-yellow-500",
    red: "bg-red-500/20 text-red-500",
  };

  return (
    <div className="bg-[#111827] rounded-xl border border-gray-800 p-5">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-lg ${colorMap[color]}`}>
          <Icon size={22} />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
}
