/**
 * AbandonedCartResponseDTO
 * @module cart-service/application/dtos/responses
 */
export interface AbandonedCartResponseDTO {
  readonly id: string;
  readonly cartId: string;
  readonly userId?: string;
  readonly email?: string;
  readonly status: string;
  readonly reminderType: string;
  readonly itemCount: number;
  readonly cartValue: number;
  readonly currency: string;
  readonly abandonedAt: string;
  readonly remindersSent: number;
  readonly lastReminderAt?: string;
  readonly recoveredAt?: string;
  readonly recoveredOrderId?: string;
}

export interface AbandonedCartStatsDTO {
  readonly total: number;
  readonly pending: number;
  readonly reminded: number;
  readonly recovered: number;
  readonly lost: number;
  readonly recoveryRate: number;
  readonly averageCartValue: number;
}
