import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SetCourierRatesCommand } from './set-courier-rates.command';
import type { CourierRateServiceInterface } from '../../services/interfaces/courier-rate.service.interface';

@CommandHandler(SetCourierRatesCommand)
export class SetCourierRatesHandler
  extends BaseCommandHandler<SetCourierRatesCommand, void>
  implements ICommandHandler<SetCourierRatesCommand>
{
  readonly commandType = 'logistics.courier.set-rates';

  constructor(private readonly courierRateService: CourierRateServiceInterface) {
    super();
  }

  async execute(command: SetCourierRatesCommand): Promise<void> {
    await this.courierRateService.setRates({
      courierId: command.courierId,
      weightMin: command.weightMin,
      weightMax: command.weightMax,
      baseRate: command.baseRate,
      perKgRate: command.perKgRate,
      currency: command.currency,
    });
  }
}
