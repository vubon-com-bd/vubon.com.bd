import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ReferralEntity } from '../../../domain/entities/referral.entity';
import type { CreateReferralRequestDTO } from '../../dtos/requests/referral/create-referral.dto';
import type { TrackReferralRequestDTO } from '../../dtos/requests/referral/track-referral.dto';
import type { ReferralResponseDTO } from '../../dtos/responses/referral-response.dto';

export interface ReferralServiceInterface
  extends BaseServiceInterface<ReferralEntity, string> {
  create(input: CreateReferralRequestDTO): Promise<ReferralResponseDTO>;
  track(input: TrackReferralRequestDTO): Promise<void>;
  redeem(referralId: string, userId: string): Promise<void>;
}
