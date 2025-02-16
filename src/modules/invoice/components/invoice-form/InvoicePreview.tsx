import { Box, Paper, Typography, IconButton, Button } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import DownloadIcon from '@mui/icons-material/Download'
import InvoicePDF from '../InvoicePDF'
import { InvoiceFormData, useInvoiceForm } from './InvoiceFormContext'
import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { pdf, PDFViewer } from '@react-pdf/renderer'

function InvoicePreview(): JSX.Element {
  const { getValues } = useFormContext()
  const { initialValues } = useInvoiceForm()
  useEffect(() => {
    if (initialValues) {
      setValues(initialValues)
    }
  }, [initialValues])
  const [values, setValues] = useState<Partial<InvoiceFormData>>({
    items: [],
    companyName: '',
    clientAddress: '',
    clientEmail: '',
    clientPhone: '',
    invoiceNumber: '',
    date: '',
    dueDate: '',
    userFullName: '',
    userAddress: '',
    userEmail: '',
    userPhone: '',
    userSignature: ''
  })
  const calculateTotal = (items: typeof values.items = []) => {
    return items.reduce((sum, item) => sum + (item.quantity || 0) * (item.price || 0), 0)
  }

  function handleRefresh() {
    setValues(getValues())
  }

  async function handleDownload() {
    const invoiceData = {
      ...values,
      total: calculateTotal(values.items),
      paymentMethod: {
        bankName: values.bankName || '',
        accountNo: values.accountNumber || ''
      }
    }

    try {
      // Generate PDF blob
      const blob = await pdf(<InvoicePDF invoice={invoiceData} />).toBlob()

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `invoice-${invoiceData.invoiceNumber || 'draft'}.pdf`

      // Trigger download
      document.body.appendChild(link)
      link.click()

      // Cleanup
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  return (
    <Paper
      sx={{
        flex: 1,
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        border: '1px solid #e2e8f0'
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#1a237e',
            fontWeight: 600
          }}
        >
          Preview
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<DownloadIcon />}
            variant="contained"
            size="small"
            onClick={handleDownload}
          >
            Download
          </Button>
          <IconButton onClick={handleRefresh} size="small" color="primary">
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <PDFViewer
          showToolbar={false}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            minHeight: '500px'
          }}
        >
          <InvoicePDF
            invoice={{
              ...values,
              total: calculateTotal(values.items),
              paymentMethod: {
                bankName: values.bankName || '',
                accountNo: values.accountNumber || ''
              }
            }}
          />
        </PDFViewer>
      </Box>
    </Paper>
  )
}

export default InvoicePreview
