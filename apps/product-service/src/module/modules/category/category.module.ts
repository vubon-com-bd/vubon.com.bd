/**
 * CategoryModule
 */
import { Module } from '@nestjs/common';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/repositories.module.js';
import { CategoryController } from '../../interfaces/controllers/rest/category.controller.js';
import { CategoryService } from '../../application/services/impl/category.service.js';
import { CATEGORY_SERVICE } from '../../application/services/interfaces/category.service.interface.js';
import { CATEGORY_COMMAND_HANDLERS } from '../../application/commands/category/index.js';
import { CATEGORY_QUERY_HANDLERS } from '../../application/queries/category/index.js';

@Module({
  imports: [PrismaRepositoriesModule],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    { provide: CATEGORY_SERVICE, useExisting: CategoryService },
    ...CATEGORY_COMMAND_HANDLERS,
    ...CATEGORY_QUERY_HANDLERS],
  exports: [CategoryService, CATEGORY_SERVICE],
})
export class CategoryModule {}
