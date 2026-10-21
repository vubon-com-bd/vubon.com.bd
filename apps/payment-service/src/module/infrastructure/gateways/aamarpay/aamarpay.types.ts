/**
 * aamarPay API — Type Definitions
 * @module payment-service/infrastructure/gateways/aamarpay
 */

export interface AamarpayCreateRequest {
  readonly store_id: string;
  readonly signature_key: string;
  readonly tran_id: string;
  readonly amount: string;
  readonly currency: string;
  readonly desc: string;
  readonly cus_name: string;
  readonly cus_email: string;
  readonly cus_phone: string;
  readonly cus_add1: string;
  readonly cus_city: string;
  readonly cus_country: string;
  readonly success_url: string;
  readonly fail_url: string;
  readonly cancel_url: string;
  readonly type: 'json';
}

export interface AamarpayCreateResponse {
  readonly result?: 'true' | 'false';
  readonly payment_url?: string;
  readonly error?: string;
  readonly message?: string;
}

export interface AamarpayVerifyResponse {
  readonly status_code: string;
  readonly status_title?: string;
  readonly amount?: string;
  readonly currency?: string;
  readonly pg_txnid?: string;
  readonly mer_txnid?: string;
  readonly pay_status?: string;
  readonly store_amount?: string;
  readonly [key: string]: unknown;
}

export interface AamarpayWebhookPayload {
  readonly mer_txnid: string;
  readonly pg_txnid?: string;
  readonly amount: string;
  readonly pay_status: string;
  readonly status_code?: string;
  readonly [key: string]: unknown;
}
