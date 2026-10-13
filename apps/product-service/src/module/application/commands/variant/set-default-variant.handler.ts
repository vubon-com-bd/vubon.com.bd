import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SetDefaultVariantCommand } from './set-default-variant.command.js';
import {
  VARIANT_SERVICE,
  type IProductVariantService,
} from '../../services/interfaces/product-variant.service.interface.js';
import type { VariantResponseDTO } from '../../dtos/responses/variant-response.dto.js';

@CommandHandler(SetDefaultVariantCommand)
export class SetDefaultVariantHandler
  implements ICommandHandler<SetDefaultVariantCommand, VariantResponseDTO>
{
  constructor(
    @Inject(VARIANT_SERVICE)
    private readonly service: IProductVariantService,
  ) {}

  async execute(c: SetDefaultVariantCommand): Promise<VariantResponseDTO> {
    return this.service.setDefault(c.dto);
  }
}
