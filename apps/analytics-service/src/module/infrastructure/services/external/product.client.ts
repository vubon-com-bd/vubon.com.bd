import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import type { ProductClient } from '../../../application/ports';

interface ProductResponse {
  readonly id: string;
  readonly name: string;
  readonly price: number;
}

@Injectable()
export class ProductHttpClient implements ProductClient {
  private readonly logger = new Logger(ProductHttpClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env.PRODUCT_SERVICE_URL ?? 'http://product-service:3000';
    this.http = axios.create({
      baseURL,
      timeout: 5000,
      headers: { 'X-Internal-Caller': 'analytics-service' },
    });
  }

  async getById(productId: string): Promise<ProductResponse | null> {
    try {
      const { data } = await this.http.get<ProductResponse>(`/products/${productId}`);
      return data;
    } catch (error) {
      this.logger.warn(`Failed to fetch product ${productId}: ${String(error)}`);
      return null;
    }
  }
}
