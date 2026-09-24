import { Injectable, Logger } from '@nestjs/common';
import type { ExternalClient, ClientResponse } from './http-client.types';

export interface PaymentDTO {
  readonly id: string;
  readonly orderId: string;
  readonly status: string;
  readonly amount: number;
}

@Injectable()
export class PaymentClient {
  private readonly logger = new Logger(PaymentClient.name);

  constructor(private readonly http: ExternalClient) {}

  async getById(paymentId: string): Promise<PaymentDTO | null> {
    try {
      const res: ClientResponse<PaymentDTO> = await this.http.get<PaymentDTO>(
        `/payments/${paymentId}`,
      );
      return res.data;
    } catch (error) {
      this.logger.warn(
        `Failed to fetch payment ${paymentId}: ${error instanceof Error ? error.message : 'unknown'}`,
      );
      return null;
    }
  }
}
