import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AffiliatePayoutEntity } from '../../../domain/entities/affiliate-payout.entity';
import type { RequestPayoutRequestDTO } from '../../dtos/requests/affiliate/request-payout.dto';
import type { AffiliatePayoutResponseDTO } from '../../dtos/responses/affiliate-payout-response.dto';

export interface AffiliatePayoutServiceInterface
  extends BaseServiceInterface<AffiliatePayoutEntity, string> {
  request(input: RequestPayoutRequestDTO): Promise<AffiliatePayoutResponseDTO>;
  process(payoutId: string): Promise<AffiliatePayoutResponseDTO>;
}
