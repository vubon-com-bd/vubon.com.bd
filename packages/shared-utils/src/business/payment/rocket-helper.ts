export interface RocketResponse {
  status?: string;
  transactionId?: string;
}

export interface RocketData {
  amount: number;
  orderId: string;
  customerNumber: string;
}

export const validateRocketResponse = (response: RocketResponse): boolean => {
  return response.status === 'success' && !!response.transactionId;
};

export const prepareRocketData = (data: RocketData): Record<string, unknown> => {
  return {
    amount: data.amount,
    referenceId: data.orderId,
    customerNumber: data.customerNumber,
  };
};
