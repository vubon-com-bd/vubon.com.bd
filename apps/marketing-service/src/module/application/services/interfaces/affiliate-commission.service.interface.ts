import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AffiliateCommissionEntity } from '../../../domain/entities/affiliate-commission.entity';
import type { TrackConversionRequestDTO } from '../../dtos/requests/affiliate/track-conversion.dto';

export interface AffiliateCommissionServiceInterface
  extends BaseServiceInterface<AffiliateCommissionEntity, string> {
  trackConversion(input: TrackConversionRequestDTO): Promise<void>;
  calculate(orderAmount: number, commissionRate: number): Promise<number>;
}
