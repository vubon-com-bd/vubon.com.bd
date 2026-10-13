import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveAttributeCommand } from './remove-attribute.command.js';
import {
  ATTRIBUTE_SERVICE,
  type IProductAttributeService,
} from '../../services/interfaces/product-attribute.service.interface.js';

@CommandHandler(RemoveAttributeCommand)
export class RemoveAttributeHandler
  implements ICommandHandler<
    RemoveAttributeCommand,
    { readonly success: true; readonly attributeId: string }
  >
{
  constructor(
    @Inject(ATTRIBUTE_SERVICE)
    private readonly service: IProductAttributeService,
  ) {}

  async execute(c: RemoveAttributeCommand) {
    return this.service.remove(c.dto);
  }
}
