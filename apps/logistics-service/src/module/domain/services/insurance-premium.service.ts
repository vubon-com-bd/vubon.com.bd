/**
 * InsurancePremiumService — compute premium for a policy
 * @module logistics-service/domain/services
 *
 * Premium = declaredValue * type.premiumPercent / 100.
 * Respects INSURANCE.MIN_VALUE and MAX_VALUE bounds.
 */
import { INSURANCE } from '@vubon/shared-constants/logistics';
import { InsuranceTypeVO } from '../value-objects/primitives/insurance-type.vo.js';
import { InsurancePremiumVO } from '../value-objects/primitives/insurance-premium.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface PremiumCalculationInput {
  readonly declaredValue: number;
  readonly currency: string;
  readonly type: InsuranceTypeVO;
}

export class InsurancePremiumService {
  static calculate(input: PremiumCalculationInput): InsurancePremiumVO {
    if (!Number.isFinite(input.declaredValue)) {
      throw new ValidationError('Declared value must be a number', 'declaredValue');
    }
    if (input.declaredValue < INSURANCE.MIN_VALUE || input.declaredValue > INSURANCE.MAX_VALUE) {
      throw new ValidationError(
        `Declared value must be ${INSURANCE.MIN_VALUE}-${INSURANCE.MAX_VALUE}`,
        'declaredValue',
      );
    }
    return InsurancePremiumVO.calculate(
      input.declaredValue,
      input.type.premiumPercent,
      input.currency,
    );
  }

  /** Compare two policies for cost effectiveness. */
  static isCheaper(a: InsurancePremiumVO, b: InsurancePremiumVO): boolean {
    if (a.currency !== b.currency) return false;
    return a.amount < b.amount;
  }
}
