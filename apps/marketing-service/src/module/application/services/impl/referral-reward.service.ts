import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ReferralRewardServiceInterface } from '../interfaces/referral-reward.service.interface';
import type { ReferralRewardRepository } from '../../../domain/repositories/referral-reward.repository.interface';
import { ReferralRewardEntity } from '../../../domain/entities/referral-reward.entity';
import { ReferralRewardService as DomainService } from '../../../domain/services/referral-reward.service';

@Injectable()
export class ReferralRewardService
  extends BaseService<ReferralRewardEntity, string>
  implements ReferralRewardServiceInterface
{
  readonly name = 'ReferralRewardService';

  constructor(
    private readonly repo: ReferralRewardRepository,
    private readonly domain: DomainService,
  ) {
    super();
  }

  async calculate(baseAmount: number, rewardPercent: number): Promise<number> {
    void this.repo;
    return this.domain.calculateReward(baseAmount, rewardPercent);
  }
}
