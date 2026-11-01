/**
 * Nagad API — Type Definitions
 * @module payment-service/infrastructure/gateways/nagad
 *
 * Based on Nagad Merchant API (initialize → complete).
 */

export interface NagadInitializeRequest {
  readonly accountNumber: string;
  readonly dateTime: string;
  readonly sensitiveData: string; // AES-encrypted payload
  readonly signature: string;     // RSA-signed
}

export interface NagadInitializeResponse {
  readonly sensitiveData: string; // AES-encrypted response
  readonly signature: string;
  readonly status?: string;
  readonly message?: string;
}

export interface NagadSensitiveInitPayload {
  readonly merchantId: string;
  readonly datetime: string;
  readonly orderId: string;
  readonly challenge: string;
}

export interface NagadSensitiveInitResponse {
  readonly paymentReferenceId: string;
  readonly challenge: string;
  readonly issueTime: string;
  readonly orderId: string;
  readonly status: string;
  readonly statusCode: string;
  readonly statusMessage: string;
}

export interface NagadCompleteRequest {
  readonly sensitiveData: string;
  readonly signature: string;
}

export interface NagadSensitiveCompletePayload {
  readonly paymentRefId: string;
  readonly sensitiveData: string;
  readonly signature: string;
}

export interface NagadSensitiveCompleteResponse {
  readonly issuerPaymentRefNo: string;
  readonly orderId: string;
  readonly amount: string;
  readonly status: string;
  readonly statusCode: string;
  readonly statusMessage: string;
}

export interface NagadRefundResponse {
  readonly refundPaymentRefId: string;
  readonly status: string;
  readonly statusCode: string;
  readonly statusMessage: string;
}

export interface NagadWebhookPayload {
  readonly orderId: string;
  readonly paymentRefId: string;
  readonly amount: string;
  readonly status: string;
  readonly message?: string;
  readonly issuerPaymentRefNo?: string;
  readonly signature?: string;
  readonly [key: string]: unknown;
}
