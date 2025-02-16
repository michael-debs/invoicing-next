export type Invoice = {
  id?: number;
  clientName: string;
  date: string;
  status: string;
  total: number;
  fromName: string;
  fromEmail: string;
  fromPhone: string;
  fromAddress: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  paymentBankName: string;
  paymentAccountNo: string;
};

export type InvoiceItem = {
  id?: number;
  invoiceId?: number;
  description: string;
  quantity: number;
  price: number;
};
