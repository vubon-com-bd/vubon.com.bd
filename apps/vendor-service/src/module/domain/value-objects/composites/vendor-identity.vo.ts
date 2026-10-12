/**
 * VendorIdentityVO — the vendor's core identity fields
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { VendorNameVO } from '../primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../primitives/vendor-slug.vo.js';

export interface VendorIdentityVOProps {
  readonly id: VendorIdVO;
  readonly name: VendorNameVO;
  readonly slug: VendorSlugVO;
  readonly displayName: VendorNameVO;
}

export class VendorIdentityVO extends BaseVO<VendorIdentityVOProps> {
  private constructor(props: VendorIdentityVOProps) {
    super(props);
  }

  static create(props: VendorIdentityVOProps): VendorIdentityVO {
    if (!(props.id instanceof VendorIdVO)) {
      throw new ValidationError('Identity requires a valid VendorIdVO', 'id');
    }
    if (!(props.name instanceof VendorNameVO)) {
      throw new ValidationError('Identity requires a valid VendorNameVO', 'name');
    }
    if (!(props.slug instanceof VendorSlugVO)) {
      throw new ValidationError('Identity requires a valid VendorSlugVO', 'slug');
    }
    if (!(props.displayName instanceof VendorNameVO)) {
      throw new ValidationError('Identity requires a valid displayName', 'displayName');
    }
    return new VendorIdentityVO(props);
  }

  static reconstitute(props: VendorIdentityVOProps): VendorIdentityVO {
    return new VendorIdentityVO(props);
  }

  get id(): VendorIdVO { return this.value.id; }
  get name(): VendorNameVO { return this.value.name; }
  get slug(): VendorSlugVO { return this.value.slug; }
  get displayName(): VendorNameVO { return this.value.displayName; }

  hasSameIdentityAs(other: VendorIdentityVO): boolean {
    return this.id.equals(other.id);
  }

  hasSameSlugAs(other: VendorIdentityVO): boolean {
    return this.slug.equals(other.slug);
  }

  withName(name: VendorNameVO): VendorIdentityVO {
    return new VendorIdentityVO({ ...this.value, name });
  }

  withDisplayName(displayName: VendorNameVO): VendorIdentityVO {
    return new VendorIdentityVO({ ...this.value, displayName });
  }
}
