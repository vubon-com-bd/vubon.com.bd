/**
 * TrackingNumberService — generate & validate tracking numbers
 * @module logistics-service/domain/services
 */
import { SHIPMENT } from '@vubon/shared-constants/logistics';
import { generateTrackingNumber } from '@vubon/shared-utils/generator';
import { isValidTrackingNumber } from '@vubon/shared-utils/validator';
import { formatTrackingId } from '@vubon/shared-utils/formatter';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TrackingNumberVO } from '../value-objects/primitives/tracking-number.vo.js';

export class TrackingNumberService {
  /** Generate a fresh tracking number with the default prefix. */
  static generate(prefix: string = SHIPMENT.TRACKING_NUMBER_PREFIX): TrackingNumberVO {
    return TrackingNumberVO.create(generateTrackingNumber(prefix));
  }

  /** Validate a raw string as a tracking number. */
  static isValid(raw: string): boolean {
    return isValidTrackingNumber(raw);
  }

  /** Convert a tracking number into a human-readable display format. */
  static format(raw: string, groupBy = 4): string {
    return formatTrackingId(raw, groupBy);
  }

  /** Cheap uniqueness loop using a provided "exists" checker. */
  static async generateUnique(
    isTaken: (trackingNumber: string) => Promise<boolean>,
    maxAttempts = 5,
  ): Promise<TrackingNumberVO> {
    for (let i = 0; i < maxAttempts; i++) {
      const candidate = this.generate();
      if (!(await isTaken(candidate.value))) return candidate;
    }
    throw new BusinessRuleError(
      `Failed to generate unique tracking number after ${maxAttempts} attempts`,
      'TRACKING_NUMBER_GENERATION_FAILED',
      { maxAttempts },
    );
  }
}
