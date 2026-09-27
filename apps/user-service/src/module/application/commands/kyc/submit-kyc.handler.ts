/**
 * SubmitKycHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SubmitKycCommand } from './submit-kyc.command.js';
import { USER_KYC_REPOSITORY } from '@domain/repositories/user-kyc.repository.interface';
import type { UserKycRepository } from '@domain/repositories/user-kyc.repository.interface';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';
import { KycDocumentVO } from '@domain/value-objects/primitives/kyc-document.vo';
import { UserKycEntity } from '@domain/entities/user-kyc.entity';
import { KycEligibilityService } from '@domain/services/kyc-eligibility.service';
import type { KycResponseDTO } from '../../dtos/responses/kyc-response.dto.js';
import { UserKycMapper } from '../../mappers/user-kyc.mapper.js';
import {
  KycSubmissionFailedError,
} from '../../errors/kyc.errors.js';
import { UserNotFoundApplicationError } from '../../errors/user.errors.js';

@CommandHandler(SubmitKycCommand)
export class SubmitKycHandler
  implements ICommandHandler<SubmitKycCommand, KycResponseDTO>
{
  constructor(
    @Inject(USER_KYC_REPOSITORY)
    private readonly kycRepo: UserKycRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async execute(command: SubmitKycCommand): Promise<KycResponseDTO> {
    const payload = command.payload;
    const userIdVO = UserIdVO.create(payload.userId);

    const user = await this.userRepo.findById(userIdVO.value);
    if (!user) throw new UserNotFoundApplicationError(payload.userId);

    const existing = await this.kycRepo.findByUserId(userIdVO);
    KycEligibilityService.assertEligible(user, existing);

    try {
      const now = new Date().toISOString();
      const firstDoc = payload.documents[0];
      if (!firstDoc) {
        throw new Error('at least one document required');
      }

      const kyc = UserKycEntity.create({
        kycId: KycIdVO.create(crypto.randomUUID()),
        userId: userIdVO,
        document: KycDocumentVO.create(firstDoc.type),
        now,
      });

      kyc.submit(now);
      await this.kycRepo.save(kyc);
      return UserKycMapper.toResponse(kyc);
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown error';
      throw new KycSubmissionFailedError(payload.userId, reason);
    }
  }
}
