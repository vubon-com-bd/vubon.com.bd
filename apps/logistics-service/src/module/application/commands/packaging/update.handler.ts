import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePackagingCommand } from './update.command.js';
import { PACKAGING_SERVICE, type IPackagingService } from '@application/services/interfaces/packaging.service.interface';
import type { PackagingResponseDTO } from '@application/dtos/responses/packaging/index.js';

@CommandHandler(UpdatePackagingCommand)
export class UpdatePackagingHandler implements ICommandHandler<UpdatePackagingCommand, PackagingResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(c: UpdatePackagingCommand): Promise<PackagingResponseDTO> { return this.service.update(c.dto, c.actorId); }
}
