/**
 * RequestPayoutValidator
 * @module vendor-service/application/validators
 */
import { Injectable } from '@nestjs/common';
import type { RequestPayoutRequestDto } from '../dtos/requests/request-payout.dto.js';
import { PayoutLimitExceededError } from '../errors/payout.errors.js';
import { VENDOR_PAYOUT } from '@vubon/shared-constants/business';

@Injectable()
export class RequestPayoutValidator {
  validate(dto: RequestPayoutRequestDto): void {
    if (!dto.vendorId || dto.vendorId.trim().length === 0) {
      throw new PayoutLimitExceededError('min', 0, VENDOR_PAYOUT.MIN_AMOUNT);
    }
    if (!Number.isFinite(dto.amount)) {
      throw new PayoutLimitExceededError('min', 0, VENDOR_PAYOUT.MIN_AMOUNT);
    }
    if (dto.amount < VENDOR_PAYOUT.MIN_AMOUNT) {
      throw new PayoutLimitExceededError('min', dto.amount, VENDOR_PAYOUT.MIN_AMOUNT);
    }
    if (dto.amount > VENDOR_PAYOUT.MAX_AMOUNT) {
      throw new PayoutLimitExceededError('max', dto.amount, VENDOR_PAYOUT.MAX_AMOUNT);
    }
    if (!dto.currency || dto.currency.length !== 3) {
      throw new PayoutLimitExceededError('min', 0, VENDOR_PAYOUT.MIN_AMOUNT);
    }
    if (!dto.idempotencyKey || dto.idempotencyKey.trim().length < 8) {
      throw new PayoutLimitExceededError('min', 0, VENDOR_PAYOUT.MIN_AMOUNT);
    }
  }
}
