import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { BroadcastIdVO } from '../primitives/broadcast-id.vo';
import { BroadcastStatusVO } from '../primitives/broadcast-status.vo';
import { BroadcastTypeVO } from '../primitives/broadcast-type.vo';
import { BroadcastAudienceVO } from '../primitives/broadcast-audience.vo';
import { TemplateIdVO } from '../primitives/template-id.vo';

export interface BroadcastProps {
  readonly id: BroadcastIdVO;
  readonly type: BroadcastTypeVO;
  readonly status: BroadcastStatusVO;
  readonly audience: BroadcastAudienceVO;
  readonly templateId: TemplateIdVO | null;
  readonly subject: string | null;
  readonly content: string;
  readonly scheduledAt: Date | null;
  readonly startedAt: Date | null;
  readonly completedAt: Date | null;
}

export class BroadcastVO extends BaseVO<BroadcastProps> {
  private constructor(props: BroadcastProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: BroadcastProps): BroadcastVO {
    return new BroadcastVO(props);
  }

  get id(): BroadcastIdVO { return this.value.id; }
  get type(): BroadcastTypeVO { return this.value.type; }
  get status(): BroadcastStatusVO { return this.value.status; }
  get audience(): BroadcastAudienceVO { return this.value.audience; }
  get templateId(): TemplateIdVO | null { return this.value.templateId; }
  get subject(): string | null { return this.value.subject; }
  get content(): string { return this.value.content; }
  get scheduledAt(): Date | null { return this.value.scheduledAt; }
  get startedAt(): Date | null { return this.value.startedAt; }
  get completedAt(): Date | null { return this.value.completedAt; }
}
