import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyKycCommand } from './verify-kyc.command.js';
import type { UserKycServiceInterface } from '../../services/interfaces/user-kyc.service.interface.js';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto.js';
import { USER_KYC_SERVICE } from '../../tokens.js';

@CommandHandler(VerifyKycCommand)
export class VerifyKycHandler
  extends BaseCommandHandler<VerifyKycCommand, UserKycResponseDTO>
  implements ICommandHandler<VerifyKycCommand> {
  readonly commandType = 'VerifyKycCommand';
  constructor(
    @Inject(USER_KYC_SERVICE)
    private readonly kycService: UserKycServiceInterface,
  ) { super(); }

  async execute(command: VerifyKycCommand): Promise<UserKycResponseDTO> {
    const entity = await this.kycService.approve(command.input);
    return this.kycService.toResponse(entity);
  }
}
