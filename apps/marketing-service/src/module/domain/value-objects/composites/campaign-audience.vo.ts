import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { LeadSourceVO } from '../primitives/lead-source.vo';

export interface CampaignAudienceProps {
  readonly targetType: string;
  readonly targetUserIds: readonly UserIdVO[];
  readonly source: LeadSourceVO | null;
  readonly estimated: number;
}

export class CampaignAudienceVO extends BaseVO<CampaignAudienceProps> {
  private constructor(props: CampaignAudienceProps) {
    super(Object.freeze({
      ...props,
      targetUserIds: Object.freeze([...props.targetUserIds]),
    }));
  }

  static create(props: CampaignAudienceProps): CampaignAudienceVO {
    return new CampaignAudienceVO(props);
  }

  get targetType(): string { return this.value.targetType; }
  get targetUserIds(): readonly UserIdVO[] { return this.value.targetUserIds; }
  get source(): LeadSourceVO | null { return this.value.source; }
  get estimated(): number { return this.value.estimated; }
}
