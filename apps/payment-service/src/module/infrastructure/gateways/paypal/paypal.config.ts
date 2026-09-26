import { Injectable } from '@nestjs/common';
import { PAYPAL_CONFIG } from '../../config/paypal.config';

@Injectable()
export class PaypalConfig {
  readonly clientId = PAYPAL_CONFIG.clientId;
  readonly clientSecret = PAYPAL_CONFIG.clientSecret;
  readonly webhookId = PAYPAL_CONFIG.webhookId;
  readonly baseUrl = PAYPAL_CONFIG.baseUrl;
  readonly timeoutMs = PAYPAL_CONFIG.timeoutMs;
}
