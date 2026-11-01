import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddAttributeCommand } from './add-attribute.command.js';
import {
  ATTRIBUTE_SERVICE,
  type IProductAttributeService,
} from '../../services/interfaces/product-attribute.service.interface.js';
import type { AttributeResponseDTO } from '../../dtos/responses/attribute-response.dto.js';

@CommandHandler(AddAttributeCommand)
export class AddAttributeHandler
  implements ICommandHandler<AddAttributeCommand, AttributeResponseDTO>
{
  constructor(
    @Inject(ATTRIBUTE_SERVICE)
    private readonly service: IProductAttributeService,
  ) {}

  async execute(c: AddAttributeCommand): Promise<AttributeResponseDTO> {
    return this.service.add(c.dto);
  }
}
