import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CampaignBudgetVO } from '../primitives/campaign-budget.vo';
import { CampaignChannelVO } from '../primitives/campaign-channel.vo';

export interface CampaignBudgetCompositeProps {
  readonly budget: CampaignBudgetVO;
  readonly channel: CampaignChannelVO;
}

export class CampaignBudgetCompositeVO extends BaseVO<CampaignBudgetCompositeProps> {
  private constructor(props: CampaignBudgetCompositeProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CampaignBudgetCompositeProps): CampaignBudgetCompositeVO {
    return new CampaignBudgetCompositeVO(props);
  }

  get budget(): CampaignBudgetVO { return this.value.budget; }
  get channel(): CampaignChannelVO { return this.value.channel; }
}
