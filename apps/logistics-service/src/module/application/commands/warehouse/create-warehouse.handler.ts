import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateWarehouseCommand } from './create-warehouse.command';
import type { WarehouseServiceInterface } from '../../services/interfaces/warehouse.service.interface';
import type { WarehouseResponseDTO } from '../../dtos/responses/warehouse-response.dto';

@CommandHandler(CreateWarehouseCommand)
export class CreateWarehouseHandler
  extends BaseCommandHandler<CreateWarehouseCommand, WarehouseResponseDTO>
  implements ICommandHandler<CreateWarehouseCommand>
{
  readonly commandType = 'logistics.warehouse.create';

  constructor(private readonly warehouseService: WarehouseServiceInterface) {
    super();
  }

  async execute(command: CreateWarehouseCommand): Promise<WarehouseResponseDTO> {
    return this.warehouseService.create({
      code: command.code,
      name: command.name,
      type: command.warehouseType,
      division: command.division,
      district: command.district,
      address: command.address,
      capacity: command.capacity,
    } as never);
  }
}
