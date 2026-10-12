import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ConsumePackagingCommand } from './consume-packaging.command.js';
import { PACKAGING_SERVICE, type IPackagingService } from '../../services/interfaces/packaging.service.interface.js';
import type { PackagingResponseDTO } from '../../dtos/responses/packaging/packaging-response.dto.js';

@CommandHandler(ConsumePackagingCommand)
export class ConsumePackagingHandler implements ICommandHandler<ConsumePackagingCommand, PackagingResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(c: ConsumePackagingCommand): Promise<PackagingResponseDTO> { return this.service.consume(c.dto, c.actorId); }
}
