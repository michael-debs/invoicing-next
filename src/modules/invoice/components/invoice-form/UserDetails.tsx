import { Box, Typography, Paper } from "@mui/material";
import { useInvoiceForm } from "./InvoiceFormContext";
import RHFTextField from "../../../../components/RHF/RHFTextField";
import RHFFileField from "../../../../components/RHF/RHFFileField";
import { sectionStyle, sectionTitleStyle } from "./styles";

function UserDetails(): JSX.Element {
  const {
    form: { control },
    isEditing,
  } = useInvoiceForm();

  return (
    <Paper sx={sectionStyle}>
      <Typography variant="h6" sx={sectionTitleStyle}>
        Your Details
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <RHFTextField
          name="userFullName"
          label="Full Name"
          control={control}
          disabled={!isEditing}
        />
        <RHFTextField
          name="userEmail"
          label="Email"
          control={control}
          disabled={!isEditing}
        />
        <RHFTextField
          name="userPhone"
          label="Phone"
          control={control}
          disabled={!isEditing}
        />
        <RHFTextField
          name="userAddress"
          label="Address"
          multiline
          rows={3}
          control={control}
          disabled={!isEditing}
        />
        <RHFFileField
          name="userSignature"
          label="Signature"
          control={control}
          disabled={!isEditing}
        />
      </Box>
    </Paper>
  );
}

export default UserDetails;
