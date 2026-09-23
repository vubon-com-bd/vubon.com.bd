import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MarketingAutomationIdVO } from '../primitives/marketing-automation-id.vo';
import { AutomationTriggerVO } from '../primitives/automation-trigger.vo';

export interface MarketingWorkflowProps {
  readonly automationId: MarketingAutomationIdVO;
  readonly name: string;
  readonly trigger: AutomationTriggerVO;
  readonly steps: readonly Readonly<Record<string, unknown>>[];
  readonly status: string;
}

export class MarketingWorkflowVO extends BaseVO<MarketingWorkflowProps> {
  private constructor(props: MarketingWorkflowProps) {
    super(Object.freeze({
      ...props,
      steps: Object.freeze([...props.steps]),
    }));
  }

  static create(props: MarketingWorkflowProps): MarketingWorkflowVO {
    return new MarketingWorkflowVO(props);
  }

  get automationId(): MarketingAutomationIdVO { return this.value.automationId; }
  get name(): string { return this.value.name; }
  get trigger(): AutomationTriggerVO { return this.value.trigger; }
  get steps(): readonly Readonly<Record<string, unknown>>[] { return this.value.steps; }
  get status(): string { return this.value.status; }
}
