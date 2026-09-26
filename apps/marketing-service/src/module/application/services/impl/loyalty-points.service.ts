import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { LoyaltyPointsServiceInterface } from '../interfaces/loyalty-points.service.interface';
import type { LoyaltyPointsRepository } from '../../../domain/repositories/loyalty-points.repository.interface';
import { LoyaltyPointsEntity } from '../../../domain/entities/loyalty-points.entity';
import { LoyaltyPointsService as DomainService } from '../../../domain/services/loyalty-points.service';

@Injectable()
export class LoyaltyPointsService
  extends BaseService<LoyaltyPointsEntity, string>
  implements LoyaltyPointsServiceInterface
{
  readonly name = 'LoyaltyPointsService';

  constructor(
    private readonly repo: LoyaltyPointsRepository,
    private readonly domain: DomainService,
  ) {
    super();
  }

  async calculateEarned(orderAmount: number, pointsPerUnit: number): Promise<number> {
    void this.repo;
    return this.domain.calculateEarned(orderAmount, pointsPerUnit);
  }

  async calculateTierFromPoints(points: number): Promise<string> {
    return this.domain.calculateTierFromPoints(points);
  }
}
