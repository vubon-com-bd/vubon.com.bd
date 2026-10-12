/**
 * PackagingType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PACKAGING_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidPackagingTypeError } from '../../errors/packaging.errors.js';

const ALLOWED = Object.values(PACKAGING_TYPE) as readonly string[];

export class PackagingTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): PackagingTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidPackagingTypeError(String(raw));
    }
    return new PackagingTypeVO(raw);
  }

  static reconstitute(raw: string): PackagingTypeVO { return new PackagingTypeVO(raw); }

  static box(): PackagingTypeVO { return new PackagingTypeVO(PACKAGING_TYPE.BOX); }
  static envelope(): PackagingTypeVO { return new PackagingTypeVO(PACKAGING_TYPE.ENVELOPE); }
  static bubbleWrap(): PackagingTypeVO { return new PackagingTypeVO(PACKAGING_TYPE.BUBBLE_WRAP); }
  static polyBag(): PackagingTypeVO { return new PackagingTypeVO(PACKAGING_TYPE.POLY_BAG); }
  static paperBag(): PackagingTypeVO { return new PackagingTypeVO(PACKAGING_TYPE.PAPER_BAG); }
  static tube(): PackagingTypeVO { return new PackagingTypeVO(PACKAGING_TYPE.TUBE); }
  static pallet(): PackagingTypeVO { return new PackagingTypeVO(PACKAGING_TYPE.PALLET); }
  static crate(): PackagingTypeVO { return new PackagingTypeVO(PACKAGING_TYPE.CRATE); }
  static custom(): PackagingTypeVO { return new PackagingTypeVO(PACKAGING_TYPE.CUSTOM); }

  isBox(): boolean { return this.value === PACKAGING_TYPE.BOX; }
  isEnvelope(): boolean { return this.value === PACKAGING_TYPE.ENVELOPE; }
  isBubbleWrap(): boolean { return this.value === PACKAGING_TYPE.BUBBLE_WRAP; }
  isPolyBag(): boolean { return this.value === PACKAGING_TYPE.POLY_BAG; }
  isPaperBag(): boolean { return this.value === PACKAGING_TYPE.PAPER_BAG; }
  isTube(): boolean { return this.value === PACKAGING_TYPE.TUBE; }
  isPallet(): boolean { return this.value === PACKAGING_TYPE.PALLET; }
  isCrate(): boolean { return this.value === PACKAGING_TYPE.CRATE; }
  isCustom(): boolean { return this.value === PACKAGING_TYPE.CUSTOM; }

  /** Suitable for fragile items. */
  isFragileFriendly(): boolean {
    return [PACKAGING_TYPE.BUBBLE_WRAP, PACKAGING_TYPE.CRATE, PACKAGING_TYPE.BOX].includes(this.value as never);
  }

  /** Good for small/flat items. */
  isFlat(): boolean {
    return [PACKAGING_TYPE.ENVELOPE, PACKAGING_TYPE.POLY_BAG, PACKAGING_TYPE.PAPER_BAG].includes(this.value as never);
  }

  /** Bulk transport packaging. */
  isBulkTransport(): boolean {
    return [PACKAGING_TYPE.PALLET, PACKAGING_TYPE.CRATE].includes(this.value as never);
  }
}
