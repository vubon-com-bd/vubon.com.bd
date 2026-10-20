/**
 * TrackingNumberService — generates tracking numbers (TRK-XXXXXXXX)
 * @module order-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import {
  TRACKING_NUMBER_PREFIX,
  TRACKING_NUMBER_MIN_LENGTH,
  TRACKING_NUMBER_MAX_LENGTH,
} from '@vubon/shared-constants/business/order';

@Injectable()
export class TrackingNumberService {
  generate(seed: string): string {
    const normalized = seed
      .replace(/[^A-Z0-9]/gi, '')
      .toUpperCase()
      .slice(0, TRACKING_NUMBER_MAX_LENGTH);
    const padded = normalized.padEnd(TRACKING_NUMBER_MIN_LENGTH, '0');
    return `${TRACKING_NUMBER_PREFIX}-${padded}`;
  }
}
