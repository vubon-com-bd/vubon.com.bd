/**
 * InventoryLocationStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * State machine:
 *   active ⇄ inactive
 *   active → quarantine → active
 *   any → archived ✓ (final)
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type InventoryLocationStatusValue =
  | 'active'
  | 'inactive'
  | 'quarantine'
  | 'archived';

const VALID_STATUSES: readonly InventoryLocationStatusValue[] = [
  'active',
  'inactive',
  'quarantine',
  'archived',
];

const VALID_TRANSITIONS: Readonly<
  Record<InventoryLocationStatusValue, readonly InventoryLocationStatusValue[]>
> = {
  active: ['inactive', 'quarantine', 'archived'],
  inactive: ['active', 'archived'],
  quarantine: ['active', 'archived'],
  archived: [], // final
};

export class InventoryLocationStatusVO extends BaseStatusVO<InventoryLocationStatusValue> {
  private constructor(value: InventoryLocationStatusValue) {
    super(value);
  }

  static create(raw: string): InventoryLocationStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('InventoryLocationStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized as InventoryLocationStatusValue)) {
      throw new ValidationError(
        `Invalid InventoryLocationStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new InventoryLocationStatusVO(normalized as InventoryLocationStatusValue);
  }

  static reconstitute(raw: string): InventoryLocationStatusVO {
    return new InventoryLocationStatusVO(raw as InventoryLocationStatusValue);
  }

  static active(): InventoryLocationStatusVO {
    return new InventoryLocationStatusVO('active');
  }

  isActive(): boolean { return this.value === 'active'; }
  isInactive(): boolean { return this.value === 'inactive'; }
  isQuarantine(): boolean { return this.value === 'quarantine'; }
  isArchived(): boolean { return this.value === 'archived'; }

  isFinal(): boolean { return this.isArchived(); }
  isUsable(): boolean { return this.isActive(); }

  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as InventoryLocationStatusValue;
    return (VALID_TRANSITIONS[this.value] ?? []).includes(normalized);
  }
}
