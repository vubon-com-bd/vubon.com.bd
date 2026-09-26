import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

interface ProductPublic {
  readonly id: string;
  readonly name: string;
  readonly categoryId: string;
  readonly tags: readonly string[];
  readonly price: number;
}

@Injectable()
export class ProductClient {
  private readonly logger = new Logger(ProductClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: getOptionalEnv('PRODUCT_SERVICE_URL', 'http://localhost:3002'),
      timeout: getOptionalEnvInt('PRODUCT_SERVICE_TIMEOUT_MS', 5000),
    });
  }

  async findById(productId: string): Promise<ProductPublic | null> {
    try {
      const { data } = await this.http.get<ProductPublic>(`/products/${productId}`);
      return data;
    } catch (error) {
      this.logger.warn(`Product fetch failed for ${productId}`, error);
      return null;
    }
  }

  async findByIds(productIds: readonly string[]): Promise<readonly ProductPublic[]> {
    try {
      const { data } = await this.http.post<readonly ProductPublic[]>('/products/batch', {
        ids: [...productIds],
      });
      return data;
    } catch (error) {
      this.logger.warn('Product batch fetch failed', error);
      return [];
    }
  }
}
