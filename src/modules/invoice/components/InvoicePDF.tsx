import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { InvoiceItem } from "../types";
import { memo } from "react";

export const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    borderBottom: "2px solid #1a237e",
    paddingBottom: 20,
  },
  title: {
    fontSize: 40,
    color: "#1a237e",
  },
  invoiceDetails: {
    alignItems: "flex-end",
  },
  invoiceNumber: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  dates: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  section: {
    marginBottom: 30,
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 40,
  },
  column: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#1a237e",
    marginBottom: 10,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    color: "#444",
    marginBottom: 4,
  },
  table: {
    marginTop: 30,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1a237e",
    padding: 10,
    borderRadius: 5,
  },
  tableHeaderText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 10,
    fontSize: 12,
  },
  col1: { width: "40%", fontSize: 12 },
  col2: { width: "20%", fontSize: 12 },
  col3: { width: "20%", fontSize: 12 },
  col4: { width: "20%", textAlign: "right", fontSize: 12 },
  totalSection: {
    marginTop: 30,
    borderTop: "1px solid #eee",
    paddingTop: 20,
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a237e",
  },
  bankDetails: {
    marginTop: 40,
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 5,
  },
  signature: {
    marginTop: 40,
    alignItems: "flex-end",
  },
  signatureImage: {
    width: 150,
    height: 60,
    marginBottom: 10,
  },
});

interface InvoicePDFProps {
  invoice: {
    companyName?: string;
    partnershipNumber?: string;
    clientAddress?: string;
    clientEmail?: string;
    clientPhone?: string;
    invoiceNumber?: string;
    date?: string;
    dueDate?: string;
    total?: number;
    userFullName?: string;
    userAddress?: string;
    userEmail?: string;
    userPhone?: string;
    userSignature?: string;
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    sortCode?: string;
    iban?: string;
    swift?: string;
    items?: Partial<InvoiceItem>[];
    paymentMethod?: {
      bankName?: string;
      accountNo?: string;
    };
  };
}

function InvoicePDF({ invoice }: InvoicePDFProps): React.ReactElement {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>INVOICE</Text>
          </View>
          {(invoice.invoiceNumber || invoice.date || invoice.dueDate) && (
            <View style={styles.invoiceDetails}>
              {invoice.invoiceNumber && (
                <Text style={styles.invoiceNumber}>
                  #{invoice.invoiceNumber}
                </Text>
              )}
              {invoice.date && (
                <Text style={styles.dates}>
                  Date: {new Date(invoice.date).toLocaleDateString()}
                </Text>
              )}
              {invoice.dueDate && (
                <Text style={styles.dates}>
                  Due Date: {new Date(invoice.dueDate).toLocaleDateString()}
                </Text>
              )}
            </View>
          )}
        </View>

        {(invoice.userFullName || invoice.companyName) && (
          <View style={styles.columns}>
            {(invoice.userFullName ||
              invoice.userAddress ||
              invoice.userEmail ||
              invoice.userPhone) && (
              <View style={styles.column}>
                <Text style={styles.sectionTitle}>From</Text>
                {invoice.userFullName && (
                  <Text style={styles.text}>{invoice.userFullName}</Text>
                )}
                {invoice.userAddress && (
                  <Text style={styles.text}>{invoice.userAddress}</Text>
                )}
                {invoice.userEmail && (
                  <Text style={styles.text}>{invoice.userEmail}</Text>
                )}
                {invoice.userPhone && (
                  <Text style={styles.text}>{invoice.userPhone}</Text>
                )}
              </View>
            )}

            {(invoice.companyName ||
              invoice.clientAddress ||
              invoice.clientEmail ||
              invoice.clientPhone) && (
              <View style={styles.column}>
                <Text style={styles.sectionTitle}>Bill To</Text>
                {invoice.companyName && (
                  <Text style={styles.text}>{invoice.companyName}</Text>
                )}
                {invoice.partnershipNumber && (
                  <Text style={styles.text}>
                    P/N: {invoice.partnershipNumber}
                  </Text>
                )}
                {invoice.clientAddress && (
                  <Text style={styles.text}>{invoice.clientAddress}</Text>
                )}
                {invoice.clientEmail && (
                  <Text style={styles.text}>{invoice.clientEmail}</Text>
                )}
                {invoice.clientPhone && (
                  <Text style={styles.text}>{invoice.clientPhone}</Text>
                )}
              </View>
            )}
          </View>
        )}

        {invoice.items && invoice.items.length > 0 && (
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.col1, styles.tableHeaderText]}>
                DESCRIPTION
              </Text>
              <Text style={[styles.col2, styles.tableHeaderText]}>DAYS</Text>
              <Text style={[styles.col3, styles.tableHeaderText]}>PRICE</Text>
              <Text style={[styles.col4, styles.tableHeaderText]}>TOTAL</Text>
            </View>

            {invoice.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.col1}>{item.description ?? "-"}</Text>
                <Text style={styles.col2}>{item.quantity ?? "-"}</Text>
                <Text style={styles.col3}>
                  {item.price ? `$${Number(item.price).toFixed(2)}` : "-"}
                </Text>
                <Text style={styles.col4}>
                  {item.quantity && item.price
                    ? `$${(Number(item.quantity) * Number(item.price)).toFixed(2)}`
                    : "-"}
                </Text>
              </View>
            ))}
          </View>
        )}

        {invoice.total !== undefined && (
          <View style={styles.totalSection}>
            <Text style={styles.totalText}>
              Total Amount: ${Number(invoice.total).toFixed(2)}
            </Text>
          </View>
        )}

        {(invoice.bankName ||
          invoice.accountName ||
          invoice.accountNumber ||
          invoice.sortCode ||
          invoice.iban ||
          invoice.swift) && (
          <View style={styles.bankDetails}>
            <Text style={styles.sectionTitle}>Payment Details</Text>
            {invoice.bankName && (
              <Text style={styles.text}>Bank: {invoice.bankName}</Text>
            )}
            {invoice.accountName && (
              <Text style={styles.text}>
                Account Name: {invoice.accountName}
              </Text>
            )}
            {invoice.accountNumber && (
              <Text style={styles.text}>
                Account Number: {invoice.accountNumber}
              </Text>
            )}
            {invoice.sortCode && (
              <Text style={styles.text}>Sort Code: {invoice.sortCode}</Text>
            )}
            {invoice.iban && (
              <Text style={styles.text}>IBAN: {invoice.iban}</Text>
            )}
            {invoice.swift && (
              <Text style={styles.text}>SWIFT: {invoice.swift}</Text>
            )}
          </View>
        )}

        {(invoice.userSignature || invoice.userFullName) && (
          <View style={styles.signature}>
            {invoice.userSignature && (
              <Image
                style={styles.signatureImage}
                src={invoice.userSignature}
              />
            )}
            {invoice.userFullName && (
              <Text style={styles.text}>{invoice.userFullName}</Text>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
}

export default memo(InvoicePDF);
