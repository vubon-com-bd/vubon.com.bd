import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface ProductSnapshot {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly currency: string;
  readonly available: boolean;
  readonly stockQuantity: number;
  readonly vendorId: string | null;
}

@Injectable()
export class ProductClient {
  private readonly logger = new Logger(ProductClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env['PRODUCT_SERVICE_URL'] ?? 'http://localhost:3004';
    this.http = axios.create({
      baseURL,
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getById(productId: string): Promise<ProductSnapshot | null> {
    try {
      const { data } = await this.http.get<ProductSnapshot>(`/api/v1/products/${productId}`);
      return data;
    } catch (error) {
      this.logger.warn(`Product fetch failed for ${productId}`);
      return null;
    }
  }

  async getPrices(productIds: readonly string[]): Promise<Record<string, number>> {
    if (productIds.length === 0) return {};
    try {
      const { data } = await this.http.post<Record<string, number>>(
        '/api/v1/products/prices',
        { ids: productIds },
      );
      return data;
    } catch {
      this.logger.warn('Bulk price fetch failed');
      return {};
    }
  }

  async getStock(productIds: readonly string[]): Promise<Record<string, number>> {
    if (productIds.length === 0) return {};
    try {
      const { data } = await this.http.post<Record<string, number>>(
        '/api/v1/products/stock',
        { ids: productIds },
      );
      return data;
    } catch {
      return {};
    }
  }
}
