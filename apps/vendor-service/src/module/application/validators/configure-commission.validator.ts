/**
 * ConfigureCommissionValidator
 * @module vendor-service/application/validators
 */
import { Injectable } from '@nestjs/common';
import type { ConfigureCommissionRequestDto } from '../dtos/requests/configure-commission.dto.js';
import { CommissionCalculationFailedError } from '../errors/commission.errors.js';
import { VENDOR_COMMISSION } from '@vubon/shared-constants/business';

@Injectable()
export class ConfigureCommissionValidator {
  validate(dto: ConfigureCommissionRequestDto): void {
    if (!dto.vendorId || dto.vendorId.trim().length === 0) {
      throw new CommissionCalculationFailedError('vendorId is required');
    }
    if (
      dto.percent < VENDOR_COMMISSION.MIN_PERCENT
      || dto.percent > VENDOR_COMMISSION.MAX_PERCENT
    ) {
      throw new CommissionCalculationFailedError(
        `percent must be between ${VENDOR_COMMISSION.MIN_PERCENT} and ${VENDOR_COMMISSION.MAX_PERCENT}`,
      );
    }
    if (!dto.currency || dto.currency.length !== 3) {
      throw new CommissionCalculationFailedError('currency must be a 3-char ISO code');
    }
    // Fixed / hybrid require fixedAmount
    if (dto.type === 'fixed' || dto.type === 'hybrid') {
      if (dto.fixedAmount === undefined || dto.fixedAmount < 0) {
        throw new CommissionCalculationFailedError(
          `type "${dto.type}" requires a valid fixedAmount`,
        );
      }
    }
    if (dto.effectiveFrom && Number.isNaN(Date.parse(dto.effectiveFrom))) {
      throw new CommissionCalculationFailedError('effectiveFrom must be a valid ISO timestamp');
    }
    if (dto.effectiveTo && Number.isNaN(Date.parse(dto.effectiveTo))) {
      throw new CommissionCalculationFailedError('effectiveTo must be a valid ISO timestamp');
    }
    if (dto.effectiveFrom && dto.effectiveTo && dto.effectiveTo <= dto.effectiveFrom) {
      throw new CommissionCalculationFailedError('effectiveTo must be after effectiveFrom');
    }
  }
}
