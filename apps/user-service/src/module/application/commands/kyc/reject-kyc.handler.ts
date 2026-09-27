/**
 * RejectKycHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RejectKycCommand } from './reject-kyc.command.js';
import { USER_KYC_REPOSITORY } from '@domain/repositories/user-kyc.repository.interface';
import type { UserKycRepository } from '@domain/repositories/user-kyc.repository.interface';
import { UserKycMapper } from '../../mappers/user-kyc.mapper.js';
import type { KycResponseDTO } from '../../dtos/responses/kyc-response.dto.js';
import {
  KycNotFoundApplicationError,
  KycVerificationFailedError,
} from '../../errors/kyc.errors.js';

@CommandHandler(RejectKycCommand)
export class RejectKycHandler
  implements ICommandHandler<RejectKycCommand, KycResponseDTO>
{
  constructor(
    @Inject(USER_KYC_REPOSITORY)
    private readonly kycRepo: UserKycRepository
  ) {}

  async execute(command: RejectKycCommand): Promise<KycResponseDTO> {
    const { kycId, reason } = command;
    const kyc = await this.kycRepo.findById(kycId);
    if (!kyc) throw new KycNotFoundApplicationError(kycId);

    try {
      kyc.reject(reason, new Date().toISOString());
      await this.kycRepo.save(kyc);
      return UserKycMapper.toResponse(kyc);
    } catch (err) {
      const errReason = err instanceof Error ? err.message : 'unknown error';
      throw new KycVerificationFailedError(kycId, errReason);
    }
  }
}
