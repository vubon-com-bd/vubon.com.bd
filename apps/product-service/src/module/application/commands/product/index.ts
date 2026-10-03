// application/commands/product/index.ts
export * from './create-product.command.js';
export * from './create-product.handler.js';
export * from './update-product.command.js';
export * from './update-product.handler.js';
export * from './delete-product.command.js';
export * from './delete-product.handler.js';
export * from './publish-product.command.js';
export * from './publish-product.handler.js';
export * from './unpublish-product.command.js';
export * from './unpublish-product.handler.js';
export * from './archive-product.command.js';
export * from './archive-product.handler.js';
export * from './feature-product.command.js';
export * from './feature-product.handler.js';
export * from './duplicate-product.command.js';
export * from './duplicate-product.handler.js';

import { CreateProductHandler } from './create-product.handler.js';
import { UpdateProductHandler } from './update-product.handler.js';
import { DeleteProductHandler } from './delete-product.handler.js';
import { PublishProductHandler } from './publish-product.handler.js';
import { UnpublishProductHandler } from './unpublish-product.handler.js';
import { ArchiveProductHandler } from './archive-product.handler.js';
import { FeatureProductHandler } from './feature-product.handler.js';
import { DuplicateProductHandler } from './duplicate-product.handler.js';

export const PRODUCT_COMMAND_HANDLERS = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
  PublishProductHandler,
  UnpublishProductHandler,
  ArchiveProductHandler,
  FeatureProductHandler,
  DuplicateProductHandler,
] as const;
