/**
 * CanInsureSpecification
 * @module logistics-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { INSURANCE } from '@vubon/shared-constants/logistics';

export interface InsurableShipment {
  readonly declaredValue?: number;
  readonly currency?: string;
  readonly isInsured: boolean;
  readonly isCOD: boolean;
}

export type CanInsureCandidate = {
  readonly shipment: InsurableShipment;
  readonly requestedValue?: number;
};

export class CanInsureSpecification extends Specification<CanInsureCandidate> {
  isSatisfiedBy(c: CanInsureCandidate): boolean {
    const { shipment, requestedValue } = c;
    if (shipment.isInsured) return false;
    const value = requestedValue ?? shipment.declaredValue;
    if (value === undefined) return false;
    if (value < INSURANCE.MIN_VALUE) return false;
    if (value > INSURANCE.MAX_VALUE) return false;
    return true;
  }

  explain(c: CanInsureCandidate): string | null {
    const { shipment, requestedValue } = c;
    if (shipment.isInsured) {
      return 'Shipment is already insured';
    }
    const value = requestedValue ?? shipment.declaredValue;
    if (value === undefined) {
      return 'Declared value not set';
    }
    if (value < INSURANCE.MIN_VALUE) {
      return `Declared value ${value} below minimum ${INSURANCE.MIN_VALUE}`;
    }
    if (value > INSURANCE.MAX_VALUE) {
      return `Declared value ${value} exceeds max ${INSURANCE.MAX_VALUE}`;
    }
    return null;
  }

  static strict(): CanInsureSpecification {
    return new CanInsureSpecification();
  }
}
