import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SubmitKycCommand } from './submit-kyc.command';
import type { UserKycServiceInterface } from '../../services/interfaces/user-kyc.service.interface';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto';
import { USER_KYC_SERVICE } from '../../tokens';

@CommandHandler(SubmitKycCommand)
export class SubmitKycHandler
  extends BaseCommandHandler<SubmitKycCommand, UserKycResponseDTO>
  implements ICommandHandler<SubmitKycCommand> {
  readonly commandType = 'SubmitKycCommand';
  constructor(
    @Inject(USER_KYC_SERVICE)
    private readonly kycService: UserKycServiceInterface,
  ) { super(); }

  async execute(command: SubmitKycCommand): Promise<UserKycResponseDTO> {
    const entity = await this.kycService.submit(command.userId, command.input);
    return this.kycService.toResponse(entity);
  }
}
