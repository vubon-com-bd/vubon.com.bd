import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RegisterCourierCommand } from './register-courier.command';
import type { CourierServiceInterface } from '../../services/interfaces/courier.service.interface';
import type { CourierResponseDTO } from '../../dtos/responses/courier-response.dto';

@CommandHandler(RegisterCourierCommand)
export class RegisterCourierHandler
  extends BaseCommandHandler<RegisterCourierCommand, CourierResponseDTO>
  implements ICommandHandler<RegisterCourierCommand>
{
  readonly commandType = 'logistics.courier.register';

  constructor(private readonly courierService: CourierServiceInterface) {
    super();
  }

  async execute(command: RegisterCourierCommand): Promise<CourierResponseDTO> {
    return this.courierService.register({
      name: command.name,
      type: command.courierType,
      apiUrl: command.apiUrl,
      apiKey: command.apiKey,
    } as never);
  }
}
