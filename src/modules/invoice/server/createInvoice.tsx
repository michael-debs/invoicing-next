"use server";

import { DatabaseService } from "@/lib/db";
import { Invoice, InvoiceItem } from "@prisma/client";

type CreateInvoiceData = {
  invoice: Omit<Invoice, "id">;
  items: Omit<InvoiceItem, "id" | "invoiceId">[];
};

export async function createInvoice(data: CreateInvoiceData): Promise<number> {
  const db = new DatabaseService();

  try {
    const invoiceId = await db.createInvoice(data.invoice, data.items);
    return invoiceId;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw new Error("Failed to create invoice");
  } finally {
    await db.close();
  }
}
