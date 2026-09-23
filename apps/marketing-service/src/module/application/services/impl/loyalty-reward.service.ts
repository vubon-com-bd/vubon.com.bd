import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { LoyaltyRewardServiceInterface } from '../interfaces/loyalty-reward.service.interface';
import type { LoyaltyRewardRepository } from '../../../domain/repositories/loyalty-reward.repository.interface';
import { LoyaltyRewardEntity } from '../../../domain/entities/loyalty-reward.entity';
import type { LoyaltyRewardResponseDTO } from '../../dtos/responses/loyalty-reward-response.dto';

@Injectable()
export class LoyaltyRewardService
  extends BaseService<LoyaltyRewardEntity, string>
  implements LoyaltyRewardServiceInterface
{
  readonly name = 'LoyaltyRewardService';

  constructor(private readonly repo: LoyaltyRewardRepository) {
    super();
  }

  async findActive(): Promise<readonly LoyaltyRewardResponseDTO[]> {
    const entities = await this.repo.findActive();
    const result = entities.map((e) => {
      const rewardProps = e.reward as unknown as {
        id: { value: string };
        type: { value: string };
        value: { value: string };
        pointsCost: { value: number };
        status: string;
      };
      return {
        id: rewardProps.id.value,
        type: rewardProps.type.value,
        value: String(rewardProps.value.value),
        pointsCost: rewardProps.pointsCost.value,
        status: rewardProps.status,
      };
    });
    return result as unknown as readonly LoyaltyRewardResponseDTO[];
  }

  async claim(userId: string, rewardId: string): Promise<void> {
    void userId;
    const entity = await this.repo.findById(rewardId as never);
    void entity;
  }
}
