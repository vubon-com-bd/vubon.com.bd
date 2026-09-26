import { Injectable } from '@nestjs/common';
import { AAMARPAY_CONFIG } from '../../config/aamarpay.config';

@Injectable()
export class AamarpayConfig {
  readonly storeId = AAMARPAY_CONFIG.storeId;
  readonly signatureKey = AAMARPAY_CONFIG.signatureKey;
  readonly baseUrl = AAMARPAY_CONFIG.baseUrl;
  readonly timeoutMs = AAMARPAY_CONFIG.timeoutMs;
}
