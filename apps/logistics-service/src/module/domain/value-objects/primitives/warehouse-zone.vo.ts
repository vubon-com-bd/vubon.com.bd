/**
 * WarehouseZone Value Object — internal functional zone of a warehouse
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { WAREHOUSE_ZONE } from '@vubon/shared-constants/logistics';
import { InvalidWarehouseZoneError } from '../../errors/warehouse.errors.js';

const ALLOWED = Object.values(WAREHOUSE_ZONE) as readonly string[];

export class WarehouseZoneVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): WarehouseZoneVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidWarehouseZoneError(String(raw));
    }
    return new WarehouseZoneVO(raw);
  }

  static reconstitute(raw: string): WarehouseZoneVO { return new WarehouseZoneVO(raw); }

  static receiving(): WarehouseZoneVO { return new WarehouseZoneVO(WAREHOUSE_ZONE.RECEIVING); }
  static storage(): WarehouseZoneVO { return new WarehouseZoneVO(WAREHOUSE_ZONE.STORAGE); }
  static picking(): WarehouseZoneVO { return new WarehouseZoneVO(WAREHOUSE_ZONE.PICKING); }
  static packing(): WarehouseZoneVO { return new WarehouseZoneVO(WAREHOUSE_ZONE.PACKING); }
  static shipping(): WarehouseZoneVO { return new WarehouseZoneVO(WAREHOUSE_ZONE.SHIPPING); }
  static returns(): WarehouseZoneVO { return new WarehouseZoneVO(WAREHOUSE_ZONE.RETURNS); }
  static quarantine(): WarehouseZoneVO { return new WarehouseZoneVO(WAREHOUSE_ZONE.QUARANTINE); }
  static dispatch(): WarehouseZoneVO { return new WarehouseZoneVO(WAREHOUSE_ZONE.DISPATCH); }

  isReceiving(): boolean { return this.value === WAREHOUSE_ZONE.RECEIVING; }
  isStorage(): boolean { return this.value === WAREHOUSE_ZONE.STORAGE; }
  isPicking(): boolean { return this.value === WAREHOUSE_ZONE.PICKING; }
  isPacking(): boolean { return this.value === WAREHOUSE_ZONE.PACKING; }
  isShipping(): boolean { return this.value === WAREHOUSE_ZONE.SHIPPING; }
  isReturns(): boolean { return this.value === WAREHOUSE_ZONE.RETURNS; }
  isQuarantine(): boolean { return this.value === WAREHOUSE_ZONE.QUARANTINE; }
  isDispatch(): boolean { return this.value === WAREHOUSE_ZONE.DISPATCH; }

  isInbound(): boolean { return this.isReceiving() || this.isQuarantine(); }
  isOutbound(): boolean { return this.isShipping() || this.isDispatch(); }
  isFulfillment(): boolean { return this.isPicking() || this.isPacking(); }
}
