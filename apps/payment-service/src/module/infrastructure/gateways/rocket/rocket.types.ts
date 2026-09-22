export interface RocketCreatePaymentRequest {
  readonly merchantId: string;
  readonly orderId: string;
  readonly amount: string;
  readonly currency: string;
  readonly callbackUrl: string;
  readonly customerMobile?: string;
  readonly description?: string;
}

export interface RocketCreatePaymentResponse {
  readonly transactionId: string;
  readonly redirectUrl: string;
  readonly status: string;
  readonly message: string;
}

export interface RocketVerifyPaymentResponse {
  readonly transactionId: string;
  readonly orderId: string;
  readonly amount: string;
  readonly status: string;
  readonly message: string;
}

export interface RocketRefundResponse {
  readonly status: string;
  readonly refundId?: string;
  readonly amount?: string;
  readonly message: string;
}

export interface RocketWebhookBody {
  readonly transactionId: string;
  readonly orderId: string;
  readonly amount: string;
  readonly status: string;
  readonly [key: string]: unknown;
}
