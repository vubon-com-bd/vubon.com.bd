import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AutomationIdVO } from '../primitives/automation-id.vo';
import { AutomationTypeVO } from '../primitives/automation-type.vo';
import { AutomationStatusVO } from '../primitives/automation-status.vo';

export interface SupportAutomationProps {
  readonly id: AutomationIdVO;
  readonly name: string;
  readonly type: AutomationTypeVO;
  readonly trigger: string;
  readonly action: string;
  readonly status: AutomationStatusVO;
}

export class SupportAutomationVO extends BaseVO<SupportAutomationProps> {
  private constructor(props: SupportAutomationProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SupportAutomationProps): SupportAutomationVO {
    return new SupportAutomationVO(props);
  }

  get id(): AutomationIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get type(): AutomationTypeVO { return this.value.type; }
  get trigger(): string { return this.value.trigger; }
  get action(): string { return this.value.action; }
  get status(): AutomationStatusVO { return this.value.status; }
}
