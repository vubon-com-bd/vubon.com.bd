import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteCategoryCommand } from './delete-category.command';
import type { CategoryServiceInterface } from '../../services/interfaces/category.service.interface';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler
  extends BaseCommandHandler<DeleteCategoryCommand, void>
  implements ICommandHandler<DeleteCategoryCommand>
{
  readonly commandType = 'product.category.delete';

  constructor(
    private readonly categoryService: CategoryServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeleteCategoryCommand): Promise<void> {
    await this.categoryService.delete(command.categoryId);
  }
}
