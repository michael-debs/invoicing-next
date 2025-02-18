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
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => {
        // Ensure we have a proper date string format (YYYY-MM-DD)
        const dateValue = value
          ? new Date(value).toISOString().split("T")[0]
          : "";

        return (
          <TextField
            {...field}
            {...other}
            value={dateValue}
            onChange={(e) => {
              const newValue = e.target.value;
              onChange(newValue ? new Date(newValue).toISOString() : "");
            }}
            type="date"
            error={!!error}
            helperText={error?.message}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
                ...(providedSlotProps?.inputLabel ?? {}),
              },
              ...(providedSlotProps ?? {}),
            }}
          />
        );
      }}
    />
  );
}

export default RHFDateField;
