export interface SslcommerzCreatePaymentRequest {
  readonly store_id: string;
  readonly store_passwd: string;
  readonly total_amount: string;
  readonly currency: string;
  readonly tran_id: string;
  readonly success_url: string;
  readonly fail_url: string;
  readonly cancel_url: string;
  readonly cus_name: string;
  readonly cus_email: string;
  readonly cus_phone: string;
  readonly cus_add1?: string;
  readonly cus_city?: string;
  readonly cus_country?: string;
  readonly product_name: string;
  readonly product_category: string;
  readonly product_profile: string;
  readonly shipping_method?: string;
}

export interface SslcommerzCreatePaymentResponse {
  readonly status: string;
  readonly failedreason?: string;
  readonly sessionkey?: string;
  readonly GatewayPageURL?: string;
  readonly redirectGatewayURL?: string;
  readonly [key: string]: unknown;
}

export interface SslcommerzValidateResponse {
  readonly status: string;
  readonly tran_id: string;
  readonly val_id: string;
  readonly amount: string;
  readonly store_amount: string;
  readonly currency: string;
  readonly bank_tran_id?: string;
  readonly [key: string]: unknown;
}

export interface SslcommerzRefundResponse {
  readonly status: string;
  readonly refund_ref_id?: string;
  readonly amount?: string;
  readonly [key: string]: unknown;
}

export interface SslcommerzWebhookBody {
  readonly tran_id: string;
  readonly val_id: string;
  readonly amount: string;
  readonly status: string;
  readonly verify_sign: string;
  readonly [key: string]: unknown;
}
