export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';

export interface Payment {
  readonly id: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly method: string;
  readonly status: PaymentStatus;
}

export interface PaymentMethod {
  readonly id: string;
  readonly kind: string;
  readonly label: string;
  readonly enabled: boolean;
}
