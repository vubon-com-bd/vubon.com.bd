import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface CartSummary {
  readonly cartId: string;
  readonly userId: string;
  readonly itemCount: number;
  readonly abandoned: boolean;
}

@Injectable()
export class CartHttpClient {
  private readonly logger = new Logger(CartHttpClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env.CART_SERVICE_URL ?? 'http://cart-service:3000';
    this.http = axios.create({
      baseURL,
      timeout: 5000,
      headers: { 'X-Internal-Caller': 'analytics-service' },
    });
  }

  async getSummary(cartId: string): Promise<CartSummary | null> {
    try {
      const { data } = await this.http.get<CartSummary>(`/carts/${cartId}`);
      return data;
    } catch (error) {
      this.logger.warn(`Failed to fetch cart ${cartId}: ${String(error)}`);
      return null;
    }
  }
}
