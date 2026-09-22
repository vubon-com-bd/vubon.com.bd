import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RejectKycCommand } from './reject-kyc.command';
import type { UserKycServiceInterface } from '../../services/interfaces/user-kyc.service.interface';
import type { KycResponseDTO } from '../../dtos/responses/kyc-response.dto';

@CommandHandler(RejectKycCommand)
export class RejectKycHandler
  extends BaseCommandHandler<RejectKycCommand, KycResponseDTO>
  implements ICommandHandler<RejectKycCommand>
{
  readonly commandType = 'user.kyc.reject';

  constructor(
    private readonly kycService: UserKycServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RejectKycCommand): Promise<KycResponseDTO> {
    return this.kycService.reject(command.userId, command.kycId, command.reason);
  }
}
