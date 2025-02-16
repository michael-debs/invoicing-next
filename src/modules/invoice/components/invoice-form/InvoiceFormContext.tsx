import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { UseFormReturn, useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { InvoiceItem } from "../../types";
import { db, type Invoice } from "@/lib/db";

interface InvoiceFormData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  companyName: string;
  partnershipNumber: string;
  clientAddress: string;
  clientEmail: string;
  clientPhone: string;
  userFullName: string;
  userAddress: string;
  userEmail: string;
  userPhone: string;
  userSignature: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  sortCode: string;
  iban: string;
  swift: string;
  items: Array<{
    id: number;
    description: string;
    quantity: number;
    price: number;
  }>;
}

interface InvoiceFormContextValue {
  form: UseFormReturn<InvoiceFormData>;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  mode: "create" | "view" | "edit";
  fetchInvoice: (id: number) => Promise<void>;
  saveInvoice: (data: InvoiceFormData) => Promise<void>;
  initialValues: InvoiceFormData | null;
}

const InvoiceFormContext = createContext<InvoiceFormContextValue | undefined>(
  undefined
);

interface InvoiceFormProviderProps {
  children: ReactNode;
  mode?: "create" | "view" | "edit";
  invoiceId?: string;
}

function InvoiceFormProvider({
  children,
  mode = "create",
  invoiceId,
}: InvoiceFormProviderProps) {
  const [isEditing, setIsEditing] = useState(mode === "create");
  const [initialValues, setInitialValues] = useState<InvoiceFormData | null>(
    null
  );
  const router = useRouter();

  const form = useForm<InvoiceFormData>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      items: [],
    },
  });

  const fetchInvoice = async (id: number) => {
    try {
      const invoice = await db.getInvoice(id);
      if (!invoice) {
        throw new Error("Invoice not found");
      }

      const formData: InvoiceFormData = {
        ...invoice,
        items: invoice.items.map((item) => ({
          id: item.id,
          description: item.description,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      setInitialValues(formData);

      // Update form values
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "items") {
          form.setValue(key as keyof InvoiceFormData, value as string);
        }
      });
      form.setValue("items", formData.items);
    } catch (error) {
      console.error("Failed to fetch invoice:", error);
    }
  };

  const calculateTotal = (items: InvoiceItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const saveInvoice = async (data: InvoiceFormData) => {
    try {
      const invoiceData = {
        clientName: data.companyName,
        date: data.date,
        status: "pending",
        total: calculateTotal(data.items),
        fromName: data.userFullName,
        fromEmail: data.userEmail,
        fromPhone: data.userPhone,
        fromAddress: data.userAddress,
        toName: data.companyName,
        toEmail: data.clientEmail,
        toAddress: data.clientAddress,
        paymentBankName: data.bankName,
        paymentAccountNo: data.accountNumber,
      };

      if (invoiceId) {
        // TODO: Implement update invoice
      } else {
        // TODO: Implement create invoice
      }
      router.push("/");
    } catch (error) {
      console.error("Failed to save invoice:", error);
      alert("Failed to save invoice: " + (error as Error).message);
    }
  };

  useEffect(() => {
    if (invoiceId) {
      fetchInvoice(parseInt(invoiceId));
    }
  }, [invoiceId]);

  return (
    <InvoiceFormContext.Provider
      value={{
        form,
        isEditing,
        setIsEditing,
        mode,
        fetchInvoice,
        saveInvoice,
        initialValues,
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </InvoiceFormContext.Provider>
  );
}

function useInvoiceForm() {
  const context = useContext(InvoiceFormContext);
  if (!context) {
    throw new Error("useInvoiceForm must be used within InvoiceFormProvider");
  }
  return context;
}

export type { InvoiceFormData };
export { InvoiceFormProvider, useInvoiceForm };
