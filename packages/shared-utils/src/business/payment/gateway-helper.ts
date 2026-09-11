export interface GatewayResponseData {
  status?: string;
  transactionId?: string;
  errorMessage?: string;
  gatewayResponse?: Record<string, unknown>;
}

export const getGatewayResponse = (data: GatewayResponseData): Record<string, unknown> | null => {
  return data.gatewayResponse || null;
};

export const getGatewayError = (data: GatewayResponseData): string | null => {
  return data.errorMessage || null;
};

export const isGatewayResponseValid = (response: GatewayResponseData): boolean => {
  return response.status === 'success';
};
