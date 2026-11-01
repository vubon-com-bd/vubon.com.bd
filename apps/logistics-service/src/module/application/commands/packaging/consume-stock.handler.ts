import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ConsumeStockPackagingCommand } from './consume-stock.command.js';
import { PACKAGING_SERVICE, type IPackagingService } from '@application/services/interfaces/packaging.service.interface';
import type { PackagingResponseDTO } from '@application/dtos/responses/packaging/index.js';

@CommandHandler(ConsumeStockPackagingCommand)
export class ConsumeStockPackagingHandler implements ICommandHandler<ConsumeStockPackagingCommand, PackagingResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(c: ConsumeStockPackagingCommand): Promise<PackagingResponseDTO> { return this.service.consumeStock(c.dto, c.actorId); }
}
