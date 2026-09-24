import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import type { OrderClient } from '../../../application/ports';

interface OrderResponse {
  readonly id: string;
  readonly userId: string;
  readonly amount: number;
  readonly status: string;
}

@Injectable()
export class OrderHttpClient implements OrderClient {
  private readonly logger = new Logger(OrderHttpClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env.ORDER_SERVICE_URL ?? 'http://order-service:3000';
    this.http = axios.create({
      baseURL,
      timeout: 5000,
      headers: { 'X-Internal-Caller': 'analytics-service' },
    });
  }

  async getById(orderId: string): Promise<OrderResponse | null> {
    try {
      const { data } = await this.http.get<OrderResponse>(`/orders/${orderId}`);
      return data;
    } catch (error) {
      this.logger.warn(`Failed to fetch order ${orderId}: ${String(error)}`);
      return null;
    }
  }
}
