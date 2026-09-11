export interface StripeResponse {
  status?: string;
  id?: string;
}

export interface StripeData {
  amount: number;
  currency: string;
  description: string;
}

export const validateStripeResponse = (response: StripeResponse): boolean => {
  return response.status === 'succeeded' && !!response.id;
};

export const prepareStripeData = (data: StripeData): Record<string, unknown> => {
  return {
    amount: data.amount * 100,
    currency: data.currency,
    description: data.description,
  };
};
