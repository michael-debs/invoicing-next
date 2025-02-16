import { Control, Controller } from 'react-hook-form'
import { TextField, TextFieldProps } from '@mui/material'

interface RHFTextFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string
  control: Control<any>
}

function RHFTextField({
  name,
  control,
  ...other
}: RHFTextFieldProps): React.ReactElement {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...other}
          error={!!error}
          helperText={error?.message}
          fullWidth
        />
      )}
    />
  )
}

export default RHFTextField 