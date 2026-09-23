import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RegisterDriverCommand } from './register-driver.command';
import type { DriverServiceInterface } from '../../services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '../../dtos/responses/driver-response.dto';

@CommandHandler(RegisterDriverCommand)
export class RegisterDriverHandler
  extends BaseCommandHandler<RegisterDriverCommand, DriverResponseDTO>
  implements ICommandHandler<RegisterDriverCommand>
{
  readonly commandType = 'logistics.driver.register';

  constructor(private readonly driverService: DriverServiceInterface) {
    super();
  }

  async execute(command: RegisterDriverCommand): Promise<DriverResponseDTO> {
    return this.driverService.register({
      name: command.name,
      phone: command.phone,
      licenseNo: command.licenseNo,
      type: command.driverType,
    } as never);
  }
}
