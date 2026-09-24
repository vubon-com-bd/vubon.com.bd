import { Injectable, Logger } from '@nestjs/common';
import type { ExternalClient, ClientResponse } from './http-client.types';

export interface OrderDTO {
  readonly id: string;
  readonly userId: string;
  readonly status: string;
  readonly total: number;
}

@Injectable()
export class OrderClient {
  private readonly logger = new Logger(OrderClient.name);

  constructor(private readonly http: ExternalClient) {}

  async getById(orderId: string): Promise<OrderDTO | null> {
    try {
      const res: ClientResponse<OrderDTO> = await this.http.get<OrderDTO>(
        `/orders/${orderId}`,
      );
      return res.data;
    } catch (error) {
      this.logger.warn(
        `Failed to fetch order ${orderId}: ${error instanceof Error ? error.message : 'unknown'}`,
      );
      return null;
    }
  }
}
