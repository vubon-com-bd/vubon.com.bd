import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateCategoryCommand } from './activate-category.command.js';
import { CATEGORY_SERVICE, type ICategoryService } from '../../services/interfaces/category.service.interface.js';
import type { CategoryResponseDTO } from '../../dtos/responses/category-response.dto.js';

@CommandHandler(ActivateCategoryCommand)
export class ActivateCategoryHandler implements ICommandHandler<ActivateCategoryCommand, CategoryResponseDTO> {
  constructor(@Inject(CATEGORY_SERVICE) private readonly service: ICategoryService) {}
  async execute(c: ActivateCategoryCommand): Promise<CategoryResponseDTO> {
    return this.service.activate(c.categoryId, c.actorId);
  }
}
