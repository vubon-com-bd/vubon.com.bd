/**
 * PackagingType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PACKAGING_TYPE } from '@vubon/shared-constants/logistics';

export type PackagingTypeValue =
  (typeof PACKAGING_TYPE)[keyof typeof PACKAGING_TYPE];

const VALID_TYPES: readonly string[] = Object.values(PACKAGING_TYPE);

export class PackagingTypeVO extends BaseVO<PackagingTypeValue> {
  private constructor(value: PackagingTypeValue) {
    super(value);
  }

  static create(raw: string): PackagingTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('PackagingType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid PackagingType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new PackagingTypeVO(normalized as PackagingTypeValue);
  }

  static reconstitute(raw: string): PackagingTypeVO {
    return new PackagingTypeVO(raw as PackagingTypeValue);
  }

  isBox(): boolean { return this.value === PACKAGING_TYPE.BOX; }
  isEnvelope(): boolean { return this.value === PACKAGING_TYPE.ENVELOPE; }
  isBubbleWrap(): boolean { return this.value === PACKAGING_TYPE.BUBBLE_WRAP; }
  isPolyBag(): boolean { return this.value === PACKAGING_TYPE.POLY_BAG; }
  isPaperBag(): boolean { return this.value === PACKAGING_TYPE.PAPER_BAG; }
  isTube(): boolean { return this.value === PACKAGING_TYPE.TUBE; }
  isPallet(): boolean { return this.value === PACKAGING_TYPE.PALLET; }
  isCrate(): boolean { return this.value === PACKAGING_TYPE.CRATE; }
  isCustom(): boolean { return this.value === PACKAGING_TYPE.CUSTOM; }

  isFlexible(): boolean {
    return this.isPolyBag() || this.isPaperBag() || this.isBubbleWrap();
  }

  isRigid(): boolean {
    return this.isBox() || this.isTube() || this.isCrate() || this.isPallet();
  }
}
