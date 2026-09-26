export interface CryptoCreatePaymentRequest {
  readonly walletAddress: string;
  readonly network: string;
  readonly amount: number;
  readonly currency: string;
  readonly paymentId: string;
  readonly expiresAt: number;
}

export interface CryptoCreatePaymentResponse {
  readonly walletAddress: string;
  readonly network: string;
  readonly amount: string;
  readonly currency: string;
  readonly paymentId: string;
  readonly expiresAt: string;
  readonly qrCodeUrl?: string;
}

export interface CryptoVerifyPaymentRequest {
  readonly walletAddress: string;
  readonly txHash: string;
  readonly expectedAmount: number;
  readonly expectedCurrency: string;
}

export interface CryptoVerifyPaymentResponse {
  readonly verified: boolean;
  readonly confirmations: number;
  readonly receivedAmount: string;
  readonly receivedCurrency: string;
  readonly txHash: string;
  readonly blockNumber?: number;
}

export interface CryptoRefundResponse {
  readonly success: boolean;
  readonly refundTxHash?: string;
  readonly message: string;
}

export interface CryptoWebhookBody {
  readonly txHash: string;
  readonly walletAddress: string;
  readonly amount: string;
  readonly currency: string;
  readonly confirmations: number;
  readonly [key: string]: unknown;
}
