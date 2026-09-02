import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';

export interface GatewayRequest {
  gateway: 'sslcommerz' | 'bkash' | 'nagad' | 'rocket';
  action: 'initiate' | 'execute' | 'query' | 'refund';
  payload: Record<string, unknown>;
}

export interface GatewayResponse {
  id: string;
  gateway: string;
  transactionId: string;
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  amount: number;
  currency: string;
  redirectUrl?: string;
  paymentUrl?: string;
  response: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentGatewayConfig {
  gateway: string;
  enabled: boolean;
  config: Record<string, unknown>;
  sandbox: boolean;
}

export interface GatewayWebhook {
  id: string;
  gateway: string;
  event: string;
  data: Record<string, unknown>;
  status: 'pending' | 'processed' | 'failed';
  createdAt: string;
  processedAt?: string;
}

export class GatewayEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  async initiatePayment(data: GatewayRequest): Promise<GatewayResponse> {
    return this.client.post<GatewayResponse>('/gateway/initiate', data);
  }

  async executePayment(gateway: string, paymentId: string): Promise<GatewayResponse> {
    return this.client.post<GatewayResponse>(`/gateway/${gateway}/execute`, { paymentId });
  }

  async queryPayment(gateway: string, transactionId: string): Promise<GatewayResponse> {
    return this.client.get<GatewayResponse>(`/gateway/${gateway}/query/${transactionId}`);
  }

  async refundPayment(
    gateway: string,
    transactionId: string,
    amount: number,
    reason?: string
  ): Promise<GatewayResponse> {
    return this.client.post<GatewayResponse>(`/gateway/${gateway}/refund`, {
      transactionId,
      amount,
      reason,
    });
  }

  async getPaymentStatus(gateway: string, transactionId: string): Promise<GatewayResponse> {
    return this.client.get<GatewayResponse>(`/gateway/${gateway}/status/${transactionId}`);
  }

  async getGatewayConfig(gateway: string): Promise<PaymentGatewayConfig> {
    return this.client.get<PaymentGatewayConfig>(`/gateway/${gateway}/config`);
  }

  async updateGatewayConfig(
    gateway: string,
    config: Partial<PaymentGatewayConfig>
  ): Promise<PaymentGatewayConfig> {
    return this.client.patch<PaymentGatewayConfig>(`/gateway/${gateway}/config`, config);
  }

  async getGatewayWebhooks(gateway: string): Promise<GatewayWebhook[]> {
    return this.client.get<GatewayWebhook[]>(`/gateway/${gateway}/webhooks`);
  }

  async getSupportedGateways(): Promise<{ gateway: string; enabled: boolean; sandbox: boolean }[]> {
    return this.client.get('/gateway/supported');
  }

  async testGatewayConnection(gateway: string): Promise<{ success: boolean; message: string }> {
    return this.client.post<{ success: boolean; message: string }>(`/gateway/${gateway}/test`);
  }
}
