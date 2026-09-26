export interface StripeCreatePaymentIntentRequest {
  readonly amount: number;
  readonly currency: string;
  readonly metadata: Readonly<Record<string, string>>;
  readonly idempotencyKey?: string;
}

export interface StripePaymentIntentResponse {
  readonly id: string;
  readonly client_secret: string | null;
  readonly status: string;
  readonly amount: number;
  readonly currency: string;
  readonly metadata: Readonly<Record<string, string>>;
}

export interface StripeCaptureResponse {
  readonly id: string;
  readonly status: string;
  readonly amount_received: number;
  readonly currency: string;
}

export interface StripeRefundResponse {
  readonly id: string;
  readonly status: string;
  readonly amount: number;
  readonly currency: string;
}

export interface StripeWebhookEvent {
  readonly id: string;
  readonly type: string;
  readonly data: {
    readonly object: Readonly<Record<string, unknown>>;
  };
  readonly [key: string]: unknown;
}
