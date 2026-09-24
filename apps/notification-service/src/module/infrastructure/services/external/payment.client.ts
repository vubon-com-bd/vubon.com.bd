import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface PaymentPublic {
  readonly id: string;
  readonly orderId: string;
  readonly status: string;
  readonly amount: number;
}

@Injectable()
export class PaymentClient {
  private readonly logger = new Logger(PaymentClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env.PAYMENT_SERVICE_URL ?? 'http://localhost:3006';
    this.http = axios.create({ baseURL, timeout: 5000 });
  }

  async getById(paymentId: string): Promise<PaymentPublic | null> {
    try {
      const { data } = await this.http.get<PaymentPublic>(`/payments/${paymentId}`);
      return data;
    } catch {
      this.logger.warn(`Payment ${paymentId} not found`);
      return null;
    }
  }
}
