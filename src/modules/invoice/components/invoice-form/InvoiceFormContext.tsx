"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { UseFormReturn, useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { InvoiceItem } from "@prisma/client";
import { type Invoice } from "@/lib/db";
import { updateInvoice } from "@/modules/invoice/server/updateInvoice";
import { createInvoice } from "@/modules/invoice/server/createInvoice";
import { getInvoiceById } from "@/modules/invoice/server/getInvoiceById";

interface InvoiceFormItem {
  id?: number;
  description: string;
  quantity: number;
  price: number;
}

interface InvoiceFormData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  companyName: string;
  partnershipNumber?: string | null;
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
  items: InvoiceFormItem[];
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
  initialData?: InvoiceFormData;
}

function InvoiceFormProvider({
  children,
  mode = "create",
  invoiceId,
  initialData,
}: InvoiceFormProviderProps) {
  const [isEditing, setIsEditing] = useState(mode === "create");
  const [initialValues, setInitialValues] = useState<InvoiceFormData | null>(
    initialData || null
  );
  const router = useRouter();

  const form = useForm<InvoiceFormData>({
    defaultValues: initialData,
    mode: "onChange",
    resolver: async (values) => {
      const errors: Record<string, { type: string; message: string }> = {};

      if (!values.invoiceNumber) {
        errors.invoiceNumber = {
          type: "required",
          message: "Invoice number is required",
        };
      }

      if (!values.companyName) {
        errors.companyName = {
          type: "required",
          message: "Company name is required",
        };
      }

      if (!values.items || values.items.length === 0) {
        errors.items = {
          type: "required",
          message: "At least one item is required",
        };
      } else {
        values.items.forEach((item, index) => {
          if (!item.description) {
            errors[`items.${index}.description`] = {
              type: "required",
              message: "Description is required",
            };
          }

          const quantity = Number(item.quantity);
          const price = Number(item.price);

          if (isNaN(quantity) || quantity <= 0) {
            errors[`items.${index}.quantity`] = {
              type: "invalid",
              message: "Quantity must be a positive number",
            };
          }

          if (isNaN(price) || price <= 0) {
            errors[`items.${index}.price`] = {
              type: "invalid",
              message: "Price must be a positive number",
            };
          }
        });
      }

      return {
        values,
        errors,
      };
    },
  });

  const fetchInvoice = async (id: number) => {
    try {
      const invoice = await getInvoiceById(id);

      const formData: InvoiceFormData = {
        invoiceNumber: invoice.invoiceNumber,
        date: invoice.date,
        dueDate: invoice.dueDate,
        companyName: invoice.companyName,
        partnershipNumber: invoice.partnershipNumber,
        clientAddress: invoice.clientAddress,
        clientEmail: invoice.clientEmail,
        clientPhone: invoice.clientPhone,
        userFullName: invoice.userFullName,
        userAddress: invoice.userAddress,
        userEmail: invoice.userEmail,
        userPhone: invoice.userPhone,
        userSignature: invoice.userSignature,
        bankName: invoice.bankName,
        accountName: invoice.accountName,
        accountNumber: invoice.accountNumber,
        sortCode: invoice.sortCode,
        iban: invoice.iban,
        swift: invoice.swift,
        items: invoice.items.map((item: InvoiceItem) => ({
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
          form.setValue(key as keyof InvoiceFormData, value);
        }
      });
      form.setValue("items", formData.items);
    } catch (error) {
      console.error("Failed to fetch invoice:", error);
      alert("Failed to fetch invoice: " + (error as Error).message);
    }
  };

  const calculateTotal = (items: InvoiceFormItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const saveInvoice = async (data: InvoiceFormData) => {
    try {
      // Validate required fields
      if (!data || !data.items || !data.invoiceNumber || !data.companyName) {
        throw new Error("Missing required fields");
      }

      const { items, partnershipNumber, ...rest } = data;
      const invoiceData: Omit<Invoice, "id"> = {
        ...rest,
        partnershipNumber: partnershipNumber ?? null,
        total: calculateTotal(items),
      };

      // Validate items
      if (!Array.isArray(items) || items.length === 0) {
        throw new Error("At least one invoice item is required");
      }

      const invoiceItems: Omit<InvoiceItem, "id" | "invoiceId">[] = items.map(
        (item: InvoiceFormItem) => {
          if (!item.description) {
            throw new Error("Invalid item data: Description is required");
          }

          const quantity = Number(item.quantity);
          const price = Number(item.price);

          if (isNaN(quantity) || quantity <= 0) {
            throw new Error(
              "Invalid item data: Quantity must be a positive number"
            );
          }

          if (isNaN(price) || price <= 0) {
            throw new Error(
              "Invalid item data: Price must be a positive number"
            );
          }

          return {
            description: item.description,
            quantity: quantity,
            price: price,
          };
        }
      );

      if (invoiceId) {
        await updateInvoice({
          id: Number(invoiceId),
          invoice: invoiceData,
          items: invoiceItems,
        });
      } else {
        await createInvoice({
          invoice: invoiceData,
          items: invoiceItems,
        });
      }
      router.push("/invoices");
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
