export interface PaypalResponse {
  status?: string;
  id?: string;
}

export interface PaypalData {
  amount: number;
  currency: string;
  description: string;
}

export const validatePaypalResponse = (response: PaypalResponse): boolean => {
  return response.status === 'COMPLETED' && !!response.id;
};

export const preparePaypalData = (data: PaypalData): Record<string, unknown> => {
  return {
    amount: data.amount,
    currency: data.currency,
    description: data.description,
  };
};
