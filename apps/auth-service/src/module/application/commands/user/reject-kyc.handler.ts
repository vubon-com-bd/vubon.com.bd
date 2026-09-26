import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RejectKycCommand } from './reject-kyc.command';
import type { UserKycServiceInterface } from '../../services/interfaces/user-kyc.service.interface';
import type { UserKycResponseDTO } from '../../dtos/responses/user-kyc-response.dto';
import { USER_KYC_SERVICE } from '../../tokens';

@CommandHandler(RejectKycCommand)
export class RejectKycHandler
  extends BaseCommandHandler<RejectKycCommand, UserKycResponseDTO>
  implements ICommandHandler<RejectKycCommand> {
  readonly commandType = 'RejectKycCommand';
  constructor(
    @Inject(USER_KYC_SERVICE)
    private readonly kycService: UserKycServiceInterface,
  ) { super(); }

  async execute(command: RejectKycCommand): Promise<UserKycResponseDTO> {
    const entity = await this.kycService.reject(command.input);
    return this.kycService.toResponse(entity);
  }
}
