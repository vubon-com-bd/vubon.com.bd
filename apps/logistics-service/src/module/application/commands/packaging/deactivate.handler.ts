import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeactivatePackagingCommand } from './deactivate.command.js';
import { PACKAGING_SERVICE, type IPackagingService } from '@application/services/interfaces/packaging.service.interface';
import type { PackagingResponseDTO } from '@application/dtos/responses/packaging/index.js';

@CommandHandler(DeactivatePackagingCommand)
export class DeactivatePackagingHandler implements ICommandHandler<DeactivatePackagingCommand, PackagingResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(c: DeactivatePackagingCommand): Promise<PackagingResponseDTO> { return this.service.deactivate(c.dto, c.actorId); }
}
