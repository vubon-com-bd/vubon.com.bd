import { BKASH_CONFIG } from '../../config/bkash.config';

export class BkashConfig {
  readonly appKey = BKASH_CONFIG.appKey;
  readonly appSecret = BKASH_CONFIG.appSecret;
  readonly username = BKASH_CONFIG.username;
  readonly password = BKASH_CONFIG.password;
  readonly baseUrl = BKASH_CONFIG.baseUrl;
  readonly callbackUrl = BKASH_CONFIG.callbackUrl;
  readonly webhookSecret = BKASH_CONFIG.webhookSecret;
  readonly timeoutMs = BKASH_CONFIG.timeoutMs;
}

export const bkashConfig = new BkashConfig();
