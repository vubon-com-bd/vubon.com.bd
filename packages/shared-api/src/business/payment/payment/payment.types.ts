export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';
export type PaymentMethodKind = 'card' | 'bkash' | 'nagad' | 'rocket' | 'bank' | 'cod';

export interface Payment {
  readonly id: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly method: PaymentMethodKind;
  readonly status: PaymentStatus;
  readonly transactionId?: string;
  readonly createdAt: string;
}

export interface CreatePaymentRequest {
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly method: PaymentMethodKind;
  readonly returnUrl?: string;
}

export interface PaymentMethodInfo {
  readonly kind: PaymentMethodKind;
  readonly label: string;
  readonly enabled: boolean;
  readonly iconUrl?: string;
}
