import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DiscontinuePackagingCommand } from './discontinue.command.js';
import { PACKAGING_SERVICE, type IPackagingService } from '@application/services/interfaces/packaging.service.interface';
import type { PackagingResponseDTO } from '@application/dtos/responses/packaging/index.js';

@CommandHandler(DiscontinuePackagingCommand)
export class DiscontinuePackagingHandler implements ICommandHandler<DiscontinuePackagingCommand, PackagingResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(c: DiscontinuePackagingCommand): Promise<PackagingResponseDTO> { return this.service.discontinue(c.dto, c.actorId); }
}
