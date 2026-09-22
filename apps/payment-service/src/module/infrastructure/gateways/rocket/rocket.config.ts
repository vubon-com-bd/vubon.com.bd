import { Injectable } from '@nestjs/common';
import { ROCKET_CONFIG } from '../../config/rocket.config';

@Injectable()
export class RocketConfig {
  readonly merchantId = ROCKET_CONFIG.merchantId;
  readonly apiKey = ROCKET_CONFIG.apiKey;
  readonly apiSecret = ROCKET_CONFIG.apiSecret;
  readonly baseUrl = ROCKET_CONFIG.baseUrl;
  readonly webhookSecret = ROCKET_CONFIG.webhookSecret;
  readonly timeoutMs = ROCKET_CONFIG.timeoutMs;
}
