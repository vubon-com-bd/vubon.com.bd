import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePackagingCommand } from './update-packaging.command.js';
import { PACKAGING_SERVICE, type IPackagingService } from '../../services/interfaces/packaging.service.interface.js';
import type { PackagingResponseDTO } from '../../dtos/responses/packaging/packaging-response.dto.js';

@CommandHandler(UpdatePackagingCommand)
export class UpdatePackagingHandler implements ICommandHandler<UpdatePackagingCommand, PackagingResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(c: UpdatePackagingCommand): Promise<PackagingResponseDTO> { return this.service.update(c.dto, c.actorId); }
}
