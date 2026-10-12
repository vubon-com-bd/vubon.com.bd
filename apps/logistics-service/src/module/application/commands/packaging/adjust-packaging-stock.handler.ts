import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AdjustPackagingStockCommand } from './adjust-packaging-stock.command.js';
import { PACKAGING_SERVICE, type IPackagingService } from '../../services/interfaces/packaging.service.interface.js';
import type { PackagingResponseDTO } from '../../dtos/responses/packaging/packaging-response.dto.js';

@CommandHandler(AdjustPackagingStockCommand)
export class AdjustPackagingStockHandler implements ICommandHandler<AdjustPackagingStockCommand, PackagingResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(c: AdjustPackagingStockCommand): Promise<PackagingResponseDTO> { return this.service.adjustStock(c.dto, c.actorId); }
}
