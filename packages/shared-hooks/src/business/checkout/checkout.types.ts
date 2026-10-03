export interface CheckoutSession {
  readonly sessionId: string;
  readonly total: number;
  readonly currency: string;
  readonly expiresAt: string;
}

export interface ShippingAddress {
  readonly id: string;
  readonly label: string;
  readonly line1: string;
  readonly city: string;
  readonly country: string;
}

/** Billing address uses the same shape as shipping. */
export type BillingAddress = ShippingAddress;

export interface PaymentMethod {
  readonly id: string;
  readonly kind: 'card' | 'bkash' | 'nagad' | 'rocket' | 'bank' | 'cod';
  readonly label: string;
  readonly enabled: boolean;
}
