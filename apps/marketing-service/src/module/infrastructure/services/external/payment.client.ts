import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface PaymentPublic {
  readonly id: string;
  readonly orderId: string;
  readonly amount: number;
  readonly status: string;
}

@Injectable()
export class PaymentClient {
  private readonly baseUrl = getOptionalEnv('PAYMENT_SERVICE_URL', 'http://localhost:3006/api/v1');

  constructor(private readonly http: HttpService) {}

  async findByOrder(orderId: string): Promise<PaymentPublic | null> {
    try {
      const { data } = await firstValueFrom(
        this.http.get<PaymentPublic>(`${this.baseUrl}/payments/order/${orderId}`),
      );
      return data;
    } catch {
      return null;
    }
  }
}
