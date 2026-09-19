import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SubmitKycCommand } from './submit-kyc.command';
import type { UserKycServiceInterface } from '../../services/interfaces/user-kyc.service.interface';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto';
import type { SubmitKycRequestDTO } from '../../dtos/requests/user/submit-kyc.dto';

@CommandHandler(SubmitKycCommand)
export class SubmitKycHandler
  extends BaseCommandHandler<SubmitKycCommand, UserKycResponseDTO>
  implements ICommandHandler<SubmitKycCommand>
{
  readonly commandType = 'user.submit-kyc';

  constructor(
    private readonly kycService: UserKycServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SubmitKycCommand): Promise<UserKycResponseDTO> {
    const input: SubmitKycRequestDTO = {
      documents: [...command.documents],
      acceptTerms: command.acceptTerms,
    };
    return this.kycService.submit(command.userId, input);
  }
}
