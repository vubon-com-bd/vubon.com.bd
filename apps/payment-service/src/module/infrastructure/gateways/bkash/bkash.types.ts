/**
 * bKash API — Type Definitions
 * @module payment-service/infrastructure/gateways/bkash
 *
 * Based on bKash Tokenized Checkout API v1.2.0-beta.
 */

export interface BkashAuthResponse {
  readonly id_token: string;
  readonly token_type: 'Bearer';
  readonly expires_in: number;
  readonly statusCode?: string;
  readonly statusMessage?: string;
}

export interface BkashCreatePaymentRequest {
  readonly mode: '0011';
  readonly payerReference: string;
  readonly callbackURL: string;
  readonly amount: string;
  readonly currency: 'BDT';
  readonly intent: 'sale' | 'authorization';
  readonly merchantInvoiceNumber: string;
}

export interface BkashCreatePaymentResponse {
  readonly paymentID: string;
  readonly bkashURL: string;
  readonly callbackURL: string;
  readonly successCallbackURL: string;
  readonly failureCallbackURL: string;
  readonly cancelledCallbackURL: string;
  readonly amount: string;
  readonly currency: string;
  readonly intent: string;
  readonly paymentCreateTime: string;
  readonly transactionStatus: string;
  readonly merchantInvoiceNumber: string;
  readonly statusCode: string;
  readonly statusMessage?: string;
}

export interface BkashExecutePaymentResponse {
  readonly paymentID: string;
  readonly trxID: string;
  readonly transactionStatus: 'Completed' | 'Failed' | 'Initiated';
  readonly amount: string;
  readonly currency: string;
  readonly intent: string;
  readonly paymentExecuteTime: string;
  readonly merchantInvoiceNumber: string;
  readonly statusCode: string;
  readonly statusMessage?: string;
}

export interface BkashQueryPaymentResponse {
  readonly paymentID: string;
  readonly trxID?: string;
  readonly transactionStatus: string;
  readonly amount: string;
  readonly currency: string;
  readonly intent: string;
  readonly statusCode: string;
  readonly statusMessage?: string;
}

export interface BkashRefundRequest {
  readonly paymentID: string;
  readonly trxID: string;
  readonly amount: string;
  readonly currency: 'BDT';
  readonly reason: string;
  readonly sku?: string;
}

export interface BkashRefundResponse {
  readonly refundTrxID: string;
  readonly transactionStatus: string;
  readonly amount: string;
  readonly currency: string;
  readonly statusCode: string;
  readonly statusMessage?: string;
}

export interface BkashErrorResponse {
  readonly errorCode: string;
  readonly errorMessage: string;
  readonly statusCode: string;
}

export interface BkashWebhookPayload {
  readonly paymentID: string;
  readonly trxID: string;
  readonly amount: string;
  readonly currency?: string;
  readonly intent?: string;
  readonly merchantInvoiceNumber?: string;
  readonly transactionStatus: string;
  readonly signature?: string;
  readonly [key: string]: unknown;
}
