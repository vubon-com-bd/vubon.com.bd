/**
 * Category Query Handlers Barrel
 * @module product-service/modules/category/queries
 */
import { GetCategoryHandler } from '../../../application/queries/category/get-category.handler.js';
import { ListCategoriesHandler } from '../../../application/queries/category/list-categories.handler.js';
import { GetCategoryTreeHandler } from '../../../application/queries/category/get-category-tree.handler.js';

export const CATEGORY_QUERY_HANDLERS = [
  GetCategoryHandler,
  ListCategoriesHandler,
  GetCategoryTreeHandler,
] as const;

export { GetCategoryHandler, ListCategoriesHandler, GetCategoryTreeHandler };
