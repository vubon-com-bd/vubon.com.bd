import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MoveCategoryCommand } from './move-category.command.js';
import { CATEGORY_SERVICE, type ICategoryService } from '../../services/interfaces/category.service.interface.js';
import type { CategoryResponseDTO } from '../../dtos/responses/category-response.dto.js';

@CommandHandler(MoveCategoryCommand)
export class MoveCategoryHandler implements ICommandHandler<MoveCategoryCommand, CategoryResponseDTO> {
  constructor(@Inject(CATEGORY_SERVICE) private readonly service: ICategoryService) {}
  async execute(c: MoveCategoryCommand): Promise<CategoryResponseDTO> {
    return this.service.move(c.categoryId, c.newParentId, c.actorId);
  }
}
