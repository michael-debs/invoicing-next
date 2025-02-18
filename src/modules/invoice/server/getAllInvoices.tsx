"use server";

import { DatabaseService } from "@/lib/db";
import { Invoice } from "@prisma/client";

export async function getAllInvoices(): Promise<Invoice[]> {
  const db = new DatabaseService();
  try {
    const invoices = await db.getInvoices();
    return invoices;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw new Error("Failed to fetch invoices");
  } finally {
    await db.close();
  }
}
