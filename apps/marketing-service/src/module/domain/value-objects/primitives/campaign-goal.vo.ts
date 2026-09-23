import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'awareness', 'engagement', 'conversion', 'retention', 'traffic', 'lead_generation', 'revenue',
]);

export class CampaignGoalVO extends BaseTypeVO<string> {
  static create(raw: string): CampaignGoalVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid CampaignGoal: ${raw}`);
    }
    return new CampaignGoalVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
