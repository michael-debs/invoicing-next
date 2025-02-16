import { Box, Typography, Paper } from "@mui/material";
import { useInvoiceForm } from "./InvoiceFormContext";
import RHFTextField from "../../../../components/RHF/RHFTextField";
import RHFDateField from "../../../../components/RHF/RHFDateField";
import { sectionStyle, sectionTitleStyle } from "./styles";

function InvoiceDetails(): JSX.Element {
  const {
    form: { control },
    isEditing,
  } = useInvoiceForm();

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
          disabled={!isEditing}
        />
        <RHFDateField
          name="date"
          label="Date"
          control={control}
          disabled={!isEditing}
        />
      </Box>
    </Paper>
  );
}

export default InvoiceDetails;
