import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateCategoryCommand } from './update-category.command';
import type { CategoryServiceInterface } from '../../services/interfaces/category.service.interface';
import type { CategoryResponseDTO } from '../../dtos/responses/category-response.dto';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler
  extends BaseCommandHandler<UpdateCategoryCommand, CategoryResponseDTO>
  implements ICommandHandler<UpdateCategoryCommand>
{
  readonly commandType = 'product.category.update';

  constructor(
    private readonly categoryService: CategoryServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateCategoryCommand): Promise<CategoryResponseDTO> {
    return this.categoryService.update(
      command.categoryId,
      command.name,
      command.parentId,
    );
  }
}
