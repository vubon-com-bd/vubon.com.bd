/**
 * VendorVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor aggregate এর সব scalar field একসাথে immutable value হিসেবে।
 * Business invariants এই VO-তেই enforce করা হয়।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { VendorNameVO } from '../primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../primitives/vendor-slug.vo.js';
import { VendorStatusVO } from '../primitives/vendor-status.vo.js';
import { VendorTypeVO } from '../primitives/vendor-type.vo.js';
import { BusinessTypeVO } from '../primitives/business-type.vo.js';
import { VendorTierVO } from '../primitives/vendor-tier.vo.js';
import { BusinessNameVO } from '../primitives/business-name.vo.js';
import { BusinessDescriptionVO } from '../primitives/business-description.vo.js';
import { RatingValueVO } from '../primitives/rating-value.vo.js';

export interface VendorVOProps {
  readonly id: VendorIdVO;
  readonly userId: UserIdVO;
  readonly name: VendorNameVO;
  readonly slug: VendorSlugVO;
  readonly displayName: string;
  readonly description?: BusinessDescriptionVO;
  readonly type: VendorTypeVO;
  readonly businessType: BusinessTypeVO;
  readonly status: VendorStatusVO;
  readonly tier: VendorTierVO;
  readonly legalName?: BusinessNameVO;
  readonly email: string;
  readonly phone?: string;
  readonly website?: string;
  readonly logoUrl?: string;
  readonly bannerUrl?: string;
  readonly rating: RatingValueVO;
  readonly totalSales: number;
  readonly totalOrders: number;
  readonly isVerified: boolean;
  readonly isFeatured: boolean;
  readonly joinedAt: string;
  readonly approvedAt?: string;
}

export class VendorVO extends BaseVO<VendorVOProps> {
  private constructor(props: VendorVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorVOProps): VendorVO {
    const vo = new VendorVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorVOProps): VendorVO {
    return new VendorVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!v.email || !REGEX.EMAIL.test(v.email)) {
      throw new ValidationError('Vendor email must be valid', 'email');
    }
    if (v.phone && !REGEX.PHONE_BD.test(v.phone) && !REGEX.PHONE_INTL.test(v.phone)) {
      throw new ValidationError('Vendor phone must be a valid BD or international number', 'phone');
    }
    if (v.website && !REGEX.URL.test(v.website)) {
      throw new ValidationError('Vendor website must be a valid URL', 'website');
    }
    if (v.logoUrl && !REGEX.URL.test(v.logoUrl)) {
      throw new ValidationError('Vendor logoUrl must be a valid URL', 'logoUrl');
    }
    if (v.bannerUrl && !REGEX.URL.test(v.bannerUrl)) {
      throw new ValidationError('Vendor bannerUrl must be a valid URL', 'bannerUrl');
    }
    if (!Number.isInteger(v.totalSales) || v.totalSales < 0) {
      throw new ValidationError('Vendor totalSales must be a non-negative integer', 'totalSales');
    }
    if (!Number.isInteger(v.totalOrders) || v.totalOrders < 0) {
      throw new ValidationError('Vendor totalOrders must be a non-negative integer', 'totalOrders');
    }
    if (v.isFeatured && !v.isVerified) {
      throw new ValidationError('Featured vendor must be verified', 'isFeatured');
    }
    if (v.approvedAt && v.status.isPending()) {
      throw new ValidationError('Pending vendor cannot have approvedAt', 'approvedAt');
    }
  }

  // ─── Getters ───
  get id(): VendorIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get name(): VendorNameVO { return this.value.name; }
  get slug(): VendorSlugVO { return this.value.slug; }
  get displayName(): string { return this.value.displayName; }
  get description(): BusinessDescriptionVO | undefined { return this.value.description; }
  get type(): VendorTypeVO { return this.value.type; }
  get businessType(): BusinessTypeVO { return this.value.businessType; }
  get status(): VendorStatusVO { return this.value.status; }
  get tier(): VendorTierVO { return this.value.tier; }
  get legalName(): BusinessNameVO | undefined { return this.value.legalName; }
  get email(): string { return this.value.email; }
  get phone(): string | undefined { return this.value.phone; }
  get website(): string | undefined { return this.value.website; }
  get logoUrl(): string | undefined { return this.value.logoUrl; }
  get bannerUrl(): string | undefined { return this.value.bannerUrl; }
  get rating(): RatingValueVO { return this.value.rating; }
  get totalSales(): number { return this.value.totalSales; }
  get totalOrders(): number { return this.value.totalOrders; }
  get isVerified(): boolean { return this.value.isVerified; }
  get isFeatured(): boolean { return this.value.isFeatured; }
  get joinedAt(): string { return this.value.joinedAt; }
  get approvedAt(): string | undefined { return this.value.approvedAt; }

  // ─── Predicates ───
  isActive(): boolean { return this.status.isActive(); }
  isPending(): boolean { return this.status.isPending(); }
  isSuspended(): boolean { return this.status.isSuspended(); }
  isBlocked(): boolean { return this.status.isBlocked(); }
  isDeleted(): boolean { return this.status.isDeleted(); }
  isEditable(): boolean { return this.status.isEditable(); }
  isVisible(): boolean { return this.status.isVisible(); }
  isOperational(): boolean { return this.status.isOperational(); }

  hasWebsite(): boolean { return this.website !== undefined; }
  hasLogo(): boolean { return this.logoUrl !== undefined; }
  hasBanner(): boolean { return this.bannerUrl !== undefined; }
  hasDescription(): boolean { return this.description !== undefined; }
  hasLegalName(): boolean { return this.legalName !== undefined; }
  hasPhone(): boolean { return this.phone !== undefined; }

  hasSales(): boolean { return this.totalSales > 0; }
  hasOrders(): boolean { return this.totalOrders > 0; }
  hasRating(): boolean { return !this.rating.isEmpty(); }

  /** Average order value (safe division) */
  get averageOrderValue(): number {
    if (this.totalOrders === 0) return 0;
    return Math.round((this.totalSales / this.totalOrders) * 100) / 100;
  }

  /** Vendor meets featured requirements */
  meetsFeaturedCriteria(): boolean {
    return this.isVerified && this.rating.isPositive() && this.totalOrders >= 100;
  }
}
