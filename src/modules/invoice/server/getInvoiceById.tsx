"use server";

import { DatabaseService } from "@/lib/db";
import { Invoice, InvoiceItem } from "@prisma/client";

export type InvoiceWithItems = Invoice & { items: InvoiceItem[] };

export async function getInvoiceById(id: number): Promise<InvoiceWithItems> {
  const db = new DatabaseService();
  try {
    const invoice = await db.getInvoice(id);
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    return invoice;
  } catch (error) {
    console.error("Error fetching invoice:", error);
    throw new Error("Failed to fetch invoice");
  } finally {
    await db.close();
  }
}
