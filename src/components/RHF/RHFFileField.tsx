import { Box, Typography, IconButton } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";

interface RHFFileFieldProps {
  name: string;
  label: string;
  control: Control<any>;
  disabled?: boolean;
}

function RHFFileField({
  name,
  label,
  control,
  disabled = false,
}: RHFFileFieldProps): React.ReactNode {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        useEffect(() => {
          if (value && !preview) {
            setPreview(value);
          }
        }, [value]);

        return (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {label}
            </Typography>
            <Box
              sx={{
                border: "2px dashed",
                borderColor: "primary.main",
                borderRadius: 1,
                p: 2,
                textAlign: "center",
                cursor: disabled ? "not-allowed" : "pointer",
                bgcolor: "background.paper",
                position: "relative",
                "&:hover": {
                  bgcolor: disabled ? "background.paper" : "action.hover",
                },
              }}
            >
              {preview ? (
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "150px",
                      objectFit: "contain",
                    }}
                  />
                  {!disabled && (
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: -12,
                        right: -12,
                        bgcolor: "background.paper",
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange("");
                        setPreview(null);
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const result = reader.result as string;
                          onChange(result);
                          setPreview(result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    disabled={disabled}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: disabled ? "not-allowed" : "pointer",
                    }}
                  />
                  <CloudUploadIcon
                    sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
                  />
                  <Typography>
                    {disabled
                      ? "File upload disabled"
                      : "Click or drag to upload signature"}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        );
      }}
    />
  );
}

export default RHFFileField;
