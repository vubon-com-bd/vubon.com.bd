/**
 * SupportAutomationVO — Automation job composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { AutomationIdVO } from '../primitives/automation-id.vo';
import { AutomationTypeVO } from '../primitives/automation-type.vo';
import { AutomationStatusVO } from '../primitives/automation-status.vo';

export interface SupportAutomationVOProps {
  readonly id: AutomationIdVO;
  readonly type: AutomationTypeVO;
  readonly status: AutomationStatusVO;
  readonly name: string;
  readonly schedule?: string;
  readonly lastRunAt?: string;
}

export class SupportAutomationVO extends BaseVO<Readonly<SupportAutomationVOProps>> {
  private constructor(props: SupportAutomationVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SupportAutomationVOProps): SupportAutomationVO {
    if (!props.id || !props.name) {
      throw new ValidationError(
        'SupportAutomationVO requires id and name',
        'supportAutomation',
      );
    }
    return new SupportAutomationVO(props);
  }

  get id(): AutomationIdVO {
    return this.value.id;
  }

  get name(): string {
    return this.value.name;
  }

  get isEnabled(): boolean {
    return this.value.status.isEnabled();
  }

  get isScheduled(): boolean {
    return this.value.type.isTimeBased();
  }

  get hasSchedule(): boolean {
    return typeof this.value.schedule === 'string' && this.value.schedule.length > 0;
  }

  get hasEverRun(): boolean {
    return this.value.lastRunAt !== undefined;
  }
}
