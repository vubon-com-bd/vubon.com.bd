import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateReferralCommand } from './create-referral.command';
import type { ReferralServiceInterface } from '../../services/interfaces/referral.service.interface';
import type { ReferralResponseDTO } from '../../dtos/responses/referral-response.dto';

@CommandHandler(CreateReferralCommand)
export class CreateReferralHandler
  extends BaseCommandHandler<CreateReferralCommand, ReferralResponseDTO>
  implements ICommandHandler<CreateReferralCommand>
{
  readonly commandType = 'marketing.referral.create';

  constructor(private readonly referralService: ReferralServiceInterface) {
    super();
  }

  async execute(command: CreateReferralCommand): Promise<ReferralResponseDTO> {
    return this.referralService.create({
      referrerId: command.referrerId,
      code: command.code,
    });
  }
}
