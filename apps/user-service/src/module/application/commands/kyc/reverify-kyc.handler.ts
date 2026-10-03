/**
 * ReverifyKycHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReverifyKycCommand } from './reverify-kyc.command.js';
import { USER_KYC_REPOSITORY } from '@domain/repositories/user-kyc.repository.interface';
import type { UserKycRepository } from '@domain/repositories/user-kyc.repository.interface';
import { UserKycMapper } from '../../mappers/user-kyc.mapper.js';
import type { KycResponseDTO } from '../../dtos/responses/kyc-response.dto.js';
import {
  KycNotFoundApplicationError,
  KycVerificationFailedError,
} from '../../errors/kyc.errors.js';

@CommandHandler(ReverifyKycCommand)
export class ReverifyKycHandler
  implements ICommandHandler<ReverifyKycCommand, KycResponseDTO>
{
  constructor(
    @Inject(USER_KYC_REPOSITORY)
    private readonly kycRepo: UserKycRepository
  ) {}

  async execute(command: ReverifyKycCommand): Promise<KycResponseDTO> {
    const { kycId } = command;
    const kyc = await this.kycRepo.findById(kycId);
    if (!kyc) throw new KycNotFoundApplicationError(kycId);

    try {
      const now = new Date().toISOString();
      kyc.submit(now);
      await this.kycRepo.save(kyc);
      return UserKycMapper.toResponse(kyc);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new KycVerificationFailedError(kycId, reason);
    }
  }
}
