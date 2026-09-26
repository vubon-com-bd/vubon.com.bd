import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TrackingIdVO } from '../primitives/tracking-id.vo';
import { TrackingEventVO as TrackingEventCodeVO } from '../primitives/tracking-event.vo';
import { LocationCodeVO } from '../primitives/location-code.vo';

export interface TrackingEventDetailProps {
  readonly trackingId: TrackingIdVO;
  readonly eventType: TrackingEventCodeVO;
  readonly location: LocationCodeVO | null;
  readonly note: string | null;
  readonly occurredAt: Date;
}

export class TrackingEventDetailVO extends BaseVO<TrackingEventDetailProps> {
  private constructor(props: TrackingEventDetailProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: TrackingEventDetailProps): TrackingEventDetailVO {
    return new TrackingEventDetailVO(props);
  }

  get trackingId(): TrackingIdVO { return this.value.trackingId; }
  get eventType(): TrackingEventCodeVO { return this.value.eventType; }
  get location(): LocationCodeVO | null { return this.value.location; }
  get note(): string | null { return this.value.note; }
  get occurredAt(): Date { return this.value.occurredAt; }
}
