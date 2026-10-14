/**
 * VendorBusinessEntity — Child Entity
 * @module vendor-service/domain/entities
 *
 * Vendor legal/business identity info।
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  VendorBusinessVO,
  type VendorBusinessVOProps,
} from '../value-objects/composites/vendor-business.vo.js';
import { BusinessNameVO } from '../value-objects/primitives/business-name.vo.js';
import { BusinessRegistrationVO } from '../value-objects/primitives/business-registration.vo.js';

export interface VendorBusinessEntityProps {
  readonly vo: VendorBusinessVO;
}

export class VendorBusinessEntity extends BaseEntity<string> {
  private _vo: VendorBusinessVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorBusinessEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorBusinessVO { return this._vo; }
  get vendorId() { return this._vo.vendorId; }
  get legalName() { return this._vo.legalName; }
  get businessType() { return this._vo.businessType; }
  get vendorType() { return this._vo.vendorType; }
  get registrationNumber() { return this._vo.registrationNumber; }
  get taxId(): string | undefined { return this._vo.taxId; }
  get vatNumber(): string | undefined { return this._vo.vatNumber; }
  get establishedYear(): number | undefined { return this._vo.establishedYear; }
  get employeeCount(): number | undefined { return this._vo.employeeCount; }
  get annualRevenue(): number | undefined { return this._vo.annualRevenue; }

  // ═══ Predicates ═══
  isLegallyRegistered(): boolean { return this._vo.isLegallyRegistered(); }
  isEstablished(): boolean { return this._vo.isEstablished(); }
  isSmallBusiness(): boolean { return this._vo.isSmallBusiness(); }
  isCompleteForPremium(): boolean { return this._vo.isCompleteForPremium(); }
  hasRegistrationNumber(): boolean { return this._vo.hasRegistrationNumber(); }
  hasTaxId(): boolean { return this._vo.hasTaxId(); }
  hasVatNumber(): boolean { return this._vo.hasVatNumber(); }

  get businessAge(): number | undefined { return this._vo.businessAge; }

  // ═══ Business Actions ═══
  updateLegalName(
    name: BusinessNameVO,
    now: string = new Date().toISOString(),
  ): void {
    const current = this._vo.value;
    this._vo = VendorBusinessVO.create({ ...current, legalName: name });
    this.touch(now);
  }

  setRegistrationNumber(
    reg: BusinessRegistrationVO | undefined,
    now: string = new Date().toISOString(),
  ): void {
    const current = this._vo.value;
    this._vo = VendorBusinessVO.create({ ...current, registrationNumber: reg });
    this.touch(now);
  }

  setTaxId(taxId: string | undefined, now: string = new Date().toISOString()): void {
    if (taxId && taxId.length > 50) {
      throw new ValidationError('Tax ID max 50 chars', 'taxId');
    }
    const current = this._vo.value;
    this._vo = VendorBusinessVO.create({ ...current, taxId });
    this.touch(now);
  }

  setVatNumber(vat: string | undefined, now: string = new Date().toISOString()): void {
    if (vat && vat.length > 50) {
      throw new ValidationError('VAT number max 50 chars', 'vatNumber');
    }
    const current = this._vo.value;
    this._vo = VendorBusinessVO.create({ ...current, vatNumber: vat });
    this.touch(now);
  }

  setEstablishedYear(
    year: number | undefined,
    now: string = new Date().toISOString(),
  ): void {
    const current = this._vo.value;
    this._vo = VendorBusinessVO.create({ ...current, establishedYear: year });
    this.touch(now);
  }

  setEmployeeCount(
    count: number | undefined,
    now: string = new Date().toISOString(),
  ): void {
    const current = this._vo.value;
    this._vo = VendorBusinessVO.create({ ...current, employeeCount: count });
    this.touch(now);
  }

  setAnnualRevenue(
    revenue: number | undefined,
    now: string = new Date().toISOString(),
  ): void {
    const current = this._vo.value;
    this._vo = VendorBusinessVO.create({ ...current, annualRevenue: revenue });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorBusinessVO;
    now: string;
  }): VendorBusinessEntity {
    return new VendorBusinessEntity(
      params.id,
      params.now,
      params.now,
      { vo: params.vo },
      null,
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorBusinessEntityProps;
  }): VendorBusinessEntity {
    return new VendorBusinessEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
