/**
 * RouteType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ROUTE_TYPE } from '@vubon/shared-constants/logistics';

export type RouteTypeValue =
  (typeof ROUTE_TYPE)[keyof typeof ROUTE_TYPE];

const VALID_TYPES: readonly string[] = Object.values(ROUTE_TYPE);

export class RouteTypeVO extends BaseVO<RouteTypeValue> {
  private constructor(value: RouteTypeValue) {
    super(value);
  }

  static create(raw: string): RouteTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('RouteType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid RouteType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new RouteTypeVO(normalized as RouteTypeValue);
  }

  static reconstitute(raw: string): RouteTypeVO {
    return new RouteTypeVO(raw as RouteTypeValue);
  }

  isDelivery(): boolean { return this.value === ROUTE_TYPE.DELIVERY; }
  isPickup(): boolean { return this.value === ROUTE_TYPE.PICKUP; }
  isMixed(): boolean { return this.value === ROUTE_TYPE.MIXED; }
  isReturn(): boolean { return this.value === ROUTE_TYPE.RETURN; }
  isTransfer(): boolean { return this.value === ROUTE_TYPE.TRANSFER; }
  isLineHaul(): boolean { return this.value === ROUTE_TYPE.LINE_HAUL; }
  isLastMile(): boolean { return this.value === ROUTE_TYPE.LAST_MILE; }
  isFirstMile(): boolean { return this.value === ROUTE_TYPE.FIRST_MILE; }

  isLongDistance(): boolean {
    return this.isLineHaul();
  }
}
