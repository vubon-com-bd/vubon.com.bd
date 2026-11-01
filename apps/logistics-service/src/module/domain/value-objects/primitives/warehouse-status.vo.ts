/**
 * WarehouseStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * State machine:
 *   active ⇄ inactive
 *   active → maintenance → active
 *   active → full → active
 *   any → closed
 *   closed → archived ✓ (final)
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { WAREHOUSE_STATUS } from '@vubon/shared-constants/logistics';

export type WarehouseStatusValue =
  (typeof WAREHOUSE_STATUS)[keyof typeof WAREHOUSE_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(WAREHOUSE_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<WarehouseStatusValue, readonly WarehouseStatusValue[]>
> = {
  active: ['inactive', 'maintenance', 'full', 'closed'],
  inactive: ['active', 'closed'],
  maintenance: ['active', 'closed'],
  full: ['active', 'closed'],
  closed: ['archived', 'active'],
  archived: [], // final
};

export class WarehouseStatusVO extends BaseStatusVO<WarehouseStatusValue> {
  private constructor(value: WarehouseStatusValue) {
    super(value);
  }

  static create(raw: string): WarehouseStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('WarehouseStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid WarehouseStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new WarehouseStatusVO(normalized as WarehouseStatusValue);
  }

  static reconstitute(raw: string): WarehouseStatusVO {
    return new WarehouseStatusVO(raw as WarehouseStatusValue);
  }

  static active(): WarehouseStatusVO {
    return new WarehouseStatusVO(WAREHOUSE_STATUS.ACTIVE);
  }

  isActive(): boolean { return this.value === WAREHOUSE_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === WAREHOUSE_STATUS.INACTIVE; }
  isMaintenance(): boolean { return this.value === WAREHOUSE_STATUS.MAINTENANCE; }
  isFull(): boolean { return this.value === WAREHOUSE_STATUS.FULL; }
  isClosed(): boolean { return this.value === WAREHOUSE_STATUS.CLOSED; }
  isArchived(): boolean { return this.value === WAREHOUSE_STATUS.ARCHIVED; }

  isFinal(): boolean { return this.isArchived(); }
  isOperational(): boolean { return this.isActive() || this.isFull(); }

  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as WarehouseStatusValue;
    return (VALID_TRANSITIONS[this.value] ?? []).includes(normalized);
  }
}
