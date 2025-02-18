import { DatabaseService } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = new DatabaseService();
  try {
    const invoices = await db.getInvoices();
    const nextNumber = invoices.length + 1;
    return NextResponse.json({ nextNumber });
  } catch (error) {
    console.error("Error getting next invoice number:", error);
    return NextResponse.json(
      { error: "Failed to get next invoice number" },
      { status: 500 }
    );
  } finally {
    await db.close();
  }
}
