export interface AbandonedCartResponseDTO {
  readonly id: string;
  readonly cartId: string;
  readonly userId?: string;
  readonly itemCount: number;
  readonly subtotalAmount: number;
  readonly currency: string;
  readonly status: string;
  readonly reminderCount: number;
  readonly abandonedAt: string;
  readonly recoveredAt?: string;
}
