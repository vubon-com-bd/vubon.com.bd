import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { LoyaltyTierServiceInterface } from '../interfaces/loyalty-tier.service.interface';
import type { LoyaltyTierRepository } from '../../../domain/repositories/loyalty-tier.repository.interface';
import { LoyaltyTierEntity } from '../../../domain/entities/loyalty-tier.entity';
import { LoyaltyTierVO } from '../../../domain/value-objects/primitives/loyalty-tier.vo';
import { LoyaltyTierService as DomainService } from '../../../domain/services/loyalty-tier.service';
import type { LoyaltyTierResponseDTO } from '../../dtos/responses/loyalty-tier-response.dto';

@Injectable()
export class LoyaltyTierService
  extends BaseService<LoyaltyTierEntity, string>
  implements LoyaltyTierServiceInterface
{
  readonly name = 'LoyaltyTierService';

  constructor(
    private readonly repo: LoyaltyTierRepository,
    private readonly domain: DomainService,
  ) {
    super();
  }

  async isUpgrade(current: string, target: string): Promise<boolean> {
    return this.domain.isUpgrade(
      LoyaltyTierVO.create(current),
      LoyaltyTierVO.create(target),
    );
  }

  async findByTier(tier: string): Promise<LoyaltyTierResponseDTO | null> {
    const entity = await this.repo.findByTier(LoyaltyTierVO.create(tier));
    if (!entity) return null;
    return {
      tier: entity.tier.tier.value,
      minPoints: entity.tier.minPoints.value,
      benefits: [...entity.tier.benefits],
    } as unknown as LoyaltyTierResponseDTO;
  }
}
