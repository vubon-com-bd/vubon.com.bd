import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateCategoryCommand } from './create-category.command.js';
import { CATEGORY_SERVICE, type ICategoryService } from '../../services/interfaces/category.service.interface.js';
import type { CategoryResponseDTO } from '../../dtos/responses/category-response.dto.js';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand, CategoryResponseDTO> {
  constructor(@Inject(CATEGORY_SERVICE) private readonly service: ICategoryService) {}
  async execute(c: CreateCategoryCommand): Promise<CategoryResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
