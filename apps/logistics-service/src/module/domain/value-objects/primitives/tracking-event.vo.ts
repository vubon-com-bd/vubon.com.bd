import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class TrackingEventVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TrackingEventVO {
    BaseCodeVO.validateNonEmpty(raw, 'TrackingEvent');
    return new TrackingEventVO(raw);
  }
}
