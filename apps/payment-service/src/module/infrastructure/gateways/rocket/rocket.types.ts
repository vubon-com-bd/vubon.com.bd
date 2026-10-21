/**
 * Rocket API — Type Definitions
 * @module payment-service/infrastructure/gateways/rocket
 */

export interface RocketCreateRequest {
  readonly merchantId: string;
  readonly orderId: string;
  readonly amount: string;
  readonly currency: 'BDT';
  readonly successUrl: string;
  readonly failUrl: string;
  readonly cancelUrl: string;
  readonly customerMobile?: string;
}

export interface RocketCreateResponse {
  readonly success: boolean;
  readonly rocketPaymentId?: string;
  readonly redirectUrl?: string;
  readonly statusCode?: string;
  readonly statusMessage?: string;
}

export interface RocketVerifyResponse {
  readonly success: boolean;
  readonly rocketPaymentId?: string;
  readonly orderId?: string;
  readonly amount?: string;
  readonly currency?: string;
  readonly status?: string;
  readonly statusCode?: string;
  readonly statusMessage?: string;
}

export interface RocketRefundResponse {
  readonly success: boolean;
  readonly refundId?: string;
  readonly status?: string;
  readonly statusCode?: string;
  readonly statusMessage?: string;
}

export interface RocketWebhookPayload {
  readonly orderId: string;
  readonly rocketPaymentId: string;
  readonly amount: string;
  readonly status: string;
  readonly message?: string;
  readonly transactionId?: string;
  readonly signature?: string;
  readonly [key: string]: unknown;
}
