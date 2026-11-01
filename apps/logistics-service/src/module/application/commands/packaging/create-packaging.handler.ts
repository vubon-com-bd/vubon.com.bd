import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePackagingCommand } from './create-packaging.command.js';
import { PACKAGING_SERVICE, type IPackagingService } from '@application/services/interfaces/packaging.service.interface';
import type { PackagingResponseDTO } from '@application/dtos/responses/packaging/index.js';

@CommandHandler(CreatePackagingCommand)
export class CreatePackagingHandler implements ICommandHandler<CreatePackagingCommand, PackagingResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(c: CreatePackagingCommand): Promise<PackagingResponseDTO> { return this.service.create(c.dto, c.actorId); }
}
