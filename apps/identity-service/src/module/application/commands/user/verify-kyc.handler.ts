import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyKycCommand } from './verify-kyc.command.js';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto.js';
import type { UserKycServiceInterface } from '../../services/interfaces/user-kyc.service.interface.js';
import { USER_KYC_SERVICE } from '../../services/interfaces/user-kyc.service.interface.js';

@CommandHandler(VerifyKycCommand)
export class VerifyKycHandler
  extends BaseCommandHandler<VerifyKycCommand, UserKycResponseDTO>
  implements ICommandHandler<VerifyKycCommand>
{
  readonly commandType = 'user.verify-kyc';
  constructor(@Inject(USER_KYC_SERVICE) private readonly service: UserKycServiceInterface) { super(); }

  async execute(command: VerifyKycCommand): Promise<UserKycResponseDTO> {
    return this.service.verify(command.input.kycId, command.reviewedBy);
  }
}
