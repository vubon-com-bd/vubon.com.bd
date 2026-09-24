import { Injectable, Logger } from '@nestjs/common';
import type { ExternalClient, ClientResponse } from './http-client.types';

export interface ProductDTO {
  readonly id: string;
  readonly name: string;
  readonly sku: string;
}

@Injectable()
export class ProductClient {
  private readonly logger = new Logger(ProductClient.name);

  constructor(private readonly http: ExternalClient) {}

  async getById(productId: string): Promise<ProductDTO | null> {
    try {
      const res: ClientResponse<ProductDTO> = await this.http.get<ProductDTO>(
        `/products/${productId}`,
      );
      return res.data;
    } catch (error) {
      this.logger.warn(
        `Failed to fetch product ${productId}: ${error instanceof Error ? error.message : 'unknown'}`,
      );
      return null;
    }
  }
}
