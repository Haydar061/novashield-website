import { NextResponse } from "next/server";
import getDb from "@/lib/db";

function ensureReadColumn(db: ReturnType<typeof getDb>) {
  const columns = db.prepare("PRAGMA table_info(contacts)").all() as { name: string }[];
  const hasRead = columns.some((col) => col.name === "read");
  if (!hasRead) {
    db.exec("ALTER TABLE contacts ADD COLUMN read INTEGER DEFAULT 0");
  }
}

export async function PATCH(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID gerekli" }, { status: 400 });
    }

    const db = getDb();
    ensureReadColumn(db);
    db.prepare("UPDATE contacts SET read = 1 WHERE id = ?").run(id);

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
    db.prepare("DELETE FROM contacts WHERE id = ?").run(id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatasi" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = getDb();
    ensureReadColumn(db);
    const contacts = db.prepare("SELECT * FROM contacts ORDER BY created_at DESC").all();
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json({ error: "Sunucu hatasi" }, { status: 500 });
  }
}
