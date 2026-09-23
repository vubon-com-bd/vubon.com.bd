import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SettleInsuranceCommand } from './settle-insurance.command';
import type { InsuranceServiceInterface } from '../../services/interfaces/insurance.service.interface';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance-response.dto';

@CommandHandler(SettleInsuranceCommand)
export class SettleInsuranceHandler
  extends BaseCommandHandler<SettleInsuranceCommand, InsuranceResponseDTO>
  implements ICommandHandler<SettleInsuranceCommand>
{
  readonly commandType = 'logistics.insurance.settle';

  constructor(private readonly insuranceService: InsuranceServiceInterface) {
    super();
  }

  async execute(command: SettleInsuranceCommand): Promise<InsuranceResponseDTO> {
    return this.insuranceService.settle({
      insuranceId: command.insuranceId,
      settlementAmount: command.settlementAmount,
      notes: command.notes,
    });
  }
}
