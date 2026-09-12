export interface SSLCommerzResponse {
  status?: string;
  transactionId?: string;
}

export interface SSLCommerzData {
  amount: number;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export const validateSSLCommerzResponse = (response: SSLCommerzResponse): boolean => {
  return response.status === 'success' && !!response.transactionId;
};

export const prepareSSLCommerzData = (data: SSLCommerzData): Record<string, unknown> => {
  return {
    total_amount: data.amount,
    tran_id: data.orderId,
    cus_name: data.customerName,
    cus_email: data.customerEmail,
    cus_phone: data.customerPhone,
  };
};
