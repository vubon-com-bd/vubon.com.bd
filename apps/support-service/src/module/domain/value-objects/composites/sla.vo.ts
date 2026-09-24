import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SlaIdVO } from '../primitives/sla-id.vo';
import { SlaTypeVO } from '../primitives/sla-type.vo';
import { SlaTargetVO } from '../primitives/sla-target.vo';
import { SlaStatusVO } from '../primitives/sla-status.vo';

export interface SlaProps {
  readonly id: SlaIdVO;
  readonly name: string;
  readonly type: SlaTypeVO;
  readonly target: SlaTargetVO;
  readonly status: SlaStatusVO;
  readonly businessHoursOnly: boolean;
}

export class SlaVO extends BaseVO<SlaProps> {
  private constructor(props: SlaProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SlaProps): SlaVO {
    return new SlaVO(props);
  }

  get id(): SlaIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get type(): SlaTypeVO { return this.value.type; }
  get target(): SlaTargetVO { return this.value.target; }
  get status(): SlaStatusVO { return this.value.status; }
  get businessHoursOnly(): boolean { return this.value.businessHoursOnly; }
}
