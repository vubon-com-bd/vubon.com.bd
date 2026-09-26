import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MarketingAutomationIdVO } from '../primitives/marketing-automation-id.vo';
import { AutomationTypeVO } from '../primitives/automation-type.vo';
import { AutomationTriggerVO } from '../primitives/automation-trigger.vo';

export interface MarketingAutomationProps {
  readonly id: MarketingAutomationIdVO;
  readonly name: string;
  readonly type: AutomationTypeVO;
  readonly trigger: AutomationTriggerVO;
  readonly status: string;
}

export class MarketingAutomationVO extends BaseVO<MarketingAutomationProps> {
  private constructor(props: MarketingAutomationProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: MarketingAutomationProps): MarketingAutomationVO {
    return new MarketingAutomationVO(props);
  }

  get id(): MarketingAutomationIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get type(): AutomationTypeVO { return this.value.type; }
  get trigger(): AutomationTriggerVO { return this.value.trigger; }
  get status(): string { return this.value.status; }
}
