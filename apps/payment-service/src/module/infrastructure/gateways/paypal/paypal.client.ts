import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { PaypalConfig } from './paypal.config';
import type {
  PaypalCreateOrderRequest,
  PaypalOrderResponse,
  PaypalCaptureResponse,
  PaypalRefundResponse,
} from './paypal.types';

@Injectable()
export class PaypalClient {
  private readonly logger = new Logger(PaypalClient.name);
  private readonly http: AxiosInstance;
  private accessToken: string | null = null;
  private tokenExpiresAt = 0;

  constructor(private readonly config: PaypalConfig) {
    this.http = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeoutMs,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiresAt - 60_000) {
      return this.accessToken;
    }
    const auth = Buffer.from(
      `${this.config.clientId}:${this.config.clientSecret}`,
    ).toString('base64');
    const { data } = await axios.post<{
      access_token: string;
      expires_in: number;
    }>(`${this.config.baseUrl}/v1/oauth2/token`, 'grant_type=client_credentials', {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    this.accessToken = data.access_token;
    this.tokenExpiresAt = Date.now() + data.expires_in * 1000;
    return data.access_token;
  }

  async createOrder(input: PaypalCreateOrderRequest): Promise<PaypalOrderResponse> {
    const token = await this.getAccessToken();
    const { data } = await this.http.post<PaypalOrderResponse>(
      '/v2/checkout/orders',
      input,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  }

  async captureOrder(orderId: string): Promise<PaypalCaptureResponse> {
    const token = await this.getAccessToken();
    const { data } = await this.http.post<PaypalCaptureResponse>(
      `/v2/checkout/orders/${orderId}/capture`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  }

  async refundCapture(captureId: string, amount?: number, currency?: string): Promise<PaypalRefundResponse> {
    const token = await this.getAccessToken();
    const body: Record<string, unknown> = {};
    if (amount && currency) {
      body['amount'] = { value: String(amount), currency_code: currency };
    }
    const { data } = await this.http.post<PaypalRefundResponse>(
      `/v2/payments/captures/${captureId}/refund`,
      body,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data;
  }
}
