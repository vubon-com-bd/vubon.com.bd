/**
 * VendorWarrantyEntity — vendor's default warranty settings
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_WARRANTY } from '@vubon/shared-constants/business';
import { WarrantyTypeVO } from '../value-objects/primitives/warranty-type.vo.js';
import { WarrantyPeriodDaysVO } from '../value-objects/primitives/warranty-period-days.vo.js';

export interface VendorWarrantyEntityProps {
  readonly vendorId: string;
  readonly defaultType: WarrantyTypeVO;
  readonly defaultPeriod: WarrantyPeriodDaysVO;
  readonly coversShipping: boolean;
  readonly requireProof: boolean;
  readonly autoRegister: boolean;
  readonly terms?: string;
  readonly exclusions: readonly string[];
}

export class VendorWarrantyEntity extends BaseEntity<string> {
  private _defaultType: WarrantyTypeVO;
  private _defaultPeriod: WarrantyPeriodDaysVO;
  private _coversShipping: boolean;
  private _requireProof: boolean;
  private _autoRegister: boolean;
  private _terms?: string;
  private _exclusions: string[];

  private readonly _vendorId: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorWarrantyEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._defaultType = props.defaultType;
    this._defaultPeriod = props.defaultPeriod;
    this._coversShipping = props.coversShipping;
    this._requireProof = props.requireProof;
    this._autoRegister = props.autoRegister;
    this._terms = props.terms;
    this._exclusions = [...props.exclusions];
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._defaultType.hasWarranty() && this._defaultPeriod.days > 0) {
      throw new ValidationError('NONE warranty type cannot have a positive period', 'defaultPeriod');
    }
    if (this._terms !== undefined && this._terms.length > 5000) {
      throw new ValidationError('Terms cannot exceed 5000 chars', 'terms');
    }
    if (this._exclusions.length > 50) {
      throw new ValidationError('Exclusions cannot exceed 50 items', 'exclusions');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get defaultType(): WarrantyTypeVO { return this._defaultType; }
  get defaultPeriod(): WarrantyPeriodDaysVO { return this._defaultPeriod; }
  get coversShipping(): boolean { return this._coversShipping; }
  get requireProof(): boolean { return this._requireProof; }
  get autoRegister(): boolean { return this._autoRegister; }
  get terms(): string | undefined { return this._terms; }
  get exclusions(): readonly string[] { return this._exclusions; }

  isWarrantyEnabled(): boolean { return this._defaultType.hasWarranty(); }
  isManufacturerWarranty(): boolean { return this._defaultType.isManufacturerBacked(); }
  isSellerWarranty(): boolean { return this._defaultType.isSellerBacked(); }

  /** Compute warranty expiry for a purchase. */
  calculateExpiry(purchasedAt: Date): Date {
    return this._defaultPeriod.calculateExpiry(purchasedAt);
  }

  /** Days remaining on a warranty starting at purchasedAt. */
  daysRemaining(purchasedAt: Date, now: Date = new Date()): number {
    return this._defaultPeriod.daysRemainingFrom(purchasedAt, now);
  }

  isExcluded(term: string): boolean {
    const lower = term.toLowerCase();
    return this._exclusions.some((e) => e.toLowerCase() === lower);
  }

  addExclusion(term: string, now: string = new Date().toISOString()): void {
    const trimmed = term.trim();
    if (!trimmed || this.isExcluded(trimmed)) return;
    if (this._exclusions.length >= 50) {
      throw new ValidationError('Exclusions cannot exceed 50 items', 'exclusions');
    }
    this._exclusions = [...this._exclusions, trimmed];
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  removeExclusion(term: string, now: string = new Date().toISOString()): void {
    const lower = term.toLowerCase();
    this._exclusions = this._exclusions.filter((e) => e.toLowerCase() !== lower);
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  updateDefaultType(type: WarrantyTypeVO, now: string = new Date().toISOString()): void {
    if (!type.hasWarranty() && this._defaultPeriod.days > 0) {
      this._defaultPeriod = WarrantyPeriodDaysVO.create(1);
    }
    this._defaultType = type;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  updateDefaultPeriod(period: WarrantyPeriodDaysVO, now: string = new Date().toISOString()): void {
    if (!this._defaultType.hasWarranty()) {
      throw new ValidationError('Cannot set period when warranty is disabled', 'defaultPeriod');
    }
    this._defaultPeriod = period;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  updateTerms(terms: string | undefined, now: string = new Date().toISOString()): void {
    if (terms !== undefined && terms.length > 5000) {
      throw new ValidationError('Terms cannot exceed 5000 chars', 'terms');
    }
    this._terms = terms;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    vendorId: string;
    now: string;
    overrides?: Partial<Omit<VendorWarrantyEntityProps, 'vendorId'>>;
  }): VendorWarrantyEntity {
    const defaults: VendorWarrantyEntityProps = {
      vendorId: params.vendorId,
      defaultType: WarrantyTypeVO.default(),
      defaultPeriod: WarrantyPeriodDaysVO.default(),
      coversShipping: VENDOR_WARRANTY.COVER_SHIPPING,
      requireProof: VENDOR_WARRANTY.REQUIRE_PROOF,
      autoRegister: VENDOR_WARRANTY.AUTO_REGISTER,
      exclusions: [],
    };
    return new VendorWarrantyEntity(params.id, params.now, params.now, {
      ...defaults,
      ...params.overrides,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorWarrantyEntityProps;
    deletedAt?: string | null;
  }): VendorWarrantyEntity {
    return new VendorWarrantyEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
  }
}
