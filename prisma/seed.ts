import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.invoiceItem.deleteMany();
  await prisma.invoice.deleteMany();

  // Create sample invoices
  const invoice1 = await prisma.invoice.create({
    data: {
      companyName: "Tech Solutions Ltd",
      partnershipNumber: "PS123456",
      clientAddress: "123 Business Street, London, UK",
      clientEmail: "contact@techsolutions.com",
      clientPhone: "+44 20 1234 5678",
      invoiceNumber: "INV-2024-001",
      date: new Date().toISOString(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      total: 2500.0,
      userFullName: "John Smith",
      userAddress: "456 Developer Ave, London, UK",
      userEmail: "john@example.com",
      userPhone: "+44 20 8765 4321",
      userSignature:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", // Sample base64 signature
      bankName: "Barclays",
      accountName: "John Smith",
      accountNumber: "12345678",
      sortCode: "12-34-56",
      iban: "GB29NWBK60161331926819",
      swift: "BARCGB22",
      items: {
        create: [
          {
            description: "Web Development Services",
            quantity: 1,
            price: 1500.0,
          },
          {
            description: "UI/UX Design",
            quantity: 2,
            price: 500.0,
          },
        ],
      },
    },
  });

  const invoice2 = await prisma.invoice.create({
    data: {
      companyName: "Marketing Pro Agency",
      partnershipNumber: "PS789012",
      clientAddress: "789 Agency Road, Manchester, UK",
      clientEmail: "hello@marketingpro.com",
      clientPhone: "+44 161 234 5678",
      invoiceNumber: "INV-2024-002",
      date: new Date().toISOString(),
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
      total: 3750.0,
      userFullName: "John Smith",
      userAddress: "456 Developer Ave, London, UK",
      userEmail: "john@example.com",
      userPhone: "+44 20 8765 4321",
      userSignature:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
      bankName: "Barclays",
      accountName: "John Smith",
      accountNumber: "12345678",
      sortCode: "12-34-56",
      iban: "GB29NWBK60161331926819",
      swift: "BARCGB22",
      items: {
        create: [
          {
            description: "Digital Marketing Campaign",
            quantity: 1,
            price: 2500.0,
          },
          {
            description: "Social Media Management",
            quantity: 5,
            price: 250.0,
          },
        ],
      },
    },
  });

  console.log("Seeded:", { invoice1, invoice2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
