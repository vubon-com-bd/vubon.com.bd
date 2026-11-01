/**
 * VendorProfileEntity — Child Entity
 * @module vendor-service/domain/entities
 *
 * Vendor profile data — public-facing, editable।
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  VendorProfileVO,
  type VendorProfileVOProps,
} from '../value-objects/composites/vendor-profile.vo.js';
import { VendorNameVO } from '../value-objects/primitives/vendor-name.vo.js';
import { BusinessDescriptionVO } from '../value-objects/primitives/business-description.vo.js';

export interface VendorProfileEntityProps {
  readonly vo: VendorProfileVO;
}

export class VendorProfileEntity extends BaseEntity<string> {
  private _vo: VendorProfileVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorProfileEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorProfileVO { return this._vo; }
  get vendorId() { return this._vo.vendorId; }
  get name() { return this._vo.name; }
  get slug() { return this._vo.slug; }
  get displayName(): string { return this._vo.displayName; }
  get tagline(): string | undefined { return this._vo.tagline; }
  get description() { return this._vo.description; }
  get logoUrl(): string | undefined { return this._vo.logoUrl; }
  get bannerUrl(): string | undefined { return this._vo.bannerUrl; }
  get website(): string | undefined { return this._vo.website; }
  get socialLinks(): readonly string[] { return this._vo.socialLinks; }
  get rating() { return this._vo.rating; }
  get reviewCount(): number { return this._vo.reviewCount; }
  get isFeatured(): boolean { return this._vo.isFeatured; }
  get isVerified(): boolean { return this._vo.isVerified; }

  // ═══ Predicates ═══
  isComplete(): boolean { return this._vo.isComplete(); }
  hasLogo(): boolean { return this._vo.hasLogo(); }
  hasBanner(): boolean { return this._vo.hasBanner(); }
  hasDescription(): boolean { return this._vo.hasDescription(); }
  hasTagline(): boolean { return this._vo.hasTagline(); }
  hasSocialLinks(): boolean { return this._vo.hasSocialLinks(); }
  shouldShowRating(): boolean { return this._vo.shouldShowRating(); }

  // ═══ Business Actions ═══
  updateBasics(
    patch: {
      name?: VendorNameVO;
      displayName?: string;
      tagline?: string;
      description?: BusinessDescriptionVO;
    },
    now: string = new Date().toISOString(),
  ): void {
    const current = this._vo.value;
    const nextProps: VendorProfileVOProps = {
      ...current,
      name: patch.name ?? current.name,
      displayName: patch.displayName ?? current.displayName,
      tagline: patch.tagline ?? current.tagline,
      description: patch.description ?? current.description,
    };
    this._vo = VendorProfileVO.create(nextProps);
    this.touch(now);
  }

  updateMedia(
    patch: { logoUrl?: string; bannerUrl?: string },
    now: string = new Date().toISOString(),
  ): void {
    const current = this._vo.value;
    const nextProps: VendorProfileVOProps = {
      ...current,
      logoUrl: patch.logoUrl ?? current.logoUrl,
      bannerUrl: patch.bannerUrl ?? current.bannerUrl,
    };
    this._vo = VendorProfileVO.create(nextProps);
    this.touch(now);
  }

  updateWebsite(website: string | undefined, now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorProfileVO.create({
      ...current,
      website,
    });
    this.touch(now);
  }

  setSocialLinks(
    links: readonly string[],
    now: string = new Date().toISOString(),
  ): void {
    const current = this._vo.value;
    this._vo = VendorProfileVO.create({
      ...current,
      socialLinks: links,
    });
    this.touch(now);
  }

  addSocialLink(link: string, now: string = new Date().toISOString()): void {
    if (this._vo.socialLinks.includes(link)) return;
    const links = [...this._vo.socialLinks, link];
    this.setSocialLinks(links, now);
  }

  removeSocialLink(link: string, now: string = new Date().toISOString()): void {
    const links = this._vo.socialLinks.filter((l) => l !== link);
    if (links.length === this._vo.socialLinks.length) return;
    this.setSocialLinks(links, now);
  }

  markFeatured(now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorProfileVO.create({ ...current, isFeatured: true });
    this.touch(now);
  }

  markUnfeatured(now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorProfileVO.create({ ...current, isFeatured: false });
    this.touch(now);
  }

  markVerified(now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorProfileVO.create({ ...current, isVerified: true });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorProfileVO;
    now: string;
  }): VendorProfileEntity {
    return new VendorProfileEntity(
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
    props: VendorProfileEntityProps;
  }): VendorProfileEntity {
    return new VendorProfileEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
