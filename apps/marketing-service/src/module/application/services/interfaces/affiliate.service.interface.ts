import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AffiliateEntity } from '../../../domain/entities/affiliate.entity';
import type { RegisterAffiliateRequestDTO } from '../../dtos/requests/affiliate/register-affiliate.dto';
import type { ApproveAffiliateRequestDTO } from '../../dtos/requests/affiliate/approve-affiliate.dto';
import type { AffiliateResponseDTO } from '../../dtos/responses/affiliate-response.dto';

export interface AffiliateServiceInterface
  extends BaseServiceInterface<AffiliateEntity, string> {
  register(input: RegisterAffiliateRequestDTO): Promise<AffiliateResponseDTO>;
  approve(input: ApproveAffiliateRequestDTO): Promise<AffiliateResponseDTO>;
  findByCode(code: string): Promise<AffiliateResponseDTO | null>;
}
