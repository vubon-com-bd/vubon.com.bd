export interface AamarpayCreatePaymentRequest {
  readonly store_id: string;
  readonly signature_key: string;
  readonly tran_id: string;
  readonly amount: string;
  readonly currency: string;
  readonly desc: string;
  readonly cus_name: string;
  readonly cus_email: string;
  readonly cus_phone: string;
  readonly cus_add1?: string;
  readonly cus_city?: string;
  readonly cus_country?: string;
  readonly success_url: string;
  readonly fail_url: string;
  readonly cancel_url: string;
  readonly type: string;
}

export interface AamarpayCreatePaymentResponse {
  readonly payment_url?: string;
  readonly result?: string;
  readonly [key: string]: unknown;
}

export interface AamarpayValidateResponse {
  readonly status: string;
  readonly pay_status: string;
  readonly mer_txnid: string;
  readonly pg_txnid?: string;
  readonly amount: string;
  readonly currency: string;
  readonly [key: string]: unknown;
}

export interface AamarpayRefundResponse {
  readonly status: string;
  readonly refund_ref_id?: string;
  readonly amount?: string;
  readonly [key: string]: unknown;
}

export interface AamarpayWebhookBody {
  readonly mer_txnid: string;
  readonly pg_txnid: string;
  readonly amount: string;
  readonly pay_status: string;
  readonly verify_sign: string;
  readonly [key: string]: unknown;
}
