import { NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Eksik alanlar var" }, { status: 400 });
    }

    const db = getDb();
    const stmt = db.prepare(
      "INSERT INTO contacts (name, email, phone, service, budget, message) VALUES (?, ?, ?, ?, ?, ?)"
    );
    stmt.run(name, email, phone || null, service || null, budget || null, message);

    return NextResponse.json({ success: true, message: "Mesajiniz alindi." });
  } catch {
    return NextResponse.json({ error: "Sunucu hatasi" }, { status: 500 });
  }
}
