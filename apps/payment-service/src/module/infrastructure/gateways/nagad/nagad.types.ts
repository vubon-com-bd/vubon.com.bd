export interface NagadCreatePaymentRequest {
  readonly accountNumber: string;
  readonly amount: string;
  readonly currency: string;
  readonly merchantId: string;
  readonly merchantCallbackUrl: string;
  readonly orderId: string;
  readonly productDetails?: string;
  readonly ip?: string;
  readonly additionalMerchantInfo?: Readonly<Record<string, unknown>>;
}

export interface NagadCreatePaymentResponse {
  readonly callBackUrl: string;
  readonly sensitiveData: string;
  readonly signature: string;
  readonly status: string;
  readonly message: string;
}

export interface NagadVerifyPaymentResponse {
  readonly status: string;
  readonly issuerPaymentRefNo?: string;
  readonly amount?: string;
  readonly merchantId?: string;
  readonly orderId?: string;
  readonly message: string;
}

export interface NagadRefundResponse {
  readonly status: string;
  readonly refundRefNo?: string;
  readonly amount?: string;
  readonly message: string;
}

export interface NagadWebhookBody {
  readonly paymentRefId: string;
  readonly orderId: string;
  readonly amount: string;
  readonly status: string;
  readonly [key: string]: unknown;
}
