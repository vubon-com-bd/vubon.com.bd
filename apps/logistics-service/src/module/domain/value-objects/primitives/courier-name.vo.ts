/**
 * CourierName Value Object — known courier vendors
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { COURIER_NAME } from '@vubon/shared-constants/logistics';
import { InvalidCourierCodeError } from '../../errors/courier.errors.js';

const ALLOWED = Object.values(COURIER_NAME) as readonly string[];

export class CourierNameVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): CourierNameVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidCourierCodeError(String(raw));
    }
    return new CourierNameVO(raw);
  }

  static reconstitute(raw: string): CourierNameVO { return new CourierNameVO(raw); }

  static pathao(): CourierNameVO { return new CourierNameVO(COURIER_NAME.PATHao); }
  static redx(): CourierNameVO { return new CourierNameVO(COURIER_NAME.REDX); }
  static steadfast(): CourierNameVO { return new CourierNameVO(COURIER_NAME.STEADFAST); }
  static paperfly(): CourierNameVO { return new CourierNameVO(COURIER_NAME.PAPERFLY); }
  static sundarban(): CourierNameVO { return new CourierNameVO(COURIER_NAME.SUNDARBAN); }
  static saParibahan(): CourierNameVO { return new CourierNameVO(COURIER_NAME.SA_PARIBAHAN); }
  static dhl(): CourierNameVO { return new CourierNameVO(COURIER_NAME.DHL); }
  static fedex(): CourierNameVO { return new CourierNameVO(COURIER_NAME.FEDEX); }
  static ups(): CourierNameVO { return new CourierNameVO(COURIER_NAME.UPS); }
  static aramex(): CourierNameVO { return new CourierNameVO(COURIER_NAME.ARAMEX); }
  static karatoya(): CourierNameVO { return new CourierNameVO(COURIER_NAME.KARATOYA); }
  static shohagh(): CourierNameVO { return new CourierNameVO(COURIER_NAME.SHOHAGH); }
  static trc(): CourierNameVO { return new CourierNameVO(COURIER_NAME.TRC); }
  static ecourier(): CourierNameVO { return new CourierNameVO(COURIER_NAME.ECURIER); }

  /** International couriers. */
  isInternational(): boolean {
    return [COURIER_NAME.DHL, COURIER_NAME.FEDEX, COURIER_NAME.UPS, COURIER_NAME.ARAMEX].includes(this.value as never);
  }

  /** Freight / inter-district bus-parcel couriers. */
  isFreight(): boolean {
    return [
      COURIER_NAME.SA_PARIBAHAN,
      COURIER_NAME.SUNDARBAN,
      COURIER_NAME.KARATOYA,
      COURIER_NAME.SHOHAGH,
      COURIER_NAME.TRC,
    ].includes(this.value as never);
  }

  /** Same-day / on-demand city couriers. */
  isOnDemand(): boolean {
    return [
      COURIER_NAME.PATHao,
      COURIER_NAME.REDX,
      COURIER_NAME.STEADFAST,
      COURIER_NAME.PAPERFLY,
    ].includes(this.value as never);
  }

  /** Local Bangladesh couriers (parcel + freight). */
  isLocalBD(): boolean {
    return [
      COURIER_NAME.PATHao,
      COURIER_NAME.REDX,
      COURIER_NAME.STEADFAST,
      COURIER_NAME.PAPERFLY,
      COURIER_NAME.SUNDARBAN,
      COURIER_NAME.SA_PARIBAHAN,
      COURIER_NAME.ECURIER,
      COURIER_NAME.KARATOYA,
      COURIER_NAME.SHOHAGH,
      COURIER_NAME.TRC,
    ].includes(this.value as never);
  }
}
