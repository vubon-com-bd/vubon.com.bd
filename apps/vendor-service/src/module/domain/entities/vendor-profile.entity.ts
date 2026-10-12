/**
 * VendorProfileEntity — public-facing profile data (1:1 with Vendor)
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessDescriptionVO } from '../value-objects/primitives/business-description.vo.js';
import { VendorLogoVO } from '../value-objects/primitives/vendor-logo.vo.js';
import { VendorBannerVO } from '../value-objects/primitives/vendor-banner.vo.js';
import { VendorWebsiteVO } from '../value-objects/primitives/vendor-website.vo.js';

export interface VendorProfileEntityProps {
  readonly vendorId: string;
  readonly tagline?: string;
  readonly about?: BusinessDescriptionVO;
  readonly logo?: VendorLogoVO;
  readonly banner?: VendorBannerVO;
  readonly website?: VendorWebsiteVO;
  readonly socialLinks: Readonly<Record<string, string>>;
  readonly categories: readonly string[];
  readonly languages: readonly string[];
}

export class VendorProfileEntity extends BaseEntity<string> {
  private _tagline?: string;
  private _about?: BusinessDescriptionVO;
  private _logo?: VendorLogoVO;
  private _banner?: VendorBannerVO;
  private _website?: VendorWebsiteVO;
  private _socialLinks: Readonly<Record<string, string>>;
  private _categories: readonly string[];
  private _languages: readonly string[];

  private readonly _vendorId: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorProfileEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._tagline = props.tagline;
    this._about = props.about;
    this._logo = props.logo;
    this._banner = props.banner;
    this._website = props.website;
    this._socialLinks = props.socialLinks;
    this._categories = props.categories;
    this._languages = props.languages;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._tagline !== undefined && this._tagline.length > 160) {
      throw new ValidationError('Tagline cannot exceed 160 chars', 'tagline');
    }
    if (this._categories.length > 20) {
      throw new ValidationError('Categories cannot exceed 20 items', 'categories');
    }
    if (this._languages.length > 10) {
      throw new ValidationError('Languages cannot exceed 10 items', 'languages');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get tagline(): string | undefined { return this._tagline; }
  get about(): BusinessDescriptionVO | undefined { return this._about; }
  get logo(): VendorLogoVO | undefined { return this._logo; }
  get banner(): VendorBannerVO | undefined { return this._banner; }
  get website(): VendorWebsiteVO | undefined { return this._website; }
  get socialLinks(): Readonly<Record<string, string>> { return this._socialLinks; }
  get categories(): readonly string[] { return this._categories; }
  get languages(): readonly string[] { return this._languages; }

  hasLogo(): boolean { return this._logo !== undefined; }
  hasBanner(): boolean { return this._banner !== undefined; }
  hasAbout(): boolean { return this._about !== undefined && this._about.wordCount > 0; }

  isComplete(): boolean {
    return this.hasLogo() && this.hasAbout() && this._categories.length > 0;
  }

  updateTagline(tagline: string, now: string = new Date().toISOString()): void {
    if (typeof tagline !== 'string') {
      throw new ValidationError('Tagline must be a string', 'tagline');
    }
    const trimmed = tagline.trim();
    if (trimmed.length === 0 || trimmed.length > 160) {
      throw new ValidationError('Tagline must be 1-160 chars', 'tagline');
    }
    this._tagline = trimmed;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  updateAbout(about: BusinessDescriptionVO, now: string = new Date().toISOString()): void {
    if (!(about instanceof BusinessDescriptionVO)) {
      throw new ValidationError('About must be BusinessDescriptionVO', 'about');
    }
    this._about = about;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  updateLogo(logo: VendorLogoVO, now: string = new Date().toISOString()): void {
    if (!(logo instanceof VendorLogoVO)) {
      throw new ValidationError('Logo must be VendorLogoVO', 'logo');
    }
    this._logo = logo;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  updateBanner(banner: VendorBannerVO, now: string = new Date().toISOString()): void {
    if (!(banner instanceof VendorBannerVO)) {
      throw new ValidationError('Banner must be VendorBannerVO', 'banner');
    }
    this._banner = banner;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  updateCategories(categories: readonly string[], now: string = new Date().toISOString()): void {
    if (categories.length > 20) {
      throw new ValidationError('Categories cannot exceed 20 items', 'categories');
    }
    const unique = Array.from(new Set(categories.map((c) => c.trim()).filter((c) => c.length > 0)));
    this._categories = unique;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  addSocialLink(platform: string, url: string, now: string = new Date().toISOString()): void {
    if (!platform || !url) {
      throw new ValidationError('Social link requires platform and url', 'socialLinks');
    }
    this._socialLinks = { ...this._socialLinks, [platform]: url };
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    props: Omit<VendorProfileEntityProps, 'socialLinks' | 'categories' | 'languages'> & {
      socialLinks?: Readonly<Record<string, string>>;
      categories?: readonly string[];
      languages?: readonly string[];
    };
    now: string;
  }): VendorProfileEntity {
    return new VendorProfileEntity(params.id, params.now, params.now, {
      ...params.props,
      socialLinks: params.props.socialLinks ?? {},
      categories: params.props.categories ?? [],
      languages: params.props.languages ?? [],
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorProfileEntityProps;
    deletedAt?: string | null;
  }): VendorProfileEntity {
    return new VendorProfileEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
