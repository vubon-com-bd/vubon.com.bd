import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RestockPackagingCommand } from './restock-packaging.command.js';
import { PACKAGING_SERVICE, type IPackagingService } from '../../services/interfaces/packaging.service.interface.js';
import type { PackagingResponseDTO } from '../../dtos/responses/packaging/packaging-response.dto.js';

@CommandHandler(RestockPackagingCommand)
export class RestockPackagingHandler implements ICommandHandler<RestockPackagingCommand, PackagingResponseDTO> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(c: RestockPackagingCommand): Promise<PackagingResponseDTO> { return this.service.restock(c.dto, c.actorId); }
}
