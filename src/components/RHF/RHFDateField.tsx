import { Control, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

interface RHFDateFieldProps extends Omit<TextFieldProps, "name" | "type"> {
  name: string;
  control: Control<any>;
  slotProps?: TextFieldProps["slotProps"];
}

function RHFDateField({
  name,
  control,
  slotProps: providedSlotProps,
  ...other
}: RHFDateFieldProps): React.ReactElement {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...other}
          type="date"
          error={!!error}
          helperText={error?.message}
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
              ...(providedSlotProps?.inputLabel ?? {}),
            },
            ...(providedSlotProps ?? {}),
          }}
        />
      )}
    />
  );
}

export default RHFDateField;
