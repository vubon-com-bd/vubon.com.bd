import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface OrderPublic {
  readonly id: string;
  readonly userId: string;
  readonly status: string;
  readonly total: number;
}

@Injectable()
export class OrderClient {
  private readonly logger = new Logger(OrderClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env.ORDER_SERVICE_URL ?? 'http://localhost:3003';
    this.http = axios.create({ baseURL, timeout: 5000 });
  }

  async getById(orderId: string): Promise<OrderPublic | null> {
    try {
      const { data } = await this.http.get<OrderPublic>(`/orders/${orderId}`);
      return data;
    } catch {
      this.logger.warn(`Order ${orderId} not found`);
      return null;
    }
  }
}
