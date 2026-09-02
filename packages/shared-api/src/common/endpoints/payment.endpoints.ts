import { ApiClient } from '../api-client';

export interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  successUrl?: string;
  failUrl?: string;
  cancelUrl?: string;
  ipnUrl?: string;
}

export interface PaymentResponse {
  transactionId: string;
  paymentUrl: string;
  gateway: 'sslcommerz' | 'bkash' | 'nagad' | 'rocket';
  status: 'pending' | 'success' | 'failed';
}

export interface SSLCommerzRequest extends PaymentRequest {
  storeId: string;
  storePassword: string;
}

export interface BkashRequest {
  amount: number;
  merchantInvoiceNumber: string;
  payerReference?: string;
  callbackURL: string;
}

export interface NagadRequest {
  amount: number;
  orderId: string;
  productName: string;
  callbackURL: string;
}

export interface RocketRequest {
  amount: number;
  merchantInvoiceNumber: string;
  reference?: string;
  callbackURL: string;
}

export interface PaymentVerificationRequest {
  transactionId: string;
  gateway: 'sslcommerz' | 'bkash' | 'nagad' | 'rocket';
}

export interface PaymentVerificationResponse {
  transactionId: string;
  status: 'pending' | 'success' | 'failed';
  amount: number;
  currency: string;
  paymentDate: string;
  gateway: string;
  reference?: string;
}

export class PaymentEndpoints {
  constructor(private client: ApiClient) {}

  // SSLCommerz
  async initiateSSLCommerz(data: PaymentRequest): Promise<PaymentResponse> {
    return this.client.post<PaymentResponse>('/payments/sslcommerz/initiate', data);
  }

  async verifySSLCommerz(data: PaymentVerificationRequest): Promise<PaymentVerificationResponse> {
    return this.client.post<PaymentVerificationResponse>('/payments/sslcommerz/verify', data);
  }

  async sslcommerzIPN(data: unknown): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/payments/sslcommerz/ipn', data);
  }

  // bKash
  async initiateBkash(data: BkashRequest): Promise<PaymentResponse> {
    return this.client.post<PaymentResponse>('/payments/bkash/initiate', data);
  }

  async executeBkash(paymentId: string): Promise<PaymentVerificationResponse> {
    return this.client.post<PaymentVerificationResponse>(`/payments/bkash/execute/${paymentId}`);
  }

  async verifyBkash(data: PaymentVerificationRequest): Promise<PaymentVerificationResponse> {
    return this.client.post<PaymentVerificationResponse>('/payments/bkash/verify', data);
  }

  // Nagad
  async initiateNagad(data: NagadRequest): Promise<PaymentResponse> {
    return this.client.post<PaymentResponse>('/payments/nagad/initiate', data);
  }

  async verifyNagad(data: PaymentVerificationRequest): Promise<PaymentVerificationResponse> {
    return this.client.post<PaymentVerificationResponse>('/payments/nagad/verify', data);
  }

  // Rocket
  async initiateRocket(data: RocketRequest): Promise<PaymentResponse> {
    return this.client.post<PaymentResponse>('/payments/rocket/initiate', data);
  }

  async verifyRocket(data: PaymentVerificationRequest): Promise<PaymentVerificationResponse> {
    return this.client.post<PaymentVerificationResponse>('/payments/rocket/verify', data);
  }

  // Generic methods
  async getPaymentStatus(transactionId: string): Promise<PaymentVerificationResponse> {
    return this.client.get<PaymentVerificationResponse>(`/payments/status/${transactionId}`);
  }

  async refundPayment(
    transactionId: string,
    amount: number,
    reason?: string
  ): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/payments/refund/${transactionId}`, {
      amount,
      reason,
    });
  }
}
