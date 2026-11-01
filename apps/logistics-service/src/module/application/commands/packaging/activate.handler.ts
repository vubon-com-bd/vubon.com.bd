import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivatePackagingCommand } from './activate.command.js';
import { PACKAGING_SERVICE, type IPackagingService } from '@application/services/interfaces/packaging.service.interface';
import type { PackagingResponseDTO } from '@application/dtos/responses/packaging/index.js';

@CommandHandler(ActivatePackagingCommand)
export class ActivatePackagingHandler implements ICommandHandler<ActivatePackagingCommand, PackagingResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(c: ActivatePackagingCommand): Promise<PackagingResponseDTO> { return this.service.activate(c.dto, c.actorId); }
}
