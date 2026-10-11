/**
 * ProductServiceClient — cross-service calls to product-service
 * @module notification-service/infrastructure/services/external
 */
import { Injectable } from '@nestjs/common';
import { BaseHttpClient } from './http-client.client.js';

export const PRODUCT_SERVICE_CLIENT = Symbol('PRODUCT_SERVICE_CLIENT');

export interface ProductSummary {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly thumbnailUrl?: string;
  readonly price: number;
  readonly currency: string;
}

@Injectable()
export class ProductServiceClient extends BaseHttpClient {
  constructor() {
    super({
      name: 'ProductServiceClient',
      envKey: 'PRODUCT_SERVICE_URL',
      defaultTimeoutMs: 8_000,
    });
  }

  async getProduct(productId: string): Promise<ProductSummary | null> {
    return this.get<ProductSummary>(`/api/v1/products/${productId}`);
  }
}
