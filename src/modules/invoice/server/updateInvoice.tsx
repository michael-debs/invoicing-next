"use server";

import { DatabaseService } from "@/lib/db";
import { Invoice, InvoiceItem } from "@prisma/client";

type UpdateInvoiceData = {
  id: number;
  invoice: Partial<Omit<Invoice, "id">>;
  items?: Omit<InvoiceItem, "id" | "invoiceId">[];
};

export async function updateInvoice(data: UpdateInvoiceData): Promise<Invoice> {
  const db = new DatabaseService();

  try {
    const updatedInvoice = await db.updateInvoice(
      data.id,
      data.invoice,
      data.items
    );
    return updatedInvoice;
  } catch (error) {
    console.error("Error updating invoice:", error);
    throw new Error("Failed to update invoice");
  } finally {
    await db.close();
  }
}
