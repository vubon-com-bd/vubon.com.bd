import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SetDriverStatusCommand } from './set-driver-status.command';
import type { DriverServiceInterface } from '../../services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '../../dtos/responses/driver-response.dto';

@CommandHandler(SetDriverStatusCommand)
export class SetDriverStatusHandler
  extends BaseCommandHandler<SetDriverStatusCommand, DriverResponseDTO>
  implements ICommandHandler<SetDriverStatusCommand>
{
  readonly commandType = 'logistics.driver.set-status';

  constructor(private readonly driverService: DriverServiceInterface) {
    super();
  }

  async execute(command: SetDriverStatusCommand): Promise<DriverResponseDTO> {
    return this.driverService.setStatus({
      driverId: command.driverId,
      status: command.status,
    } as never);
  }
}
