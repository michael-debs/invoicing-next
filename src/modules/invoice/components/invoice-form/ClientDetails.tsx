import { Box, Typography, Paper } from "@mui/material";
import { useInvoiceForm } from "./InvoiceFormContext";
import RHFTextField from "../../../../components/RHF/RHFTextField";
import { sectionStyle, sectionTitleStyle } from "./styles";

function ClientDetails(): JSX.Element {
  const {
    form: { control },
    isEditing,
  } = useInvoiceForm();

  return (
    <Paper sx={sectionStyle}>
      <Typography variant="h6" sx={sectionTitleStyle}>
        Client Details
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <RHFTextField
          name="companyName"
          label="Company Name"
          control={control}
          disabled={!isEditing}
        />
        <RHFTextField
          name="clientEmail"
          label="Email"
          control={control}
          disabled={!isEditing}
        />
        <RHFTextField
          name="clientAddress"
          label="Address"
          multiline
          rows={3}
          control={control}
          disabled={!isEditing}
        />
      </Box>
    </Paper>
  );
}

export default ClientDetails;
