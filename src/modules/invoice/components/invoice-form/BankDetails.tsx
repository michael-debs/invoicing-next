import { Box, Typography, Paper } from "@mui/material";
import { useInvoiceForm } from "./InvoiceFormContext";
import RHFTextField from "../../../../components/RHF/RHFTextField";
import { sectionStyle, sectionTitleStyle } from "./styles";

function BankDetails(): JSX.Element {
  const {
    form: { control },
    isEditing,
  } = useInvoiceForm();

  return (
    <Paper sx={sectionStyle}>
      <Typography variant="h6" sx={sectionTitleStyle}>
        Bank Details
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <RHFTextField
          name="bankName"
          label="Bank Name"
          control={control}
          disabled={!isEditing}
        />
        <RHFTextField
          name="accountNumber"
          label="Account Number"
          control={control}
          disabled={!isEditing}
        />
      </Box>
    </Paper>
  );
}

export default BankDetails;
