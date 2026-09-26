import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ScheduleIdVO } from '../primitives/schedule-id.vo';
import { ScheduleStatusVO } from '../primitives/schedule-status.vo';
import { ScheduleTypeVO } from '../primitives/schedule-type.vo';
import { ScheduleFrequencyVO } from '../primitives/schedule-frequency.vo';
import { ScheduleTimeVO } from '../primitives/schedule-time.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface ScheduleProps {
  readonly id: ScheduleIdVO;
  readonly userId: UserIdVO;
  readonly type: ScheduleTypeVO;
  readonly status: ScheduleStatusVO;
  readonly frequency: ScheduleFrequencyVO;
  readonly nextRunAt: ScheduleTimeVO;
  readonly lastRunAt: ScheduleTimeVO | null;
}

export class ScheduleVO extends BaseVO<ScheduleProps> {
  private constructor(props: ScheduleProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ScheduleProps): ScheduleVO {
    return new ScheduleVO(props);
  }

  get id(): ScheduleIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): ScheduleTypeVO { return this.value.type; }
  get status(): ScheduleStatusVO { return this.value.status; }
  get frequency(): ScheduleFrequencyVO { return this.value.frequency; }
  get nextRunAt(): ScheduleTimeVO { return this.value.nextRunAt; }
  get lastRunAt(): ScheduleTimeVO | null { return this.value.lastRunAt; }
}
