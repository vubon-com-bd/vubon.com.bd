export interface CheckoutInitiateRequest {
  readonly cartId: string;
  readonly addressId: string;
  readonly paymentMethod: string;
  readonly notes?: string;
}

export interface CheckoutSession {
  readonly sessionId: string;
  readonly total: number;
  readonly currency: string;
  readonly expiresAt: string;
}

export interface CheckoutConfirmRequest {
  readonly sessionId: string;
  readonly paymentIntentId: string;
}

export interface CheckoutConfirmResponse {
  readonly orderId: string;
  readonly orderNumber: string;
  readonly status: string;
}
