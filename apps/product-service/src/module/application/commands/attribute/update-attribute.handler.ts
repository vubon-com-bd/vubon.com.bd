import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAttributeCommand } from './update-attribute.command';
import type { ProductAttributeServiceInterface } from '../../services/interfaces/product-attribute.service.interface';
import type { AttributeResponseDTO } from '../../dtos/responses/attribute-response.dto';

@CommandHandler(UpdateAttributeCommand)
export class UpdateAttributeHandler
  extends BaseCommandHandler<UpdateAttributeCommand, AttributeResponseDTO>
  implements ICommandHandler<UpdateAttributeCommand>
{
  readonly commandType = 'product.attribute.update';

  constructor(
    private readonly attributeService: ProductAttributeServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateAttributeCommand): Promise<AttributeResponseDTO> {
    return this.attributeService.update(command.attributeId, command.value);
  }
}
