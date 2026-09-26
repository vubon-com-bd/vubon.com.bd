import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import type { PaymentClient } from '../../../application/ports';

interface PaymentResponse {
  readonly id: string;
  readonly amount: number;
  readonly status: string;
}

@Injectable()
export class PaymentHttpClient implements PaymentClient {
  private readonly logger = new Logger(PaymentHttpClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env.PAYMENT_SERVICE_URL ?? 'http://payment-service:3000';
    this.http = axios.create({
      baseURL,
      timeout: 5000,
      headers: { 'X-Internal-Caller': 'analytics-service' },
    });
  }

  async getById(paymentId: string): Promise<PaymentResponse | null> {
    try {
      const { data } = await this.http.get<PaymentResponse>(`/payments/${paymentId}`);
      return data;
    } catch (error) {
      this.logger.warn(`Failed to fetch payment ${paymentId}: ${String(error)}`);
      return null;
    }
  }
}
