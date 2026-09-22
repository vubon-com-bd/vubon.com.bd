import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { VerifyKycCommand } from './verify-kyc.command';
import type { UserKycServiceInterface } from '../../services/interfaces/user-kyc.service.interface';
import type { KycResponseDTO } from '../../dtos/responses/kyc-response.dto';

@CommandHandler(VerifyKycCommand)
export class VerifyKycHandler
  extends BaseCommandHandler<VerifyKycCommand, KycResponseDTO>
  implements ICommandHandler<VerifyKycCommand>
{
  readonly commandType = 'user.kyc.verify';

  constructor(
    private readonly kycService: UserKycServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: VerifyKycCommand): Promise<KycResponseDTO> {
    return this.kycService.verify(command.userId, command.kycId);
  }
}
