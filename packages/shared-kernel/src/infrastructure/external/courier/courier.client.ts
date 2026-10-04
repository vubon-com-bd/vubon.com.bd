/**
 * Courier Client Types
 * @module shared-kernel/infrastructure/external/courier
 */
export interface CourierCreateShipmentInput {
  readonly orderId: string;
  readonly recipientName: string;
  readonly recipientPhone: string;
  readonly recipientAddress: string;
  readonly weightKg: number;
  readonly declaredValue?: number;
}

export interface CourierCreateShipmentResult {
  readonly success: boolean;
  readonly trackingNumber?: string;
  readonly consignmentId?: string;
  readonly error?: string;
}

export interface CourierTrackEvent {
  readonly status: string;
  readonly timestamp: string;
  readonly location?: string;
}

export interface CourierTrackResult {
  readonly success: boolean;
  readonly status?: string;
  readonly events?: readonly CourierTrackEvent[];
  readonly error?: string;
}

export interface CourierCancelResult {
  readonly success: boolean;
  readonly error?: string;
}
