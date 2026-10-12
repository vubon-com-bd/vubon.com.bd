/**
 * WarehouseStatus Value Object — state machine
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { WAREHOUSE_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidWarehouseStatusError } from '../../errors/warehouse.errors.js';

const ALLOWED = Object.values(WAREHOUSE_STATUS) as readonly string[];

export class WarehouseStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): WarehouseStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidWarehouseStatusError(String(raw));
    }
    return new WarehouseStatusVO(raw);
  }

  static reconstitute(raw: string): WarehouseStatusVO { return new WarehouseStatusVO(raw); }

  static active(): WarehouseStatusVO { return new WarehouseStatusVO(WAREHOUSE_STATUS.ACTIVE); }
  static inactive(): WarehouseStatusVO { return new WarehouseStatusVO(WAREHOUSE_STATUS.INACTIVE); }
  static maintenance(): WarehouseStatusVO { return new WarehouseStatusVO(WAREHOUSE_STATUS.MAINTENANCE); }
  static full(): WarehouseStatusVO { return new WarehouseStatusVO(WAREHOUSE_STATUS.FULL); }
  static closed(): WarehouseStatusVO { return new WarehouseStatusVO(WAREHOUSE_STATUS.CLOSED); }
  static archived(): WarehouseStatusVO { return new WarehouseStatusVO(WAREHOUSE_STATUS.ARCHIVED); }

  isActive(): boolean { return this.value === WAREHOUSE_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === WAREHOUSE_STATUS.INACTIVE; }
  isMaintenance(): boolean { return this.value === WAREHOUSE_STATUS.MAINTENANCE; }
  isFull(): boolean { return this.value === WAREHOUSE_STATUS.FULL; }
  isClosed(): boolean { return this.value === WAREHOUSE_STATUS.CLOSED; }
  isArchived(): boolean { return this.value === WAREHOUSE_STATUS.ARCHIVED; }

  isFinal(): boolean { return this.isArchived(); }

  /** Warehouse can accept new inbound shipments. */
  canAcceptInbound(): boolean { return this.isActive(); }

  /** Warehouse can dispatch outbound. */
  canDispatch(): boolean { return this.isActive() || this.isFull(); }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [WAREHOUSE_STATUS.ACTIVE]: [
        WAREHOUSE_STATUS.INACTIVE,
        WAREHOUSE_STATUS.MAINTENANCE,
        WAREHOUSE_STATUS.FULL,
        WAREHOUSE_STATUS.CLOSED,
        WAREHOUSE_STATUS.ARCHIVED,
      ],
      [WAREHOUSE_STATUS.INACTIVE]: [
        WAREHOUSE_STATUS.ACTIVE,
        WAREHOUSE_STATUS.ARCHIVED,
      ],
      [WAREHOUSE_STATUS.MAINTENANCE]: [
        WAREHOUSE_STATUS.ACTIVE,
        WAREHOUSE_STATUS.CLOSED,
        WAREHOUSE_STATUS.ARCHIVED,
      ],
      [WAREHOUSE_STATUS.FULL]: [
        WAREHOUSE_STATUS.ACTIVE,
        WAREHOUSE_STATUS.INACTIVE,
      ],
      [WAREHOUSE_STATUS.CLOSED]: [
        WAREHOUSE_STATUS.ACTIVE,
        WAREHOUSE_STATUS.ARCHIVED,
      ],
      [WAREHOUSE_STATUS.ARCHIVED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
