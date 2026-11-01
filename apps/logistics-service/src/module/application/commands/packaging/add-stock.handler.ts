import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddStockPackagingCommand } from './add-stock.command.js';
import { PACKAGING_SERVICE, type IPackagingService } from '@application/services/interfaces/packaging.service.interface';
import type { PackagingResponseDTO } from '@application/dtos/responses/packaging/index.js';

@CommandHandler(AddStockPackagingCommand)
export class AddStockPackagingHandler implements ICommandHandler<AddStockPackagingCommand, PackagingResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(c: AddStockPackagingCommand): Promise<PackagingResponseDTO> { return this.service.addStock(c.dto, c.actorId); }
}
