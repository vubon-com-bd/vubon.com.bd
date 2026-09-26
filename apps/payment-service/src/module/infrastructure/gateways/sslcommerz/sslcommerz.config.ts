import { Injectable } from '@nestjs/common';
import { SSLCOMMERZ_CONFIG } from '../../config/sslcommerz.config';

@Injectable()
export class SslcommerzConfig {
  readonly storeId = SSLCOMMERZ_CONFIG.storeId;
  readonly storePassword = SSLCOMMERZ_CONFIG.storePassword;
  readonly baseUrl = SSLCOMMERZ_CONFIG.baseUrl;
  readonly webhookSecret = SSLCOMMERZ_CONFIG.webhookSecret;
  readonly timeoutMs = SSLCOMMERZ_CONFIG.timeoutMs;
}
