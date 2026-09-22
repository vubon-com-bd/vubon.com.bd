import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { BkashConfig } from './bkash.config';
import type {
  BkashCreatePaymentRequest,
  BkashCreatePaymentResponse,
  BkashExecutePaymentResponse,
  BkashRefundResponse,
} from './bkash.types';

@Injectable()
export class BkashClient {
  private readonly logger = new Logger(BkashClient.name);
  private readonly http: AxiosInstance;

  constructor(private readonly config: BkashConfig) {
    this.http = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeoutMs,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  private async getToken(): Promise<string> {
    const { data } = await this.http.post<{ id_token: string }>(
      '/tokenized/checkout/token/grant',
      {
        app_key: this.config.appKey,
        app_secret: this.config.appSecret,
      },
      {
        headers: {
          username: this.config.username,
          password: this.config.password,
        },
      },
    );
    return data.id_token;
  }

  async createPayment(
    input: BkashCreatePaymentRequest,
  ): Promise<BkashCreatePaymentResponse> {
    const token = await this.getToken();
    const { data } = await this.http.post<BkashCreatePaymentResponse>(
      '/tokenized/checkout/create',
      input,
      { headers: { Authorization: token, 'X-APP-Key': this.config.appKey } },
    );
    return data;
  }

  async executePayment(paymentID: string): Promise<BkashExecutePaymentResponse> {
    const token = await this.getToken();
    const { data } = await this.http.post<BkashExecutePaymentResponse>(
      '/tokenized/checkout/execute',
      { paymentID },
      { headers: { Authorization: token, 'X-APP-Key': this.config.appKey } },
    );
    return data;
  }

  async refund(paymentID: string, amount: string, trxID: string): Promise<BkashRefundResponse> {
    const token = await this.getToken();
    const { data } = await this.http.post<BkashRefundResponse>(
      '/tokenized/checkout/payment/refund',
      { paymentID, amount, trxID, sku: 'default' },
      { headers: { Authorization: token, 'X-APP-Key': this.config.appKey } },
    );
    return data;
  }
}
