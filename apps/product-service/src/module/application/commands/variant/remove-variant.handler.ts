import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveVariantCommand } from './remove-variant.command.js';
import {
  VARIANT_SERVICE,
  type IProductVariantService,
} from '../../services/interfaces/product-variant.service.interface.js';

@CommandHandler(RemoveVariantCommand)
export class RemoveVariantHandler
  implements ICommandHandler<
    RemoveVariantCommand,
    { readonly success: true; readonly variantId: string }
  >
{
  constructor(
    @Inject(VARIANT_SERVICE)
    private readonly service: IProductVariantService,
  ) {}

  async execute(c: RemoveVariantCommand) {
    return this.service.remove(c.dto);
  }
}
