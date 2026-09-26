import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RemoveAttributeCommand } from './remove-attribute.command';
import type { ProductAttributeServiceInterface } from '../../services/interfaces/product-attribute.service.interface';

@CommandHandler(RemoveAttributeCommand)
export class RemoveAttributeHandler
  extends BaseCommandHandler<RemoveAttributeCommand, void>
  implements ICommandHandler<RemoveAttributeCommand>
{
  readonly commandType = 'product.attribute.remove';

  constructor(
    private readonly attributeService: ProductAttributeServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RemoveAttributeCommand): Promise<void> {
    await this.attributeService.remove(command.attributeId);
  }
}
