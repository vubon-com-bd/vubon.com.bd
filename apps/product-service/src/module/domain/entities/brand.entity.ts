/**
 * BrandEntity — Aggregate Root
 * @module product-service/domain/entities
 *
 * Business rules:
 * - Slug unique
 * - Cannot delete brand with active products
 * - Logo URL must be valid if present
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BRAND, BRAND_STATUS } from '@vubon/shared-constants/business/product';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BrandIdVO } from '../value-objects/primitives/brand-id.vo.js';
import { BrandNameVO } from '../value-objects/primitives/brand-name.vo.js';
import { BrandSlugVO } from '../value-objects/primitives/brand-slug.vo.js';
import { BrandLogoVO } from '../value-objects/primitives/brand-logo.vo.js';
import {
  BrandCreatedEvent,
  BrandUpdatedEvent,
  BrandActivatedEvent,
  BrandDeactivatedEvent,
  BrandDeletedEvent,
} from '../events/brand.events.js';

export interface BrandEntityProps {
  readonly name: BrandNameVO;
  readonly slug: BrandSlugVO;
  readonly description?: string;
  readonly logo: BrandLogoVO;
  readonly bannerUrl?: string;
  readonly website?: string;
  readonly status: string;
  readonly isFeatured: boolean;
  readonly productCount: number;
  readonly country?: string;
}

export class BrandEntity extends AggregateRoot<string> {
  private _name: BrandNameVO;
  private _slug: BrandSlugVO;
  private _description?: string;
  private _logo: BrandLogoVO;
  private _bannerUrl?: string;
  private _website?: string;
  private _status: string;
  private _isFeatured: boolean;
  private _productCount: number;
  private _country?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: BrandEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._slug = props.slug;
    this._description = props.description;
    this._logo = props.logo;
    this._bannerUrl = props.bannerUrl;
    this._website = props.website;
    this._status = props.status;
    this._isFeatured = props.isFeatured;
    this._productCount = props.productCount;
    this._country = props.country;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._description && this._description.length > BRAND.DESCRIPTION_MAX_LENGTH) {
      throw new ValidationError(
        `Description cannot exceed ${BRAND.DESCRIPTION_MAX_LENGTH} chars`,
        'description',
      );
    }
    if (this._website && this._website.length > BRAND.WEBSITE_MAX_LENGTH) {
      throw new ValidationError('Website URL too long', 'website');
    }
    if (this._productCount < 0) {
      throw new ValidationError('productCount cannot be negative', 'productCount');
    }
  }

  // Getters
  get name(): BrandNameVO { return this._name; }
  get slug(): BrandSlugVO { return this._slug; }
  get description(): string | undefined { return this._description; }
  get logo(): BrandLogoVO { return this._logo; }
  get bannerUrl(): string | undefined { return this._bannerUrl; }
  get website(): string | undefined { return this._website; }
  get status(): string { return this._status; }
  get isFeatured(): boolean { return this._isFeatured; }
  get productCount(): number { return this._productCount; }
  get country(): string | undefined { return this._country; }

  // Business methods
  public update(
    changes: {
      name?: BrandNameVO;
      description?: string;
      logo?: BrandLogoVO;
      bannerUrl?: string;
      website?: string;
      country?: string;
    },
    changedBy: string,
  ): void {
    const changedFields: string[] = [];

    if (changes.name && !changes.name.equals(this._name)) {
      this._name = changes.name;
      changedFields.push('name');
    }
    if (changes.description !== undefined && changes.description !== this._description) {
      if (changes.description.length > BRAND.DESCRIPTION_MAX_LENGTH) {
        throw new ValidationError('Description too long', 'description');
      }
      this._description = changes.description;
      changedFields.push('description');
    }
    if (changes.logo && !changes.logo.equals(this._logo)) {
      this._logo = changes.logo;
      changedFields.push('logo');
    }
    if (changes.bannerUrl !== undefined) {
      this._bannerUrl = changes.bannerUrl;
      changedFields.push('bannerUrl');
    }
    if (changes.website !== undefined) {
      this._website = changes.website;
      changedFields.push('website');
    }
    if (changes.country !== undefined) {
      this._country = changes.country;
      changedFields.push('country');
    }

    if (changedFields.length === 0) return;

    this.addDomainEvent(new BrandUpdatedEvent({
      aggregateId: this.id,
      payload: { brandId: this.id, changedFields },
      version: this.version + 1,
      metadata: { userId: changedBy },
    }));
    this.incrementVersion();
  }

  public activate(changedBy: string): void {
    if (this._status === BRAND_STATUS.ACTIVE) return;
    this._status = BRAND_STATUS.ACTIVE;
    this.addDomainEvent(new BrandActivatedEvent({
      aggregateId: this.id,
      payload: { brandId: this.id, status: this._status, changedBy },
      version: this.version + 1,
      metadata: { userId: changedBy },
    }));
    this.incrementVersion();
  }

  public deactivate(changedBy: string): void {
    if (this._status === BRAND_STATUS.INACTIVE) return;
    this._status = BRAND_STATUS.INACTIVE;
    this.addDomainEvent(new BrandDeactivatedEvent({
      aggregateId: this.id,
      payload: { brandId: this.id, status: this._status, changedBy },
      version: this.version + 1,
      metadata: { userId: changedBy },
    }));
    this.incrementVersion();
  }

  public feature(): void {
    if (this._isFeatured) return;
    this._isFeatured = true;
    this.incrementVersion();
  }

  public unfeature(): void {
    if (!this._isFeatured) return;
    this._isFeatured = false;
    this.incrementVersion();
  }

  public incrementProductCount(): void {
    this._productCount += 1;
  }

  public decrementProductCount(): void {
    this._productCount = Math.max(0, this._productCount - 1);
  }

  public softDelete(deletedBy: string, now?: string): void {
    if (this._productCount > 0) {
      throw new BusinessRuleError(
        `Brand "${this.id}" has ${this._productCount} products and cannot be deleted`,
        'BRAND_HAS_PRODUCTS',
        { brandId: this.id, productCount: this._productCount },
      );
    }
    this._status = BRAND_STATUS.DELETED;
    // BaseEntity.deletedAt is readonly; use reflection to set it
    (this as unknown as { deletedAt: string | null }).deletedAt =
      now ?? new Date().toISOString();
    this.addDomainEvent(new BrandDeletedEvent({
      aggregateId: this.id,
      payload: { brandId: this.id, deletedBy },
      version: this.version + 1,
      metadata: { userId: deletedBy },
    }));
    this.incrementVersion();
  }

  // Queries
  public isActive(): boolean {
    return this._status === BRAND_STATUS.ACTIVE && !this.isDeleted();
  }

  public hasProducts(): boolean {
    return this._productCount > 0;
  }

  public hasLogo(): boolean {
    return this._logo.value.length > 0;
  }

  public toIdVO(): BrandIdVO {
    return BrandIdVO.reconstitute(this.id);
  }

  // Factories
  public static create(params: {
    id: string;
    props: BrandEntityProps;
    now: string;
  }): BrandEntity {
    const entity = new BrandEntity(params.id, params.now, params.now, params.props);
    entity.addDomainEvent(new BrandCreatedEvent({
      aggregateId: params.id,
      payload: {
        brandId: params.id,
        name: params.props.name.value,
        slug: params.props.slug.value,
      },
      version: 1,
    }));
    entity.incrementVersion();
    return entity;
  }

  public static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: BrandEntityProps;
  }): BrandEntity {
    return new BrandEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
