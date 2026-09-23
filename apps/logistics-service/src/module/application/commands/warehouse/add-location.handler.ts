import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddLocationCommand } from './add-location.command';
import type { WarehouseServiceInterface } from '../../services/interfaces/warehouse.service.interface';
import type { WarehouseResponseDTO } from '../../dtos/responses/warehouse-response.dto';

@CommandHandler(AddLocationCommand)
export class AddLocationHandler
  extends BaseCommandHandler<AddLocationCommand, WarehouseResponseDTO>
  implements ICommandHandler<AddLocationCommand>
{
  readonly commandType = 'logistics.warehouse.add-location';

  constructor(private readonly warehouseService: WarehouseServiceInterface) {
    super();
  }

  async execute(command: AddLocationCommand): Promise<WarehouseResponseDTO> {
    return this.warehouseService.addLocation({
      warehouseId: command.warehouseId,
      code: command.code,
      type: command.locationType,
      name: command.name,
      capacity: command.capacity,
    } as never);
  }
}
