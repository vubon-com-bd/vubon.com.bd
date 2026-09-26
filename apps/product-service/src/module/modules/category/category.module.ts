import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CategoryController } from '../../interfaces/controllers/rest/category.controller';
import { CategoryService } from '../../application/services/impl/category.service';
import { CategoryMapper } from '../../application/mappers/category.mapper';
import {
  CreateCategoryHandler,
  UpdateCategoryHandler,
  DeleteCategoryHandler,
} from '../../application/commands/category';
import {
  ListCategoriesHandler,
  GetCategoryHandler,
  GetCategoryTreeHandler,
} from '../../application/queries/category';
import { CategoryPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/category.prisma.repository';

const COMMAND_HANDLERS = [
  CreateCategoryHandler,
  UpdateCategoryHandler,
  DeleteCategoryHandler,
];

const QUERY_HANDLERS = [
  ListCategoriesHandler,
  GetCategoryHandler,
  GetCategoryTreeHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [CategoryController],
  providers: [
    CategoryPrismaRepository,
    CategoryService,
    CategoryMapper,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
  ],
  exports: [CategoryService, CategoryPrismaRepository],
})
export class CategoryModule {}
