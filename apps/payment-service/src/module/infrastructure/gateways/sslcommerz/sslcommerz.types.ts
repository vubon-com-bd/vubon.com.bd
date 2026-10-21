/**
 * SSLCommerz API — Type Definitions
 * @module payment-service/infrastructure/gateways/sslcommerz
 */

export interface SslcommerzCreateSessionRequest {
  readonly store_id: string;
  readonly store_passwd: string;
  readonly total_amount: string;
  readonly currency: string;
  readonly tran_id: string;
  readonly success_url: string;
  readonly fail_url: string;
  readonly cancel_url: string;
  readonly ipn_url?: string;
  readonly cus_name: string;
  readonly cus_email: string;
  readonly cus_add1: string;
  readonly cus_city: string;
  readonly cus_country: string;
  readonly cus_phone: string;
  readonly shipping_method: 'NO' | 'YES';
  readonly product_name: string;
  readonly product_category: string;
  readonly product_profile:
    | 'general'
    | 'download'
    | 'non-physical-goods'
    | 'airline-tickets'
    | 'travel-vertical'
    | 'telecom-vertical';
}

export interface SslcommerzCreateSessionResponse {
  readonly status: 'SUCCESS' | 'FAILED';
  readonly failedreason?: string;
  readonly sessionkey: string;
  readonly GatewayPageURL: string;
  readonly storeBanner?: string;
  readonly storeLogo?: string;
  readonly desc?: ReadonlyArray<Record<string, unknown>>;
}

export interface SslcommerzValidationResponse {
  readonly status: 'VALID' | 'VALIDATED' | 'INVALID_TRANSACTION' | 'FAILED';
  readonly tran_date?: string;
  readonly val_id: string;
  readonly amount: string;
  readonly store_amount?: string;
  readonly currency: string;
  readonly bank_tran_id?: string;
  readonly card_type?: string;
  readonly tran_id: string;
  readonly verify_sign: string;
  readonly verify_key: string;
  readonly risk_level?: string;
  readonly risk_title?: string;
}

export interface SslcommerzWebhookPayload {
  readonly tran_id: string;
  readonly val_id: string;
  readonly amount: string;
  readonly status: string;
  readonly card_type?: string;
  readonly verify_sign?: string;
  readonly verify_key?: string;
  readonly [key: string]: unknown;
}
