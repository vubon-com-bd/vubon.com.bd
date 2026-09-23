import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface CartPublic {
  readonly id: string;
  readonly userId: string;
  readonly items: readonly unknown[];
}

@Injectable()
export class CartClient {
  private readonly baseUrl = getOptionalEnv('CART_SERVICE_URL', 'http://localhost:3004/api/v1');

  constructor(private readonly http: HttpService) {}

  async findByUser(userId: string): Promise<CartPublic | null> {
    try {
      const { data } = await firstValueFrom(
        this.http.get<CartPublic>(`${this.baseUrl}/carts/user/${userId}`),
      );
      return data;
    } catch {
      return null;
    }
  }
}
