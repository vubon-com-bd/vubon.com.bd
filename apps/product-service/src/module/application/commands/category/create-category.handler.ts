import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateCategoryCommand } from './create-category.command';
import type { CategoryServiceInterface } from '../../services/interfaces/category.service.interface';
import type { CategoryResponseDTO } from '../../dtos/responses/category-response.dto';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  extends BaseCommandHandler<CreateCategoryCommand, CategoryResponseDTO>
  implements ICommandHandler<CreateCategoryCommand>
{
  readonly commandType = 'product.category.create';

  constructor(
    private readonly categoryService: CategoryServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateCategoryCommand): Promise<CategoryResponseDTO> {
    return this.categoryService.create({
      name: command.name,
      slug: command.slug,
      parentId: command.parentId,
    });
  }
}
