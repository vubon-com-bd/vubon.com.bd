import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { RocketConfig } from './rocket.config';
import type {
  RocketCreatePaymentRequest,
  RocketCreatePaymentResponse,
  RocketVerifyPaymentResponse,
  RocketRefundResponse,
} from './rocket.types';

@Injectable()
export class RocketClient {
  private readonly logger = new Logger(RocketClient.name);
  private readonly http: AxiosInstance;

  constructor(private readonly config: RocketConfig) {
    this.http = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeoutMs,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': this.config.apiKey,
      },
    });
  }

  async createPayment(
    input: RocketCreatePaymentRequest,
  ): Promise<RocketCreatePaymentResponse> {
    const { data } = await this.http.post<RocketCreatePaymentResponse>(
      '/payments/create',
      input,
    );
    return data;
  }

  async verifyPayment(transactionId: string): Promise<RocketVerifyPaymentResponse> {
    const { data } = await this.http.get<RocketVerifyPaymentResponse>(
      `/payments/${transactionId}`,
    );
    return data;
  }

  async refund(transactionId: string, amount: string): Promise<RocketRefundResponse> {
    const { data } = await this.http.post<RocketRefundResponse>(
      `/payments/${transactionId}/refund`,
      { amount },
    );
    return data;
  }
}
