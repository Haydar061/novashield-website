import { NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();

    const totalContacts =
      (db.prepare("SELECT COUNT(*) as count FROM contacts").get() as { count: number }).count;

    const totalReviews =
      (db.prepare("SELECT COUNT(*) as count FROM reviews").get() as { count: number }).count;

    const pendingReviews =
      (db.prepare("SELECT COUNT(*) as count FROM reviews WHERE approved = 0").get() as { count: number }).count;

    const today = new Date().toISOString().split("T")[0];
    const todayContacts =
      (db.prepare("SELECT COUNT(*) as count FROM contacts WHERE DATE(created_at) = ?").get(today) as { count: number }).count;

    const recentContacts = db
      .prepare("SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5")
      .all();

    const recentReviews = db
      .prepare("SELECT * FROM reviews ORDER BY created_at DESC LIMIT 5")
      .all();

    return NextResponse.json({
      stats: {
        totalContacts,
        totalReviews,
        pendingReviews,
        todayContacts,
      },
      recentContacts,
      recentReviews,
    });
  } catch {
    return NextResponse.json({ error: "Sunucu hatasi" }, { status: 500 });
  }
}
