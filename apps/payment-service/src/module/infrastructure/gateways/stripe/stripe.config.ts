import { Injectable } from '@nestjs/common';
import { STRIPE_CONFIG } from '../../config/stripe.config';

@Injectable()
export class StripeConfig {
  readonly secretKey = STRIPE_CONFIG.secretKey;
  readonly publishableKey = STRIPE_CONFIG.publishableKey;
  readonly webhookSecret = STRIPE_CONFIG.webhookSecret;
  readonly apiVersion = STRIPE_CONFIG.apiVersion;
  readonly timeoutMs = STRIPE_CONFIG.timeoutMs;
}
