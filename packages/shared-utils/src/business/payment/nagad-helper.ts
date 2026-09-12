export interface NagadResponse {
  status?: string;
  transactionId?: string;
}

export interface NagadData {
  amount: number;
  orderId: string;
  customerNumber: string;
}

export const validateNagadResponse = (response: NagadResponse): boolean => {
  return response.status === 'success' && !!response.transactionId;
};

export const prepareNagadData = (data: NagadData): Record<string, unknown> => {
  return {
    amount: data.amount,
    orderId: data.orderId,
    customerNumber: data.customerNumber,
  };
};
