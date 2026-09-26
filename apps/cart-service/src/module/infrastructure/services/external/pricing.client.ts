import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface PriceQuote {
  readonly productId: string;
  readonly unitPrice: number;
  readonly currency: string;
}

@Injectable()
export class PricingClient {
  private readonly logger = new Logger(PricingClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env['PRODUCT_SERVICE_URL'] ?? 'http://localhost:3004';
    this.http = axios.create({ baseURL, timeout: 5000 });
  }

  async quote(productId: string, quantity: number): Promise<PriceQuote | null> {
    try {
      const { data } = await this.http.get<PriceQuote>(
        `/api/v1/products/${productId}/price`,
        { params: { quantity } },
      );
      return data;
    } catch {
      this.logger.warn(`Pricing quote failed for ${productId}`);
      return null;
    }
  }
}
