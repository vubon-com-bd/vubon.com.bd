import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeactivateCategoryCommand } from './deactivate-category.command.js';
import { CATEGORY_SERVICE, type ICategoryService } from '../../services/interfaces/category.service.interface.js';
import type { CategoryResponseDTO } from '../../dtos/responses/category-response.dto.js';

@CommandHandler(DeactivateCategoryCommand)
export class DeactivateCategoryHandler implements ICommandHandler<DeactivateCategoryCommand, CategoryResponseDTO> {
  constructor(@Inject(CATEGORY_SERVICE) private readonly service: ICategoryService) {}
  async execute(c: DeactivateCategoryCommand): Promise<CategoryResponseDTO> {
    return this.service.deactivate(c.categoryId, c.actorId);
  }
}
