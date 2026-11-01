/**
 * Delivery Response DTOs
 * @module order-service/application/dtos/responses
 */

export interface DeliveryResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly methodId: string;
  readonly status: string;
  readonly type: string;
  readonly trackingNumber?: string;
  readonly courierId?: string;
  readonly estimatedAt?: string;
  readonly deliveredAt?: string;
  readonly attempts: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface DeliverySummaryDTO {
  readonly id: string;
  readonly orderId: string;
  readonly status: string;
  readonly type: string;
  readonly trackingNumber?: string;
}

export interface DeliveryListResponseDTO {
  readonly items: readonly DeliverySummaryDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface DeliveryMethodResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly carrier?: string;
  readonly baseCost: number;
  readonly currency: string;
  readonly estimatedDays: number;
  readonly isActive: boolean;
}
