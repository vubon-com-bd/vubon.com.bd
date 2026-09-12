export interface BkashResponse {
  statusCode?: string;
  transactionId?: string;
}

export interface BkashData {
  amount: number;
  orderId: string;
  customerNumber: string;
}

export const validateBkashResponse = (response: BkashResponse): boolean => {
  return response.statusCode === '0000' && !!response.transactionId;
};

export const prepareBkashData = (data: BkashData): Record<string, unknown> => {
  return {
    amount: data.amount,
    merchantInvoiceNumber: data.orderId,
    customerNumber: data.customerNumber,
  };
};
