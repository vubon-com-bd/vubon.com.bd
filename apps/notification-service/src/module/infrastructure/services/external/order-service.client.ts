/**
 * OrderServiceClient — cross-service calls to order-service
 * @module notification-service/infrastructure/services/external
 */
import { Injectable } from '@nestjs/common';
import { BaseHttpClient } from './http-client.client.js';

export const ORDER_SERVICE_CLIENT = Symbol('ORDER_SERVICE_CLIENT');

export interface OrderSummary {
  readonly id: string;
  readonly orderNumber: string;
  readonly customerId: string;
  readonly status: string;
  readonly total: number;
  readonly currency: string;
  readonly createdAt: string;
}

@Injectable()
export class OrderServiceClient extends BaseHttpClient {
  constructor() {
    super({
      name: 'OrderServiceClient',
      envKey: 'ORDER_SERVICE_URL',
      defaultTimeoutMs: 8_000,
    });
  }

  async getOrder(orderId: string): Promise<OrderSummary | null> {
    return this.get<OrderSummary>(`/api/v1/orders/${orderId}`);
  }

  async getOrderSummaryForNotification(orderId: string): Promise<{
    orderNumber: string;
    customerName?: string;
    total: string;
  } | null> {
    const order = await this.getOrder(orderId);
    if (!order) return null;
    return {
      orderNumber: order.orderNumber,
      total: `${order.total} ${order.currency}`,
    };
  }
}
