export interface BkashCreatePaymentRequest {
  readonly amount: string;
  readonly currency: string;
  readonly intent: 'sale' | 'authorization';
  readonly merchantInvoiceNumber: string;
  readonly callbackURL: string;
  readonly payerReference?: string;
}

export interface BkashCreatePaymentResponse {
  readonly paymentID: string;
  readonly bkashURL: string;
  readonly callbackURL: string;
  readonly successCallbackURL: string;
  readonly failureCallbackURL: string;
  readonly cancelledCallbackURL: string;
  readonly amount: string;
  readonly intent: string;
  readonly currency: string;
  readonly paymentCreateTime: string;
  readonly transactionStatus: string;
  readonly statusCode: string;
  readonly statusMessage: string;
}

export interface BkashExecutePaymentResponse {
  readonly paymentID: string;
  readonly trxID: string;
  readonly transactionStatus: string;
  readonly amount: string;
  readonly currency: string;
  readonly statusCode: string;
  readonly statusMessage: string;
}

export interface BkashRefundResponse {
  readonly refundTrxID?: string;
  readonly transactionStatus: string;
  readonly amount: string;
  readonly statusCode: string;
  readonly statusMessage: string;
}

export interface BkashWebhookBody {
  readonly paymentID: string;
  readonly trxID: string;
  readonly amount: string;
  readonly currency: string;
  readonly transactionStatus: string;
  readonly merchantInvoiceNumber: string;
  readonly [key: string]: unknown;
}
