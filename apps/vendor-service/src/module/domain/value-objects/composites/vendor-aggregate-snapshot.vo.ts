/**
 * VendorAggregateSnapshotVO — complete vendor state as a single VO
 * @module vendor-service/src/module/domain/value-objects/composites
 *
 * Used for:
 *  - Read-model projections
 *  - Domain event payload snapshots
 *  - External API response caching
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VendorIdentityVO } from './vendor-identity.vo.js';
import { VendorContactVO } from './vendor-contact.vo.js';
import { VendorBusinessInfoVO } from './vendor-business-info.vo.js';
import { VendorLocationVO } from './vendor-location.vo.js';
import { VendorBrandingVO } from './vendor-branding.vo.js';
import { VendorStatusVO } from '../primitives/vendor-status.vo.js';
import { VendorTierVO } from '../primitives/vendor-tier.vo.js';

export interface VendorAggregateSnapshotVOProps {
  readonly identity: VendorIdentityVO;
  readonly status: VendorStatusVO;
  readonly tier: VendorTierVO;
  readonly contact: VendorContactVO;
  readonly businessInfo: VendorBusinessInfoVO;
  readonly location: VendorLocationVO;
  readonly branding: VendorBrandingVO;
  readonly snapshotAt: string;
}

export class VendorAggregateSnapshotVO extends BaseVO<VendorAggregateSnapshotVOProps> {
  private constructor(props: VendorAggregateSnapshotVOProps) {
    super(props);
  }

  static create(props: VendorAggregateSnapshotVOProps): VendorAggregateSnapshotVO {
    if (!(props.identity instanceof VendorIdentityVO)) {
      throw new ValidationError('Snapshot requires VendorIdentityVO', 'identity');
    }
    if (!(props.status instanceof VendorStatusVO)) {
      throw new ValidationError('Snapshot requires VendorStatusVO', 'status');
    }
    if (!(props.tier instanceof VendorTierVO)) {
      throw new ValidationError('Snapshot requires VendorTierVO', 'tier');
    }
    if (!(props.contact instanceof VendorContactVO)) {
      throw new ValidationError('Snapshot requires VendorContactVO', 'contact');
    }
    if (!(props.businessInfo instanceof VendorBusinessInfoVO)) {
      throw new ValidationError('Snapshot requires VendorBusinessInfoVO', 'businessInfo');
    }
    if (!(props.location instanceof VendorLocationVO)) {
      throw new ValidationError('Snapshot requires VendorLocationVO', 'location');
    }
    if (!(props.branding instanceof VendorBrandingVO)) {
      throw new ValidationError('Snapshot requires VendorBrandingVO', 'branding');
    }
    if (Number.isNaN(Date.parse(props.snapshotAt))) {
      throw new ValidationError('snapshotAt must be a valid ISO timestamp', 'snapshotAt');
    }
    return new VendorAggregateSnapshotVO(props);
  }

  static reconstitute(props: VendorAggregateSnapshotVOProps): VendorAggregateSnapshotVO {
    return new VendorAggregateSnapshotVO(props);
  }

  get identity(): VendorIdentityVO { return this.value.identity; }
  get status(): VendorStatusVO { return this.value.status; }
  get tier(): VendorTierVO { return this.value.tier; }
  get contact(): VendorContactVO { return this.value.contact; }
  get businessInfo(): VendorBusinessInfoVO { return this.value.businessInfo; }
  get location(): VendorLocationVO { return this.value.location; }
  get branding(): VendorBrandingVO { return this.value.branding; }
  get snapshotAt(): string { return this.value.snapshotAt; }

  get vendorId(): string {
    return this.value.identity.id.value;
  }

  /** Is this vendor operational (active or approved)? */
  isOperational(): boolean {
    return this.value.status.isOperational();
  }

  /** Can this vendor be shown publicly? */
  isPubliclyVisible(): boolean {
    return this.value.status.isActive() && this.value.branding.isBranded();
  }

  /** All onboarding info present? */
  isFullyOnboarded(): boolean {
    return (
      this.value.contact.isFullyComplete()
      && this.value.branding.isComplete()
      && this.value.location.hasPostalCode()
    );
  }

  /** Lightweight summary for lists. */
  toSummary(): {
    id: string;
    name: string;
    slug: string;
    status: string;
    tier: string;
    displayName: string;
    logoUrl?: string;
  } {
    return {
      id: this.value.identity.id.value,
      name: this.value.identity.name.value,
      slug: this.value.identity.slug.value,
      status: this.value.status.value,
      tier: this.value.tier.value,
      displayName: this.value.identity.displayName.value,
      logoUrl: this.value.branding.logo?.value,
    };
  }
}
