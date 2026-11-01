import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateSizePackagingCommand } from './update-size.command.js';
import { PACKAGING_SERVICE, type IPackagingService } from '@application/services/interfaces/packaging.service.interface';
import type { PackagingResponseDTO } from '@application/dtos/responses/packaging/index.js';

@CommandHandler(UpdateSizePackagingCommand)
export class UpdateSizePackagingHandler implements ICommandHandler<UpdateSizePackagingCommand, PackagingResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(c: UpdateSizePackagingCommand): Promise<PackagingResponseDTO> { return this.service.updateSize(c.dto, c.actorId); }
}
