import React from "react";
import { Box, Typography, Paper, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useInvoiceForm } from "./InvoiceFormContext";
import RHFTextField from "../../../../components/RHF/RHFTextField";
import { useFieldArray } from "react-hook-form";
import { sectionStyle, sectionTitleStyle } from "./styles";

function InvoiceItems(): React.ReactElement {
  const {
    form: { control },
    isEditing,
  } = useInvoiceForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <Paper sx={sectionStyle}>
      <Typography variant="h6" sx={sectionTitleStyle}>
        Invoice Items
      </Typography>

      {fields.map((field, index) => (
        <Box
          key={field.id}
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr auto",
            gap: 2,
            mb: 2,
            alignItems: "start",
          }}
        >
          <RHFTextField
            name={`items.${index}.description`}
            label="Description"
            control={control}
            disabled={!isEditing}
          />
          <RHFTextField
            name={`items.${index}.quantity`}
            label="Quantity"
            type="number"
            control={control}
            disabled={!isEditing}
          />
          <RHFTextField
            name={`items.${index}.price`}
            label="Price"
            type="number"
            control={control}
            disabled={!isEditing}
          />
          {isEditing && (
            <IconButton
              onClick={() => remove(index)}
              sx={{ mt: 1 }}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}

      {isEditing && (
        <Button
          variant="outlined"
          onClick={() =>
            append({ id: Date.now(), description: "", quantity: 0, price: 0 })
          }
          sx={{ mt: 2 }}
        >
          Add Item
        </Button>
      )}
    </Paper>
  );
}

export default InvoiceItems;
