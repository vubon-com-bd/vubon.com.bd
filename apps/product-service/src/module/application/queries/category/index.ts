// application/queries/category/index.ts
export * from './get-category.query.js';
export * from './get-category.handler.js';
export * from './get-category-tree.query.js';
export * from './get-category-tree.handler.js';
export * from './list-categories-by-parent.query.js';
export * from './list-categories-by-parent.handler.js';

import { GetCategoryHandler } from './get-category.handler.js';
import { GetCategoryTreeHandler } from './get-category-tree.handler.js';
import { ListCategoriesByParentHandler } from './list-categories-by-parent.handler.js';

export const CATEGORY_QUERY_HANDLERS = [
  GetCategoryHandler,
  GetCategoryTreeHandler,
  ListCategoriesByParentHandler,
] as const;
