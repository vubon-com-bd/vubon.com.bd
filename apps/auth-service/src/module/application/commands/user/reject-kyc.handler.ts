import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RejectKycCommand } from './reject-kyc.command';
import type { UserKycServiceInterface } from '../../services/interfaces/user-kyc.service.interface';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto';

@CommandHandler(RejectKycCommand)
export class RejectKycHandler
  extends BaseCommandHandler<RejectKycCommand, UserKycResponseDTO>
  implements ICommandHandler<RejectKycCommand>
{
  readonly commandType = 'user.reject-kyc';

  constructor(
    @Inject('UserKycService') private readonly kycService: UserKycServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RejectKycCommand): Promise<UserKycResponseDTO> {
    return this.kycService.reject(command.userId, command.kycId, command.reason);
  }
}
