export interface CreateGatewayPaymentInput {
  readonly paymentId: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly callbackUrl?: string;
  readonly returnUrl?: string;
  readonly idempotencyKey?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface GatewayPaymentResult {
  readonly gatewayReference: string;
  readonly redirectUrl?: string;
  readonly status: string;
  readonly rawResponse?: Readonly<Record<string, unknown>>;
}

export interface CaptureGatewayPaymentInput {
  readonly gatewayReference: string;
  readonly amount?: number;
  readonly idempotencyKey?: string;
}

export interface CaptureGatewayResult {
  readonly success: boolean;
  readonly capturedAmount?: number;
  readonly gatewayTransactionId?: string;
  readonly rawResponse?: Readonly<Record<string, unknown>>;
}

export interface RefundGatewayPaymentInput {
  readonly gatewayReference: string;
  readonly amount: number;
  readonly currency: string;
  readonly reason?: string;
  readonly idempotencyKey?: string;
}

export interface RefundGatewayResult {
  readonly success: boolean;
  readonly gatewayRefundId?: string;
  readonly refundedAmount?: number;
  readonly rawResponse?: Readonly<Record<string, unknown>>;
}

export interface WebhookInput {
  readonly rawBody: string;
  readonly signature: string;
  readonly headers?: Readonly<Record<string, string>>;
  readonly payload?: Readonly<Record<string, unknown>>;
}

export interface WebhookResult {
  readonly gatewayReference: string;
  readonly status: string;
  readonly amount?: number;
  readonly currency?: string;
  readonly gatewayTransactionId?: string;
  readonly rawPayload?: Readonly<Record<string, unknown>>;
}
