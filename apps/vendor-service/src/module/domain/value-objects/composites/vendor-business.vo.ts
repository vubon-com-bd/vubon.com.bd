/**
 * VendorBusinessVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor এর legal/business identity information।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { BusinessNameVO } from '../primitives/business-name.vo.js';
import { BusinessTypeVO } from '../primitives/business-type.vo.js';
import { BusinessRegistrationVO } from '../primitives/business-registration.vo.js';
import { VendorTypeVO } from '../primitives/vendor-type.vo.js';

export interface VendorBusinessVOProps {
  readonly vendorId: VendorIdVO;
  readonly legalName: BusinessNameVO;
  readonly businessType: BusinessTypeVO;
  readonly vendorType: VendorTypeVO;
  readonly registrationNumber?: BusinessRegistrationVO;
  readonly taxId?: string;
  readonly vatNumber?: string;
  readonly establishedYear?: number;
  readonly employeeCount?: number;
  readonly annualRevenue?: number;
}

export class VendorBusinessVO extends BaseVO<VendorBusinessVOProps> {
  private constructor(props: VendorBusinessVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorBusinessVOProps): VendorBusinessVO {
    const vo = new VendorBusinessVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorBusinessVOProps): VendorBusinessVO {
    return new VendorBusinessVO(props);
  }

  protected validate(): void {
    const v = this.value;
    const currentYear = new Date().getFullYear();

    if (v.establishedYear !== undefined) {
      if (!Number.isInteger(v.establishedYear)) {
        throw new ValidationError('establishedYear must be an integer', 'establishedYear');
      }
      if (v.establishedYear < 1800 || v.establishedYear > currentYear) {
        throw new ValidationError(
          `establishedYear must be between 1800 and ${currentYear}`,
          'establishedYear',
        );
      }
    }

    if (v.employeeCount !== undefined) {
      if (!Number.isInteger(v.employeeCount) || v.employeeCount < 0) {
        throw new ValidationError('employeeCount must be a non-negative integer', 'employeeCount');
      }
    }

    if (v.annualRevenue !== undefined) {
      if (!Number.isFinite(v.annualRevenue) || v.annualRevenue < 0) {
        throw new ValidationError('annualRevenue must be a non-negative number', 'annualRevenue');
      }
    }
  }

  // Getters
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get legalName(): BusinessNameVO { return this.value.legalName; }
  get businessType(): BusinessTypeVO { return this.value.businessType; }
  get vendorType(): VendorTypeVO { return this.value.vendorType; }
  get registrationNumber(): BusinessRegistrationVO | undefined { return this.value.registrationNumber; }
  get taxId(): string | undefined { return this.value.taxId; }
  get vatNumber(): string | undefined { return this.value.vatNumber; }
  get establishedYear(): number | undefined { return this.value.establishedYear; }
  get employeeCount(): number | undefined { return this.value.employeeCount; }
  get annualRevenue(): number | undefined { return this.value.annualRevenue; }

  // Predicates
  hasRegistrationNumber(): boolean { return this.registrationNumber !== undefined; }
  hasTaxId(): boolean { return this.taxId !== undefined; }
  hasVatNumber(): boolean { return this.vatNumber !== undefined; }
  hasEstablishedYear(): boolean { return this.establishedYear !== undefined; }
  hasEmployeeCount(): boolean { return this.employeeCount !== undefined; }
  hasAnnualRevenue(): boolean { return this.annualRevenue !== undefined; }

  /** Business age in years */
  get businessAge(): number | undefined {
    if (!this.establishedYear) return undefined;
    return new Date().getFullYear() - this.establishedYear;
  }

  /** Business is legally registered */
  isLegallyRegistered(): boolean {
    return this.hasRegistrationNumber() || this.hasTaxId();
  }

  /** Business is established (> 5 years) */
  isEstablished(): boolean {
    const age = this.businessAge;
    return age !== undefined && age >= 5;
  }

  /** Small business (<= 10 employees) */
  isSmallBusiness(): boolean {
    return this.employeeCount !== undefined && this.employeeCount <= 10;
  }

  /** Business profile complete enough for premium tiers */
  isCompleteForPremium(): boolean {
    return (
      this.isLegallyRegistered() &&
      this.hasEstablishedYear() &&
      this.hasEmployeeCount()
    );
  }
}
