import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface OrderPublic {
  readonly id: string;
  readonly userId: string;
  readonly total: number;
}

@Injectable()
export class OrderClient {
  private readonly baseUrl = getOptionalEnv('ORDER_SERVICE_URL', 'http://localhost:3003/api/v1');

  constructor(private readonly http: HttpService) {}

  async findById(orderId: string): Promise<OrderPublic | null> {
    try {
      const { data } = await firstValueFrom(
        this.http.get<OrderPublic>(`${this.baseUrl}/orders/${orderId}`),
      );
      return data;
    } catch {
      return null;
    }
  }
}
