import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RejectKycCommand } from './reject-kyc.command.js';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto.js';
import type { UserKycServiceInterface } from '../../services/interfaces/user-kyc.service.interface.js';
import { USER_KYC_SERVICE } from '../../services/interfaces/user-kyc.service.interface.js';

@CommandHandler(RejectKycCommand)
export class RejectKycHandler
  extends BaseCommandHandler<RejectKycCommand, UserKycResponseDTO>
  implements ICommandHandler<RejectKycCommand>
{
  readonly commandType = 'user.reject-kyc';
  constructor(@Inject(USER_KYC_SERVICE) private readonly service: UserKycServiceInterface) { super(); }

  async execute(command: RejectKycCommand): Promise<UserKycResponseDTO> {
    return this.service.reject(command.input.kycId, command.input.reason, command.reviewedBy);
  }
}
