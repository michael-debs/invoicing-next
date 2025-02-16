"use client";

import { Box, Button, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import type { Invoice } from "@/modules/invoice/types";
import { useRouter } from "next/navigation";

function InvoiceList(): React.ReactElement {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        // TODO: get invoices from the database
        // const data = await window.electronAPI.getInvoices();
        // setInvoices(data);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      }
    };
    fetchInvoices();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Box sx={{ p: 4, flex: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#1a237e",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -1,
              left: 0,
              width: "60px",
              height: "4px",
              backgroundColor: "#1a237e",
              borderRadius: "2px",
            },
          }}
        >
          Invoices
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.push("/create-invoice")}
          sx={{
            bgcolor: "#1a237e",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1rem",
            boxShadow: "0 4px 6px rgba(26, 35, 126, 0.2)",
            "&:hover": {
              bgcolor: "#000051",
              boxShadow: "0 6px 8px rgba(26, 35, 126, 0.3)",
            },
          }}
        >
          Create New Invoice
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "flex-start",
        }}
      >
        {invoices.length === 0 ? (
          <Paper
            sx={{
              p: 4,
              textAlign: "center",
              width: "100%",
              borderRadius: 3,
              bgcolor: "white",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Typography color="text.secondary">No invoices found</Typography>
          </Paper>
        ) : (
          invoices.map((invoice) => (
            <Paper
              key={invoice.id}
              sx={{
                p: 3,
                width: 320,
                borderRadius: 3,
                transition: "all 0.3s ease",
                cursor: "pointer",
                bgcolor: "white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
                },
              }}
              onClick={() => router.push(`/invoice/${invoice.id}`)}
            >
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#1a237e",
                    mb: 1,
                    fontWeight: 600,
                  }}
                >
                  Invoice #{invoice.id}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    color: "#666",
                    fontWeight: 500,
                  }}
                >
                  {invoice.clientName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    mb: 1,
                    fontSize: "0.9rem",
                  }}
                >
                  {invoice.date}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pt: 2,
                  borderTop: "1px solid #eee",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#1a237e",
                    fontWeight: 600,
                  }}
                >
                  {formatCurrency(invoice.total)}
                </Typography>
              </Box>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
}

export default InvoiceList;
