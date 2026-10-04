export interface DeliveryResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly deliveryMethodId?: string;
  readonly status: string;
  readonly type: string;
  readonly trackingNumber?: string;
  readonly courierId?: string;
  readonly estimatedAt?: string;
  readonly deliveredAt?: string;
  readonly attempts: number;
  readonly notes?: string;
  readonly isInTransit: boolean;
  readonly isComplete: boolean;
  readonly canRetry: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
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
  readonly isFree: boolean;
  readonly isFast: boolean;
}
