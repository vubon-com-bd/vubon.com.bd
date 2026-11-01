import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ArchiveWarehouseCommand } from './archive-warehouse.command.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '@application/services/interfaces/warehouse.service.interface';
import type { WarehouseResponseDTO } from '@application/dtos/responses/warehouse/index.js';

@CommandHandler(ArchiveWarehouseCommand)
export class ArchiveWarehouseHandler implements ICommandHandler<ArchiveWarehouseCommand, WarehouseResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(c: ArchiveWarehouseCommand): Promise<WarehouseResponseDTO> { return this.service.archive(c.dto, c.actorId); }
}
