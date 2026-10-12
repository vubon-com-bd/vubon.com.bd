import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SelectPackagingCommand } from './select-packaging.command.js';
import { PACKAGING_SERVICE, type IPackagingService } from '../../services/interfaces/packaging.service.interface.js';
import type { PackagingResponseDTO } from '../../dtos/responses/packaging/packaging-response.dto.js';

@CommandHandler(SelectPackagingCommand)
export class SelectPackagingHandler implements ICommandHandler<SelectPackagingCommand, readonly PackagingResponseDTO[]> {
  constructor(@Inject(PACKAGING_SERVICE) private readonly service: IPackagingService) {}
  async execute(c: SelectPackagingCommand): Promise<readonly PackagingResponseDTO[]> { return this.service.select(c.dto); }
}
