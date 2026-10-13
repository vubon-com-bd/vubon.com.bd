import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteCategoryCommand } from './delete-category.command.js';
import {
  CATEGORY_SERVICE,
  type ICategoryService,
} from '../../services/interfaces/category.service.interface.js';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler
  implements ICommandHandler<
    DeleteCategoryCommand,
    { readonly success: true; readonly categoryId: string }
  >
{
  constructor(
    @Inject(CATEGORY_SERVICE)
    private readonly service: ICategoryService,
  ) {}

  async execute(c: DeleteCategoryCommand) {
    return this.service.delete(c.dto);
  }
}
