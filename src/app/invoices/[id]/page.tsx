import { Box } from "@mui/material";
import { getInvoiceById } from "@/modules/invoice/server/getInvoiceById";
import InvoiceForm from "@/modules/invoice/components/invoice-form/InvoiceForm";
import InvoicePreview from "@/modules/invoice/components/invoice-form/InvoicePreview";
import { InvoiceFormProvider } from "@/modules/invoice/components/invoice-form/InvoiceFormContext";
import { notFound } from "next/navigation";
import type { InvoiceFormData } from "@/modules/invoice/components/invoice-form/InvoiceFormContext";

const defaultValues: InvoiceFormData = {
  invoiceNumber: "",
  date: new Date().toISOString().split("T")[0],
  dueDate: "",
  companyName: "",
  partnershipNumber: "",
  clientAddress: "",
  clientEmail: "",
  clientPhone: "",
  userFullName: "",
  userAddress: "",
  userEmail: "",
  userPhone: "",
  userSignature: "",
  bankName: "",
  accountName: "",
  accountNumber: "",
  sortCode: "",
  iban: "",
  swift: "",
  items: [],
};

async function InvoicePage({ params }: { params: { id?: string } }) {
  const mode = params.id ? "view" : "create";
  let initialData = defaultValues;

  if (params.id) {
    try {
      const invoice = await getInvoiceById(parseInt(params.id));
      initialData = {
        invoiceNumber: invoice.invoiceNumber,
        date: invoice.date,
        dueDate: invoice.dueDate,
        companyName: invoice.companyName,
        partnershipNumber: invoice.partnershipNumber || "",
        clientAddress: invoice.clientAddress,
        clientEmail: invoice.clientEmail,
        clientPhone: invoice.clientPhone,
        userFullName: invoice.userFullName,
        userAddress: invoice.userAddress,
        userEmail: invoice.userEmail,
        userPhone: invoice.userPhone,
        userSignature: invoice.userSignature,
        bankName: invoice.bankName,
        accountName: invoice.accountName,
        accountNumber: invoice.accountNumber,
        sortCode: invoice.sortCode,
        iban: invoice.iban,
        swift: invoice.swift,
        items: invoice.items.map((item) => ({
          id: item.id,
          description: item.description,
          quantity: item.quantity,
          price: item.price,
        })),
      };
    } catch (error) {
      notFound();
    }
  }

  return (
    <InvoiceFormProvider
      mode={mode}
      invoiceId={params.id}
      initialData={initialData}
    >
      <Box
        sx={{
          p: 4,
          display: "flex",
          gap: 4,
          height: "100vh",
          overflow: "hidden",
          bgcolor: "#f8fafc",
        }}
      >
        <InvoiceForm />
        <InvoicePreview />
      </Box>
    </InvoiceFormProvider>
  );
}

export default InvoicePage;
