"use client";

import { Box, Button } from "@mui/material";
import InvoiceDetails from "./InvoiceDetails";
import ClientDetails from "./ClientDetails";
import InvoiceItems from "./InvoiceItems";
import UserDetails from "./UserDetails";
import BankDetails from "./BankDetails";
import { useInvoiceForm } from "./InvoiceFormContext";
import { useRouter } from "next/navigation";

function InvoiceForm(): React.ReactElement {
  const router = useRouter();
  const { form, isEditing, setIsEditing, mode, saveInvoice } = useInvoiceForm();

  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit(saveInvoice)}
      sx={{
        flex: "0 0 50%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          height: "100%",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <InvoiceDetails />
        <ClientDetails />
        <InvoiceItems />
        <UserDetails />
        <BankDetails />
      </Box>

      <Box
        sx={{
          mt: "auto",
          pt: 2,
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => router.push("/invoices")}
          sx={{
            borderColor: "#cbd5e1",
            color: "#475569",
            "&:hover": {
              borderColor: "#94a3b8",
              bgcolor: "#f8fafc",
            },
          }}
        >
          Back
        </Button>
        <Box sx={{ display: "flex", gap: 2 }}>
          {mode !== "create" && (
            <Button
              variant="contained"
              onClick={() => setIsEditing(!isEditing)}
              color={isEditing ? "warning" : "primary"}
            >
              {isEditing ? "Cancel Edit" : "Edit Invoice"}
            </Button>
          )}
          {isEditing && (
            <Button
              variant="contained"
              type="submit"
              disabled={
                !form.watch("invoiceNumber") ||
                !form.watch("companyName") ||
                form.watch("items").length === 0
              }
              sx={{
                bgcolor: "#1a237e",
                "&:hover": { bgcolor: "#000051" },
              }}
            >
              Save Invoice
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default InvoiceForm;
