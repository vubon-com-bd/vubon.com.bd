import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AffiliateCommissionServiceInterface } from '../interfaces/affiliate-commission.service.interface';
import type { AffiliateCommissionRepository } from '../../../domain/repositories/affiliate-commission.repository.interface';
import { AffiliateCommissionEntity } from '../../../domain/entities/affiliate-commission.entity';
import { AffiliateCommissionService as DomainService } from '../../../domain/services/affiliate-commission.service';
import type { TrackConversionRequestDTO } from '../../dtos/requests/affiliate/track-conversion.dto';

@Injectable()
export class AffiliateCommissionService
  extends BaseService<AffiliateCommissionEntity, string>
  implements AffiliateCommissionServiceInterface
{
  readonly name = 'AffiliateCommissionService';

  constructor(
    private readonly repo: AffiliateCommissionRepository,
    private readonly domain: DomainService,
  ) {
    super();
  }

  async trackConversion(input: TrackConversionRequestDTO): Promise<void> {
    void input;
    void this.repo;
  }

  async calculate(orderAmount: number, commissionRate: number): Promise<number> {
    return this.domain.calculate(orderAmount, commissionRate);
  }
}
