/**
 * ProductVariantModule — variant feature wiring
 * @module product-service/modules/product-variant
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductVariantController } from '../../interfaces/controllers/rest/product-variant.controller.js';

import { VARIANT_COMMAND_HANDLERS } from './commands/index.js';
import { VARIANT_QUERY_HANDLERS } from './queries/index.js';

import { ProductVariantService } from '../../application/services/impl/product-variant.service.js';
import { VARIANT_SERVICE } from '../../application/services/interfaces/product-variant.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [ProductVariantController],
  providers: [
    ProductVariantService,
    { provide: VARIANT_SERVICE, useExisting: ProductVariantService },
    ...(VARIANT_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VARIANT_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [ProductVariantService, VARIANT_SERVICE],
})
export class ProductVariantModule {}
