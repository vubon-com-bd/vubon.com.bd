import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateWarehouseCommand } from './update-warehouse.command';
import type { WarehouseServiceInterface } from '../../services/interfaces/warehouse.service.interface';
import type { WarehouseResponseDTO } from '../../dtos/responses/warehouse-response.dto';

@CommandHandler(UpdateWarehouseCommand)
export class UpdateWarehouseHandler
  extends BaseCommandHandler<UpdateWarehouseCommand, WarehouseResponseDTO>
  implements ICommandHandler<UpdateWarehouseCommand>
{
  readonly commandType = 'logistics.warehouse.update';

  constructor(private readonly warehouseService: WarehouseServiceInterface) {
    super();
  }

  async execute(command: UpdateWarehouseCommand): Promise<WarehouseResponseDTO> {
    return this.warehouseService.update({
      warehouseId: command.warehouseId,
      name: command.name,
      address: command.address,
      capacity: command.capacity,
    } as never);
  }
}
