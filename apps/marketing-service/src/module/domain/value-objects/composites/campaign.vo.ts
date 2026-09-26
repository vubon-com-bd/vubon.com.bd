import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CampaignIdVO } from '../primitives/campaign-id.vo';
import { CampaignNameVO } from '../primitives/campaign-name.vo';
import { CampaignStatusVO } from '../primitives/campaign-status.vo';
import { CampaignTypeVO } from '../primitives/campaign-type.vo';
import { CampaignChannelVO } from '../primitives/campaign-channel.vo';
import { CampaignGoalVO } from '../primitives/campaign-goal.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface CampaignProps {
  readonly id: CampaignIdVO;
  readonly name: CampaignNameVO;
  readonly status: CampaignStatusVO;
  readonly type: CampaignTypeVO;
  readonly channel: CampaignChannelVO;
  readonly goal: CampaignGoalVO | null;
  readonly createdBy: UserIdVO;
  readonly startDate: Date | null;
  readonly endDate: Date | null;
}

export class CampaignVO extends BaseVO<CampaignProps> {
  private constructor(props: CampaignProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CampaignProps): CampaignVO {
    return new CampaignVO(props);
  }

  get id(): CampaignIdVO { return this.value.id; }
  get name(): CampaignNameVO { return this.value.name; }
  get status(): CampaignStatusVO { return this.value.status; }
  get type(): CampaignTypeVO { return this.value.type; }
  get channel(): CampaignChannelVO { return this.value.channel; }
  get goal(): CampaignGoalVO | null { return this.value.goal; }
  get createdBy(): UserIdVO { return this.value.createdBy; }
  get startDate(): Date | null { return this.value.startDate; }
  get endDate(): Date | null { return this.value.endDate; }
}
