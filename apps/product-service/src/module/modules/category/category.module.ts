/**
 * CategoryModule — category feature wiring
 * @module product-service/modules/category
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CategoryController } from '../../interfaces/controllers/rest/category.controller.js';

import { CATEGORY_COMMAND_HANDLERS } from './commands/index.js';
import { CATEGORY_QUERY_HANDLERS } from './queries/index.js';

import { CategoryService } from '../../application/services/impl/category.service.js';
import { CATEGORY_SERVICE } from '../../application/services/interfaces/category.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    { provide: CATEGORY_SERVICE, useExisting: CategoryService },
    ...(CATEGORY_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(CATEGORY_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [CategoryService, CATEGORY_SERVICE],
})
export class CategoryModule {}
