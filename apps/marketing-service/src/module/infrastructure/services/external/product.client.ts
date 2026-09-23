import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface ProductPublic {
  readonly id: string;
  readonly name: string;
  readonly price: number;
}

@Injectable()
export class ProductClient {
  private readonly baseUrl = getOptionalEnv('PRODUCT_SERVICE_URL', 'http://localhost:3002/api/v1');

  constructor(private readonly http: HttpService) {}

  async findById(productId: string): Promise<ProductPublic | null> {
    try {
      const { data } = await firstValueFrom(
        this.http.get<ProductPublic>(`${this.baseUrl}/products/${productId}`),
      );
      return data;
    } catch {
      return null;
    }
  }
}
