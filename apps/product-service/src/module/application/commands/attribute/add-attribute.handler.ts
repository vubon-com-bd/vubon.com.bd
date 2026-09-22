import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddAttributeCommand } from './add-attribute.command';
import type { ProductAttributeServiceInterface } from '../../services/interfaces/product-attribute.service.interface';
import type { AttributeResponseDTO } from '../../dtos/responses/attribute-response.dto';

@CommandHandler(AddAttributeCommand)
export class AddAttributeHandler
  extends BaseCommandHandler<AddAttributeCommand, AttributeResponseDTO>
  implements ICommandHandler<AddAttributeCommand>
{
  readonly commandType = 'product.attribute.add';

  constructor(
    private readonly attributeService: ProductAttributeServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AddAttributeCommand): Promise<AttributeResponseDTO> {
    return this.attributeService.add(command.productId, {
      productId: command.productId,
      name: command.name,
      value: command.value,
    });
  }
}
