/**
 * Product Command Handlers Barrel
 * @module product-service/modules/product/commands
 */
import { CreateProductHandler } from '../../../application/commands/product/create-product.handler.js';
import { UpdateProductHandler } from '../../../application/commands/product/update-product.handler.js';
import { DeleteProductHandler } from '../../../application/commands/product/delete-product.handler.js';
import { PublishProductHandler } from '../../../application/commands/product/publish-product.handler.js';
import { ArchiveProductHandler } from '../../../application/commands/product/archive-product.handler.js';
import { DuplicateProductHandler } from '../../../application/commands/product/duplicate-product.handler.js';

export const PRODUCT_COMMAND_HANDLERS = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
  PublishProductHandler,
  ArchiveProductHandler,
  DuplicateProductHandler,
] as const;

export {
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
  PublishProductHandler,
  ArchiveProductHandler,
  DuplicateProductHandler,
};
