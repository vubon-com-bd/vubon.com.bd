import { Injectable } from '@nestjs/common';
import { NAGAD_CONFIG } from '../../config/nagad.config';

@Injectable()
export class NagadConfig {
  readonly merchantId = NAGAD_CONFIG.merchantId;
  readonly merchantPrivateKey = NAGAD_CONFIG.merchantPrivateKey;
  readonly nagadPublicKey = NAGAD_CONFIG.nagadPublicKey;
  readonly baseUrl = NAGAD_CONFIG.baseUrl;
  readonly callbackUrl = NAGAD_CONFIG.callbackUrl;
  readonly webhookSecret = NAGAD_CONFIG.webhookSecret;
  readonly timeoutMs = NAGAD_CONFIG.timeoutMs;
}
