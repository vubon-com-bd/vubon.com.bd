/**
 * PayPal API — Type Definitions (Orders v2)
 * @module payment-service/infrastructure/gateways/paypal
 */

export interface PaypalAuthResponse {
  readonly access_token: string;
  readonly token_type: 'Bearer';
  readonly expires_in: number;
  readonly scope?: string;
}

export interface PaypalCreateOrderRequest {
  readonly intent: 'CAPTURE' | 'AUTHORIZE';
  readonly purchase_units: ReadonlyArray<{
    readonly reference_id: string;
    readonly amount: {
      readonly currency_code: string;
      readonly value: string;
    };
    readonly description?: string;
    readonly custom_id?: string;
  }>;
  readonly application_context?: {
    readonly brand_name?: string;
    readonly landing_page?: 'LOGIN' | 'BILLING' | 'NO_PREFERENCE';
    readonly return_url?: string;
    readonly cancel_url?: string;
    readonly user_action?: 'PAY_NOW' | 'CONTINUE';
  };
}

export interface PaypalLink {
  readonly href: string;
  readonly rel: 'self' | 'approve' | 'capture' | 'authorize' | string;
  readonly method: 'GET' | 'POST' | 'PATCH';
}

export interface PaypalOrder {
  readonly id: string;
  readonly status:
    | 'CREATED'
    | 'SAVED'
    | 'APPROVED'
    | 'VOIDED'
    | 'COMPLETED'
    | 'PAYER_ACTION_REQUIRED';
  readonly links: readonly PaypalLink[];
  readonly purchase_units?: ReadonlyArray<{
    readonly amount: {
      readonly currency_code: string;
      readonly value: string;
    };
  }>;
}

export interface PaypalCaptureResponse {
  readonly id: string;
  readonly status: 'COMPLETED' | 'PENDING' | 'DECLINED' | 'FAILED';
  readonly purchase_units?: ReadonlyArray<{
    readonly payments?: {
      readonly captures?: ReadonlyArray<{
        readonly id: string;
        readonly status: string;
        readonly amount: {
          readonly currency_code: string;
          readonly value: string;
        };
      }>;
    };
  }>;
}

export interface PaypalRefundResponse {
  readonly id: string;
  readonly status: 'COMPLETED' | 'PENDING' | 'CANCELLED' | 'FAILED';
  readonly amount?: {
    readonly currency_code: string;
    readonly value: string;
  };
}

export interface PaypalWebhookPayload {
  readonly id: string;
  readonly event_type: string;
  readonly resource: Readonly<Record<string, unknown>>;
  readonly [key: string]: unknown;
}

export interface PaypalWebhookVerifyRequest {
  readonly auth_algo: string;
  readonly cert_url: string;
  readonly transmission_id: string;
  readonly transmission_sig: string;
  readonly transmission_time: string;
  readonly webhook_id: string;
  readonly webhook_event: Readonly<Record<string, unknown>>;
}

export interface PaypalWebhookVerifyResponse {
  readonly verification_status: 'SUCCESS' | 'FAILURE';
}
