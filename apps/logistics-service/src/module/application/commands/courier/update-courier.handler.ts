import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateCourierCommand } from './update-courier.command';
import type { CourierServiceInterface } from '../../services/interfaces/courier.service.interface';
import type { CourierResponseDTO } from '../../dtos/responses/courier-response.dto';

@CommandHandler(UpdateCourierCommand)
export class UpdateCourierHandler
  extends BaseCommandHandler<UpdateCourierCommand, CourierResponseDTO>
  implements ICommandHandler<UpdateCourierCommand>
{
  readonly commandType = 'logistics.courier.update';

  constructor(private readonly courierService: CourierServiceInterface) {
    super();
  }

  async execute(command: UpdateCourierCommand): Promise<CourierResponseDTO> {
    return this.courierService.update({
      courierId: command.courierId,
      apiUrl: command.apiUrl,
      apiKey: command.apiKey,
    });
  }
}
