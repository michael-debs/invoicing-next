"use client";

import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import InvoiceForm from "@/modules/invoice/components/invoice-form/InvoiceForm";
import InvoicePreview from "@/modules/invoice/components/invoice-form/InvoicePreview";
import { InvoiceFormProvider } from "@/modules/invoice/components/invoice-form/InvoiceFormContext";

function InvoicePage() {
  const { id } = useParams();
  const mode = id ? "view" : "create";

  return (
    <InvoiceFormProvider mode={mode} invoiceId={id as string | undefined}>
      <Box
        sx={{
          p: 4,
          display: "flex",
          gap: 4,
          height: "calc(100vh - 32px)",
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
