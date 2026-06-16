import { NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, service, rating, text } = body;

    if (!name || !service || !rating || !text) {
      return NextResponse.json({ error: "Eksik alanlar var" }, { status: 400 });
    }

    if (text.length < 20) {
      return NextResponse.json({ error: "Yorum en az 20 karakter olmali" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Puan 1-5 arasi olmali" }, { status: 400 });
    }

    const db = getDb();
    const stmt = db.prepare(
      "INSERT INTO reviews (name, company, service, rating, text) VALUES (?, ?, ?, ?, ?)"
    );
    stmt.run(name, company || null, service, rating, text);

    return NextResponse.json({ success: true, message: "Yorumunuz alindi, onay sonrasi yayinlanacaktir." });
  } catch {
    return NextResponse.json({ error: "Sunucu hatasi" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = getDb();
    const rows = db.prepare("SELECT * FROM reviews WHERE approved = 1 ORDER BY created_at DESC").all();
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: "Sunucu hatasi" }, { status: 500 });
  }
}
