// application/commands/brand/index.ts
export * from './create-brand.command.js';
export * from './create-brand.handler.js';
export * from './update-brand.command.js';
export * from './update-brand.handler.js';
export * from './delete-brand.command.js';
export * from './delete-brand.handler.js';
export * from './activate-brand.command.js';
export * from './activate-brand.handler.js';
export * from './deactivate-brand.command.js';
export * from './deactivate-brand.handler.js';
export * from './feature-brand.command.js';
export * from './feature-brand.handler.js';

import { CreateBrandHandler } from './create-brand.handler.js';
import { UpdateBrandHandler } from './update-brand.handler.js';
import { DeleteBrandHandler } from './delete-brand.handler.js';
import { ActivateBrandHandler } from './activate-brand.handler.js';
import { DeactivateBrandHandler } from './deactivate-brand.handler.js';
import { FeatureBrandHandler } from './feature-brand.handler.js';

export const BRAND_COMMAND_HANDLERS = [
  CreateBrandHandler,
  UpdateBrandHandler,
  DeleteBrandHandler,
  ActivateBrandHandler,
  DeactivateBrandHandler,
  FeatureBrandHandler,
] as const;
