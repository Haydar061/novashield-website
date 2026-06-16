import { NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function PATCH(request: Request) {
  try {
    const { id, approved } = await request.json();

    if (id === undefined || approved === undefined) {
      return NextResponse.json({ error: "Eksik alanlar" }, { status: 400 });
    }

    const db = getDb();
    db.prepare("UPDATE reviews SET approved = ? WHERE id = ?").run(approved ? 1 : 0, id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatasi" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID gerekli" }, { status: 400 });
    }

    const db = getDb();
    db.prepare("DELETE FROM reviews WHERE id = ?").run(id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatasi" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = getDb();
    const reviews = db.prepare("SELECT * FROM reviews ORDER BY created_at DESC").all();
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json({ error: "Sunucu hatasi" }, { status: 500 });
  }
}
