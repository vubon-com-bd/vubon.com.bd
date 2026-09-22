export interface PaypalCreateOrderRequest {
  readonly intent: 'CAPTURE' | 'AUTHORIZE';
  readonly purchase_units: ReadonlyArray<{
    readonly amount: { readonly currency_code: string; readonly value: string };
    readonly custom_id?: string;
    readonly reference_id?: string;
  }>;
  readonly application_context?: {
    readonly return_url: string;
    readonly cancel_url: string;
    readonly brand_name?: string;
    readonly user_action?: string;
  };
}

export interface PaypalOrderResponse {
  readonly id: string;
  readonly status: string;
  readonly links: ReadonlyArray<{ readonly href: string; readonly rel: string }>;
}

export interface PaypalCaptureResponse {
  readonly id: string;
  readonly status: string;
  readonly purchase_units: ReadonlyArray<{
    readonly payments?: {
      readonly captures?: ReadonlyArray<{
        readonly id: string;
        readonly status: string;
        readonly amount: { readonly currency_code: string; readonly value: string };
      }>;
    };
  }>;
}

export interface PaypalRefundResponse {
  readonly id: string;
  readonly status: string;
  readonly amount?: { readonly currency_code: string; readonly value: string };
}

export interface PaypalWebhookEvent {
  readonly id: string;
  readonly event_type: string;
  readonly resource: Readonly<Record<string, unknown>>;
  readonly [key: string]: unknown;
}
