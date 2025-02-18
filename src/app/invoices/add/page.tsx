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

async function InvoicePage() {
  const mode = "create";
  let initialData = defaultValues;

  return (
    <InvoiceFormProvider mode={mode} initialData={initialData}>
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
