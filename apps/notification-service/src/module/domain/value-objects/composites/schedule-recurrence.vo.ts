import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ScheduleFrequencyVO } from '../primitives/schedule-frequency.vo';

export interface ScheduleRecurrenceProps {
  readonly frequency: ScheduleFrequencyVO;
  readonly interval: number;
  readonly count: number | null;
  readonly until: Date | null;
}

export class ScheduleRecurrenceVO extends BaseVO<ScheduleRecurrenceProps> {
  private constructor(props: ScheduleRecurrenceProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ScheduleRecurrenceProps): ScheduleRecurrenceVO {
    return new ScheduleRecurrenceVO(props);
  }

  get frequency(): ScheduleFrequencyVO { return this.value.frequency; }
  get interval(): number { return this.value.interval; }
  get count(): number | null { return this.value.count; }
  get until(): Date | null { return this.value.until; }
}
