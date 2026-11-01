import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ReverifyKycCommand } from './reverify-kyc.command.js';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto.js';
import type { UserKycServiceInterface } from '../../services/interfaces/user-kyc.service.interface.js';
import { USER_KYC_SERVICE } from '../../services/interfaces/user-kyc.service.interface.js';

@CommandHandler(ReverifyKycCommand)
export class ReverifyKycHandler
  extends BaseCommandHandler<ReverifyKycCommand, UserKycResponseDTO>
  implements ICommandHandler<ReverifyKycCommand>
{
  readonly commandType = 'user.reverify-kyc';
  constructor(@Inject(USER_KYC_SERVICE) private readonly service: UserKycServiceInterface) { super(); }
  async execute(command: ReverifyKycCommand): Promise<UserKycResponseDTO> {
    return this.service.submit(command.userId, command.input as never);
  }
}
