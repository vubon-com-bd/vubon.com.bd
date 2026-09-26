import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface ProductPublic {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly price: number;
}

@Injectable()
export class ProductClient {
  private readonly logger = new Logger(ProductClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env.PRODUCT_SERVICE_URL ?? 'http://localhost:3004';
    this.http = axios.create({ baseURL, timeout: 5000 });
  }

  async getById(productId: string): Promise<ProductPublic | null> {
    try {
      const { data } = await this.http.get<ProductPublic>(`/products/${productId}`);
      return data;
    } catch {
      this.logger.warn(`Product ${productId} not found`);
      return null;
    }
  }
}
