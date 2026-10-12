/**
 * RouteType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ROUTE_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidRouteTypeError } from '../../errors/route.errors.js';

const ALLOWED = Object.values(ROUTE_TYPE) as readonly string[];

export class RouteTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): RouteTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidRouteTypeError(String(raw));
    }
    return new RouteTypeVO(raw);
  }

  static reconstitute(raw: string): RouteTypeVO { return new RouteTypeVO(raw); }

  static delivery(): RouteTypeVO { return new RouteTypeVO(ROUTE_TYPE.DELIVERY); }
  static pickup(): RouteTypeVO { return new RouteTypeVO(ROUTE_TYPE.PICKUP); }
  static mixed(): RouteTypeVO { return new RouteTypeVO(ROUTE_TYPE.MIXED); }
  static return(): RouteTypeVO { return new RouteTypeVO(ROUTE_TYPE.RETURN); }
  static transfer(): RouteTypeVO { return new RouteTypeVO(ROUTE_TYPE.TRANSFER); }
  static lineHaul(): RouteTypeVO { return new RouteTypeVO(ROUTE_TYPE.LINE_HAUL); }
  static lastMile(): RouteTypeVO { return new RouteTypeVO(ROUTE_TYPE.LAST_MILE); }
  static firstMile(): RouteTypeVO { return new RouteTypeVO(ROUTE_TYPE.FIRST_MILE); }

  isDelivery(): boolean { return this.value === ROUTE_TYPE.DELIVERY; }
  isPickup(): boolean { return this.value === ROUTE_TYPE.PICKUP; }
  isMixed(): boolean { return this.value === ROUTE_TYPE.MIXED; }
  isReturn(): boolean { return this.value === ROUTE_TYPE.RETURN; }
  isTransfer(): boolean { return this.value === ROUTE_TYPE.TRANSFER; }
  isLineHaul(): boolean { return this.value === ROUTE_TYPE.LINE_HAUL; }
  isLastMile(): boolean { return this.value === ROUTE_TYPE.LAST_MILE; }
  isFirstMile(): boolean { return this.value === ROUTE_TYPE.FIRST_MILE; }

  /** Customer-facing route (last-mile delivery to recipient). */
  isCustomerFacing(): boolean { return this.isLastMile() || this.isDelivery(); }

  /** Internal warehouse-to-warehouse. */
  isInternal(): boolean { return this.isTransfer() || this.isLineHaul(); }

  /** Multi-stop routes. */
  isMultiStop(): boolean { return !this.isLineHaul(); }
}
