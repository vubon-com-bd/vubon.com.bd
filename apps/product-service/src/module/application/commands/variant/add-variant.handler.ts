import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddVariantCommand } from './add-variant.command.js';
import {
  VARIANT_SERVICE,
  type IProductVariantService,
} from '../../services/interfaces/product-variant.service.interface.js';
import type { VariantResponseDTO } from '../../dtos/responses/variant-response.dto.js';

@CommandHandler(AddVariantCommand)
export class AddVariantHandler
  implements ICommandHandler<AddVariantCommand, VariantResponseDTO>
{
  constructor(
    @Inject(VARIANT_SERVICE)
    private readonly service: IProductVariantService,
  ) {}

  async execute(c: AddVariantCommand): Promise<VariantResponseDTO> {
    return this.service.add(c.dto, c.actorId);
  }
}
