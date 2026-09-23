import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { PurchaseInsuranceCommand } from './purchase-insurance.command';
import type { InsuranceServiceInterface } from '../../services/interfaces/insurance.service.interface';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance-response.dto';

@CommandHandler(PurchaseInsuranceCommand)
export class PurchaseInsuranceHandler
  extends BaseCommandHandler<PurchaseInsuranceCommand, InsuranceResponseDTO>
  implements ICommandHandler<PurchaseInsuranceCommand>
{
  readonly commandType = 'logistics.insurance.purchase';

  constructor(private readonly insuranceService: InsuranceServiceInterface) {
    super();
  }

  async execute(command: PurchaseInsuranceCommand): Promise<InsuranceResponseDTO> {
    return this.insuranceService.purchase({
      shipmentId: command.shipmentId,
      provider: command.provider,
      coverage: command.coverage,
      declaredValue: command.declaredValue,
      currency: command.currency,
    });
  }
}
