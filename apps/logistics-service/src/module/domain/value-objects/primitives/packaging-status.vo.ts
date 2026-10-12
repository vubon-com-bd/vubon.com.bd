/**
 * PackagingStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { PACKAGING_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidPackagingStatusError } from '../../errors/packaging.errors.js';

const ALLOWED = Object.values(PACKAGING_STATUS) as readonly string[];

export class PackagingStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): PackagingStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidPackagingStatusError(String(raw));
    }
    return new PackagingStatusVO(raw);
  }

  static reconstitute(raw: string): PackagingStatusVO { return new PackagingStatusVO(raw); }

  static active(): PackagingStatusVO { return new PackagingStatusVO(PACKAGING_STATUS.ACTIVE); }
  static inactive(): PackagingStatusVO { return new PackagingStatusVO(PACKAGING_STATUS.INACTIVE); }
  static outOfStock(): PackagingStatusVO { return new PackagingStatusVO(PACKAGING_STATUS.OUT_OF_STOCK); }
  static discontinued(): PackagingStatusVO { return new PackagingStatusVO(PACKAGING_STATUS.DISCONTINUED); }

  isActive(): boolean { return this.value === PACKAGING_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === PACKAGING_STATUS.INACTIVE; }
  isOutOfStock(): boolean { return this.value === PACKAGING_STATUS.OUT_OF_STOCK; }
  isDiscontinued(): boolean { return this.value === PACKAGING_STATUS.DISCONTINUED; }

  isFinal(): boolean { return this.isDiscontinued(); }

  canBeUsed(): boolean { return this.isActive(); }
  needsRestock(): boolean { return this.isOutOfStock(); }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [PACKAGING_STATUS.ACTIVE]: [
        PACKAGING_STATUS.INACTIVE,
        PACKAGING_STATUS.OUT_OF_STOCK,
        PACKAGING_STATUS.DISCONTINUED,
      ],
      [PACKAGING_STATUS.INACTIVE]: [
        PACKAGING_STATUS.ACTIVE,
        PACKAGING_STATUS.DISCONTINUED,
      ],
      [PACKAGING_STATUS.OUT_OF_STOCK]: [
        PACKAGING_STATUS.ACTIVE,
        PACKAGING_STATUS.INACTIVE,
        PACKAGING_STATUS.DISCONTINUED,
      ],
      [PACKAGING_STATUS.DISCONTINUED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
