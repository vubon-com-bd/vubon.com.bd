/**
 * Stripe API — Type Definitions (PaymentIntent subset)
 * @module payment-service/infrastructure/gateways/stripe
 */

export interface StripeCreatePaymentIntentRequest {
  readonly amount: number;
  readonly currency: string;
  readonly description?: string;
  readonly metadata?: Readonly<Record<string, string>>;
  readonly capture_method?: 'automatic' | 'manual';
  readonly confirmation_method?: 'automatic' | 'manual';
  readonly payment_method?: string;
  readonly confirm?: boolean;
  readonly return_url?: string;
}

export interface StripePaymentIntent {
  readonly id: string;
  readonly object: 'payment_intent';
  readonly amount: number;
  readonly currency: string;
  readonly status:
    | 'requires_payment_method'
    | 'requires_confirmation'
    | 'requires_action'
    | 'processing'
    | 'requires_capture'
    | 'canceled'
    | 'succeeded';
  readonly client_secret?: string;
  readonly next_action?: {
    readonly type: string;
    readonly redirect_to_url?: {
      readonly url: string;
      readonly return_url?: string;
    };
  };
  readonly metadata?: Readonly<Record<string, string>>;
}

export interface StripeCaptureRequest {
  readonly amount_to_capture?: number;
}

export interface StripeRefundRequest {
  readonly payment_intent: string;
  readonly amount?: number;
  readonly reason?:
    | 'duplicate'
    | 'fraudulent'
    | 'requested_by_customer';
}

export interface StripeRefund {
  readonly id: string;
  readonly object: 'refund';
  readonly amount: number;
  readonly currency: string;
  readonly status: 'pending' | 'succeeded' | 'failed' | 'canceled';
  readonly payment_intent: string;
}

export interface StripeWebhookEvent<TData = Record<string, unknown>> {
  readonly id: string;
  readonly object: 'event';
  readonly type: string;
  readonly data: {
    readonly object: TData;
  };
  readonly created: number;
}

export interface StripeWebhookPayload {
  readonly id: string;
  readonly type: string;
  readonly data: {
    readonly object: Readonly<Record<string, unknown>>;
  };
  readonly [key: string]: unknown;
}
