import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ClaimInsuranceCommand } from './claim-insurance.command';
import type { InsuranceServiceInterface } from '../../services/interfaces/insurance.service.interface';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance-response.dto';

@CommandHandler(ClaimInsuranceCommand)
export class ClaimInsuranceHandler
  extends BaseCommandHandler<ClaimInsuranceCommand, InsuranceResponseDTO>
  implements ICommandHandler<ClaimInsuranceCommand>
{
  readonly commandType = 'logistics.insurance.claim';

  constructor(private readonly insuranceService: InsuranceServiceInterface) {
    super();
  }

  async execute(command: ClaimInsuranceCommand): Promise<InsuranceResponseDTO> {
    return this.insuranceService.claim({
      insuranceId: command.insuranceId,
      amount: command.amount,
      reason: command.reason,
    });
  }
}
