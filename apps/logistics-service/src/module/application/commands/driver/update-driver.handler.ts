import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateDriverCommand } from './update-driver.command';
import type { DriverServiceInterface } from '../../services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '../../dtos/responses/driver-response.dto';

@CommandHandler(UpdateDriverCommand)
export class UpdateDriverHandler
  extends BaseCommandHandler<UpdateDriverCommand, DriverResponseDTO>
  implements ICommandHandler<UpdateDriverCommand>
{
  readonly commandType = 'logistics.driver.update';

  constructor(private readonly driverService: DriverServiceInterface) {
    super();
  }

  async execute(command: UpdateDriverCommand): Promise<DriverResponseDTO> {
    return this.driverService.update({
      driverId: command.driverId,
      name: command.name,
      phone: command.phone,
    });
  }
}
