import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const companies = [
  {
    name: "Tech Solutions Ltd",
    partnershipNumber: "PS123456",
    address: "123 Business Street, London, UK",
    email: "contact@techsolutions.com",
    phone: "+44 20 1234 5678",
  },
  {
    name: "Marketing Pro Agency",
    partnershipNumber: "PS789012",
    address: "789 Agency Road, Manchester, UK",
    email: "hello@marketingpro.com",
    phone: "+44 161 234 5678",
  },
  {
    name: "Design Masters Co",
    partnershipNumber: "PS345678",
    address: "456 Creative Ave, Bristol, UK",
    email: "info@designmasters.co.uk",
    phone: "+44 117 345 6789",
  },
  {
    name: "Data Analytics Plus",
    partnershipNumber: "PS901234",
    address: "901 Data Drive, Edinburgh, UK",
    email: "contact@dataplus.co.uk",
    phone: "+44 131 456 7890",
  },
  {
    name: "Cloud Systems UK",
    partnershipNumber: "PS567890",
    address: "567 Cloud Lane, Glasgow, UK",
    email: "info@cloudsystems.uk",
    phone: "+44 141 567 8901",
  },
];

const services = [
  { description: "Web Development Services", price: 1500.0 },
  { description: "UI/UX Design", price: 500.0 },
  { description: "Digital Marketing Campaign", price: 2500.0 },
  { description: "Social Media Management", price: 250.0 },
  { description: "Cloud Infrastructure Setup", price: 3000.0 },
  { description: "Database Optimization", price: 1200.0 },
  { description: "Mobile App Development", price: 2000.0 },
  { description: "SEO Optimization", price: 800.0 },
  { description: "Content Creation", price: 400.0 },
  { description: "System Architecture Design", price: 2800.0 },
];

const user = {
  fullName: "John Smith",
  address: "456 Developer Ave, London, UK",
  email: "john@example.com",
  phone: "+44 20 8765 4321",
  signature:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  bankName: "Barclays",
  accountName: "John Smith",
  accountNumber: "12345678",
  sortCode: "12-34-56",
  iban: "GB29NWBK60161331926819",
  swift: "BARCGB22",
};

async function main() {
  // Clear existing data
  await prisma.invoiceItem.deleteMany();
  await prisma.invoice.deleteMany();

  // Create 10 invoices
  for (let i = 1; i <= 10; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const date = new Date();
    date.setMonth(date.getMonth() - (10 - i)); // Spread invoices across last 10 months

    // Select 2-4 random services for each invoice
    const numServices = Math.floor(Math.random() * 3) + 2;
    const selectedServices = [...services]
      .sort(() => Math.random() - 0.5)
      .slice(0, numServices)
      .map((service) => ({
        ...service,
        quantity: Math.floor(Math.random() * 3) + 1,
      }));

    const total = selectedServices.reduce(
      (sum, service) => sum + service.price * service.quantity,
      0
    );

    await prisma.invoice.create({
      data: {
        companyName: company.name,
        partnershipNumber: company.partnershipNumber,
        clientAddress: company.address,
        clientEmail: company.email,
        clientPhone: company.phone,
        invoiceNumber: `INV-${String(i).padStart(3, "0")}`,
        date: date.toISOString(),
        dueDate: new Date(
          date.getTime() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        total,
        userFullName: user.fullName,
        userAddress: user.address,
        userEmail: user.email,
        userPhone: user.phone,
        userSignature: user.signature,
        bankName: user.bankName,
        accountName: user.accountName,
        accountNumber: user.accountNumber,
        sortCode: user.sortCode,
        iban: user.iban,
        swift: user.swift,
        items: {
          create: selectedServices.map((service) => ({
            description: service.description,
            quantity: service.quantity,
            price: service.price,
          })),
        },
      },
    });
  }

  console.log("Seeded 10 invoices successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
