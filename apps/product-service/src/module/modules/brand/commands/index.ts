/**
 * Brand Command Handlers Barrel
 * @module product-service/modules/brand/commands
 */
import { CreateBrandHandler } from '../../../application/commands/brand/create-brand.handler.js';
import { UpdateBrandHandler } from '../../../application/commands/brand/update-brand.handler.js';
import { DeleteBrandHandler } from '../../../application/commands/brand/delete-brand.handler.js';

export const BRAND_COMMAND_HANDLERS = [
  CreateBrandHandler,
  UpdateBrandHandler,
  DeleteBrandHandler,
] as const;

export { CreateBrandHandler, UpdateBrandHandler, DeleteBrandHandler };
