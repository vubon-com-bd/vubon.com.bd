/**
 * GetKycStatusHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetKycStatusQuery } from './get-kyc-status.query.js';
import { USER_KYC_REPOSITORY } from '@domain/repositories/user-kyc.repository.interface';
import type { UserKycRepository } from '@domain/repositories/user-kyc.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserKycMapper } from '../../mappers/user-kyc.mapper.js';
import type { KycResponseDTO } from '../../dtos/responses/kyc-response.dto.js';
import { KycNotFoundApplicationError } from '../../errors/kyc.errors.js';

@QueryHandler(GetKycStatusQuery)
export class GetKycStatusHandler
  implements IQueryHandler<GetKycStatusQuery, KycResponseDTO>
{
  constructor(
    @Inject(USER_KYC_REPOSITORY)
    private readonly kycRepo: UserKycRepository
  ) {}

  async execute(query: GetKycStatusQuery): Promise<KycResponseDTO> {
    const kyc = await this.kycRepo.findByUserId(UserIdVO.create(query.userId));
    if (!kyc) throw new KycNotFoundApplicationError(query.userId);
    return UserKycMapper.toResponse(kyc);
  }
}
