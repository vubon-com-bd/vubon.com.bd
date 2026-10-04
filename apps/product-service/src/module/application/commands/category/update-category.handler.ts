import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateCategoryCommand } from './update-category.command.js';
import { CATEGORY_SERVICE, type ICategoryService } from '../../services/interfaces/category.service.interface.js';
import type { CategoryResponseDTO } from '../../dtos/responses/category-response.dto.js';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand, CategoryResponseDTO> {
  constructor(@Inject(CATEGORY_SERVICE) private readonly service: ICategoryService) {}
  async execute(c: UpdateCategoryCommand): Promise<CategoryResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
