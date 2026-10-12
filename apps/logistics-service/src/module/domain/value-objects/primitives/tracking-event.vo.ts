/**
 * TrackingEvent Value Object — event is terminal, but carries order + meaning
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TRACKING_EVENT } from '@vubon/shared-constants/logistics';
import { InvalidTrackingEventError } from '../../errors/tracking.errors.js';

const ALLOWED = Object.values(TRACKING_EVENT) as readonly string[];

export class TrackingEventVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): TrackingEventVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidTrackingEventError(String(raw));
    }
    return new TrackingEventVO(raw);
  }

  static reconstitute(raw: string): TrackingEventVO { return new TrackingEventVO(raw); }

  static orderPlaced(): TrackingEventVO { return new TrackingEventVO(TRACKING_EVENT.ORDER_PLACED); }
  static shipmentCreated(): TrackingEventVO { return new TrackingEventVO(TRACKING_EVENT.SHIPMENT_CREATED); }
  static labelGenerated(): TrackingEventVO { return new TrackingEventVO(TRACKING_EVENT.LABEL_GENERATED); }
  static pickedUp(): TrackingEventVO { return new TrackingEventVO(TRACKING_EVENT.PICKED_UP); }
  static inTransit(): TrackingEventVO { return new TrackingEventVO(TRACKING_EVENT.IN_TRANSIT); }
  static atHub(): TrackingEventVO { return new TrackingEventVO(TRACKING_EVENT.AT_HUB); }
  static outForDelivery(): TrackingEventVO { return new TrackingEventVO(TRACKING_EVENT.OUT_FOR_DELIVERY); }
  static deliveryAttempted(): TrackingEventVO { return new TrackingEventVO(TRACKING_EVENT.DELIVERY_ATTEMPTED); }
  static delivered(): TrackingEventVO { return new TrackingEventVO(TRACKING_EVENT.DELIVERED); }
  static failed(): TrackingEventVO { return new TrackingEventVO(TRACKING_EVENT.FAILED); }
  static returned(): TrackingEventVO { return new TrackingEventVO(TRACKING_EVENT.RETURNED); }
  static exception(): TrackingEventVO { return new TrackingEventVO(TRACKING_EVENT.EXCEPTION); }
  static customsCleared(): TrackingEventVO { return new TrackingEventVO(TRACKING_EVENT.CUSTOMS_CLEARED); }
  static customsHold(): TrackingEventVO { return new TrackingEventVO(TRACKING_EVENT.CUSTOMS_HOLD); }

  isDelivered(): boolean { return this.value === TRACKING_EVENT.DELIVERED; }
  isFailed(): boolean { return this.value === TRACKING_EVENT.FAILED; }
  isReturned(): boolean { return this.value === TRACKING_EVENT.RETURNED; }
  isException(): boolean { return this.value === TRACKING_EVENT.EXCEPTION; }
  isCustoms(): boolean {
    return [TRACKING_EVENT.CUSTOMS_CLEARED, TRACKING_EVENT.CUSTOMS_HOLD].includes(this.value as never);
  }

  isTerminal(): boolean {
    return [TRACKING_EVENT.DELIVERED, TRACKING_EVENT.RETURNED, TRACKING_EVENT.FAILED].includes(
      this.value as never,
    );
  }

  /** Customer should be notified for these events. */
  shouldNotifyCustomer(): boolean {
    return [
      TRACKING_EVENT.PICKED_UP,
      TRACKING_EVENT.OUT_FOR_DELIVERY,
      TRACKING_EVENT.DELIVERED,
      TRACKING_EVENT.FAILED,
      TRACKING_EVENT.EXCEPTION,
    ].includes(this.value as never);
  }

  /** Priority value for sorting latest events first (higher = more important). */
  get priorityRank(): number {
    const ranks: Record<string, number> = {
      [TRACKING_EVENT.DELIVERED]: 100,
      [TRACKING_EVENT.RETURNED]: 90,
      [TRACKING_EVENT.FAILED]: 80,
      [TRACKING_EVENT.EXCEPTION]: 70,
      [TRACKING_EVENT.OUT_FOR_DELIVERY]: 60,
      [TRACKING_EVENT.IN_TRANSIT]: 50,
      [TRACKING_EVENT.AT_HUB]: 40,
      [TRACKING_EVENT.PICKED_UP]: 30,
      [TRACKING_EVENT.LABEL_GENERATED]: 20,
      [TRACKING_EVENT.SHIPMENT_CREATED]: 10,
      [TRACKING_EVENT.ORDER_PLACED]: 5,
    };
    return ranks[this.value] ?? 0;
  }
}
