import { PrismaClient, Invoice, InvoiceItem } from "@prisma/client";

export type { Invoice, InvoiceItem };

class DatabaseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createInvoice(
    invoice: Omit<Invoice, "id">,
    items: Omit<InvoiceItem, "id" | "invoiceId">[]
  ): Promise<number> {
    const result = await this.prisma.invoice.create({
      data: {
        ...invoice,
        items: {
          create: items,
        },
      },
    });

    return result.id;
  }

  async getInvoices(): Promise<Invoice[]> {
    return await this.prisma.invoice.findMany({
      orderBy: {
        date: "desc",
      },
    });
  }

  async getInvoiceItems(invoiceId: number): Promise<InvoiceItem[]> {
    return await this.prisma.invoiceItem.findMany({
      where: {
        invoiceId,
      },
    });
  }

  async getInvoice(id: number): Promise<Invoice | null> {
    const invoice = await this.prisma.invoice.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    return invoice;
  }

  async close(): Promise<void> {
    await this.prisma.$disconnect();
  }
}

export const db = new DatabaseService();

// Handle cleanup
if (typeof process !== "undefined") {
  process.on("beforeExit", async () => {
    await db.close();
  });
}
