import { Box, Typography, Paper } from "@mui/material";
import { useInvoiceForm } from "./InvoiceFormContext";
import RHFTextField from "../../../../components/RHF/RHFTextField";
import RHFDateField from "../../../../components/RHF/RHFDateField";
import { sectionStyle, sectionTitleStyle } from "./styles";
import { useEffect } from "react";
import { getNextInvoiceNumber } from "../../server/getNextInvoiceNumber";

function InvoiceDetails(): React.ReactNode {
  const {
    form: { control, setValue },
    isEditing,
    mode,
  } = useInvoiceForm();

  useEffect(() => {
    if (mode === "create") {
      const fetchNextInvoiceNumber = async () => {
        try {
          const nextNumber = await getNextInvoiceNumber();
          setValue("invoiceNumber", nextNumber);

          // Set date to last day of current month, handling timezone correctly
          const today = new Date();
          const year = today.getFullYear();
          const month = today.getMonth();

          // Get last day of current month at noon to avoid timezone issues
          const lastDayOfMonth = new Date(
            Date.UTC(year, month + 1, 0, 12, 0, 0)
          );

          // Get first day of next month at noon to avoid timezone issues
          const nextMonth = new Date(Date.UTC(year, month + 1, 1, 12, 0, 0));

          setValue("date", lastDayOfMonth.toISOString().split("T")[0]);
          setValue("dueDate", nextMonth.toISOString().split("T")[0]);
        } catch (error) {
          console.error("Failed to fetch next invoice number:", error);
        }
      };
      fetchNextInvoiceNumber();
    }
  }, [mode, setValue]);

  return (
    <Paper sx={sectionStyle}>
      <Typography variant="h6" sx={sectionTitleStyle}>
        Invoice Details
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <RHFTextField
          name="invoiceNumber"
          label="Invoice Number"
          control={control}
          disabled={true}
        />
        <RHFDateField
          name="date"
          label="Date"
          control={control}
          disabled={!isEditing}
        />
        <RHFDateField
          name="dueDate"
          label="Due Date"
          control={control}
          disabled={!isEditing}
        />
      </Box>
    </Paper>
  );
}

export default InvoiceDetails;
