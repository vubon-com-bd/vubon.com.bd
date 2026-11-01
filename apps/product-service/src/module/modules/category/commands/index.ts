/**
 * Category Command Handlers Barrel
 * @module product-service/modules/category/commands
 */
import { CreateCategoryHandler } from '../../../application/commands/category/create-category.handler.js';
import { UpdateCategoryHandler } from '../../../application/commands/category/update-category.handler.js';
import { DeleteCategoryHandler } from '../../../application/commands/category/delete-category.handler.js';

export const CATEGORY_COMMAND_HANDLERS = [
  CreateCategoryHandler,
  UpdateCategoryHandler,
  DeleteCategoryHandler,
] as const;

export { CreateCategoryHandler, UpdateCategoryHandler, DeleteCategoryHandler };
