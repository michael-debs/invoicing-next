"use server";

import { DatabaseService } from "@/lib/db";

export async function getNextInvoiceNumber(): Promise<string> {
  const db = new DatabaseService();
  try {
    const invoices = await db.getInvoices();
    const nextNumber = invoices.length + 1;
    return `INV-${String(nextNumber).padStart(3, "0")}`;
  } catch (error) {
    console.error("Error getting next invoice number:", error);
    throw new Error("Failed to get next invoice number");
  } finally {
    await db.close();
  }
}
