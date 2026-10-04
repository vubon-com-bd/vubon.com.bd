import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateVariantCommand } from './update-variant.command.js';
import { VARIANT_SERVICE, type IVariantService } from '../../services/interfaces/variant.service.interface.js';
import type { VariantResponseDTO } from '../../dtos/responses/variant-response.dto.js';

@CommandHandler(UpdateVariantCommand)
export class UpdateVariantHandler implements ICommandHandler<UpdateVariantCommand, VariantResponseDTO> {
  constructor(@Inject(VARIANT_SERVICE) private readonly service: IVariantService) {}
  async execute(c: UpdateVariantCommand): Promise<VariantResponseDTO> {
    return this.service.update(c.dto);
  }
}
