export interface CodCreatePaymentRequest {
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly customerName: string;
  readonly customerPhone: string;
  readonly deliveryAddress: string;
}

export interface CodCreatePaymentResult {
  readonly success: boolean;
  readonly trackingId: string;
  readonly message: string;
}

export interface CodConfirmDeliveryRequest {
  readonly trackingId: string;
  readonly deliveredAt: string;
  readonly receivedAmount: number;
}

export interface CodConfirmDeliveryResult {
  readonly success: boolean;
  readonly message: string;
}
