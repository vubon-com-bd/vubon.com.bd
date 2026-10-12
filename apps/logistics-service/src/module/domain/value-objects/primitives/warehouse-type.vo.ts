/**
 * WarehouseType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { WAREHOUSE_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidWarehouseTypeError } from '../../errors/warehouse.errors.js';

const ALLOWED = Object.values(WAREHOUSE_TYPE) as readonly string[];

export class WarehouseTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): WarehouseTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidWarehouseTypeError(String(raw));
    }
    return new WarehouseTypeVO(raw);
  }

  static reconstitute(raw: string): WarehouseTypeVO { return new WarehouseTypeVO(raw); }

  static main(): WarehouseTypeVO { return new WarehouseTypeVO(WAREHOUSE_TYPE.MAIN); }
  static regional(): WarehouseTypeVO { return new WarehouseTypeVO(WAREHOUSE_TYPE.REGIONAL); }
  static local(): WarehouseTypeVO { return new WarehouseTypeVO(WAREHOUSE_TYPE.LOCAL); }
  static fulfillmentCenter(): WarehouseTypeVO { return new WarehouseTypeVO(WAREHOUSE_TYPE.FULFILLMENT_CENTER); }
  static crossDock(): WarehouseTypeVO { return new WarehouseTypeVO(WAREHOUSE_TYPE.CROSS_DOCK); }
  static coldStorage(): WarehouseTypeVO { return new WarehouseTypeVO(WAREHOUSE_TYPE.COLD_STORAGE); }
  static darkStore(): WarehouseTypeVO { return new WarehouseTypeVO(WAREHOUSE_TYPE.DARK_STORE); }

  isMain(): boolean { return this.value === WAREHOUSE_TYPE.MAIN; }
  isRegional(): boolean { return this.value === WAREHOUSE_TYPE.REGIONAL; }
  isLocal(): boolean { return this.value === WAREHOUSE_TYPE.LOCAL; }
  isFulfillmentCenter(): boolean { return this.value === WAREHOUSE_TYPE.FULFILLMENT_CENTER; }
  isCrossDock(): boolean { return this.value === WAREHOUSE_TYPE.CROSS_DOCK; }
  isColdStorage(): boolean { return this.value === WAREHOUSE_TYPE.COLD_STORAGE; }
  isDarkStore(): boolean { return this.value === WAREHOUSE_TYPE.DARK_STORE; }

  /** Central hub — receives long-haul, dispatches regional. */
  isHub(): boolean { return this.isMain() || this.isRegional(); }

  /** Handles cold-chain / temperature-sensitive goods. */
  supportsColdChain(): boolean { return this.isColdStorage(); }

  /** Fast turnaround / short-term storage. */
  isHighThroughput(): boolean {
    return this.isCrossDock() || this.isDarkStore() || this.isFulfillmentCenter();
  }

  /** Ships directly to end customers (last-mile origin). */
  isLastMileOrigin(): boolean {
    return this.isLocal() || this.isDarkStore() || this.isFulfillmentCenter();
  }

  /** Store capacity in m³ (heuristic default for provisioning). */
  get defaultCapacityM3(): number {
    const map: Record<string, number> = {
      [WAREHOUSE_TYPE.MAIN]: 100000,
      [WAREHOUSE_TYPE.REGIONAL]: 50000,
      [WAREHOUSE_TYPE.FULFILLMENT_CENTER]: 30000,
      [WAREHOUSE_TYPE.COLD_STORAGE]: 20000,
      [WAREHOUSE_TYPE.CROSS_DOCK]: 10000,
      [WAREHOUSE_TYPE.LOCAL]: 5000,
      [WAREHOUSE_TYPE.DARK_STORE]: 2000,
    };
    return map[this.value] ?? 5000;
  }
}
