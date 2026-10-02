// application/commands/category/index.ts
export * from './create-category.command.js';
export * from './create-category.handler.js';
export * from './update-category.command.js';
export * from './update-category.handler.js';
export * from './delete-category.command.js';
export * from './delete-category.handler.js';
export * from './move-category.command.js';
export * from './move-category.handler.js';
export * from './activate-category.command.js';
export * from './activate-category.handler.js';
export * from './deactivate-category.command.js';
export * from './deactivate-category.handler.js';

import { CreateCategoryHandler } from './create-category.handler.js';
import { UpdateCategoryHandler } from './update-category.handler.js';
import { DeleteCategoryHandler } from './delete-category.handler.js';
import { MoveCategoryHandler } from './move-category.handler.js';
import { ActivateCategoryHandler } from './activate-category.handler.js';
import { DeactivateCategoryHandler } from './deactivate-category.handler.js';

export const CATEGORY_COMMAND_HANDLERS = [
  CreateCategoryHandler,
  UpdateCategoryHandler,
  DeleteCategoryHandler,
  MoveCategoryHandler,
  ActivateCategoryHandler,
  DeactivateCategoryHandler,
] as const;
