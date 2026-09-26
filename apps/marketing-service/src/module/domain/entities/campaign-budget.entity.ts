import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { CampaignBudgetVO } from '../value-objects/primitives/campaign-budget.vo';
import { CampaignIdVO } from '../value-objects/primitives/campaign-id.vo';

export interface CampaignBudgetEntityProps {
  readonly campaignId: CampaignIdVO | null;
  readonly budget: CampaignBudgetVO;
  readonly spent: number;
}

export class CampaignBudgetEntity extends BaseEntity<string> {
  private readonly _campaignId: CampaignIdVO | null;
  private readonly _budget: CampaignBudgetVO;
  private readonly _spent: number;

  private constructor(
    id: string,
    props: CampaignBudgetEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._campaignId = props.campaignId;
    this._budget = props.budget;
    this._spent = props.spent;
  }

  static create(props: CampaignBudgetEntityProps): CampaignBudgetEntity {
    const now = new Date().toISOString();
    return new CampaignBudgetEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: CampaignBudgetEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CampaignBudgetEntity {
    return new CampaignBudgetEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get campaignId(): CampaignIdVO | null { return this._campaignId; }
  get budget(): CampaignBudgetVO { return this._budget; }
  get spent(): number { return this._spent; }
  get remaining(): number { return this._budget.amount - this._spent; }
}
