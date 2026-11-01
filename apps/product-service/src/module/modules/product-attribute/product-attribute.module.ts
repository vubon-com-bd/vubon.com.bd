/**
 * ProductAttributeModule — attribute feature wiring
 * @module product-service/modules/product-attribute
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductAttributeController } from '../../interfaces/controllers/rest/product-attribute.controller.js';

import { ATTRIBUTE_COMMAND_HANDLERS } from './commands/index.js';
import { ATTRIBUTE_QUERY_HANDLERS } from './queries/index.js';

import { ProductAttributeService } from '../../application/services/impl/product-attribute.service.js';
import { ATTRIBUTE_SERVICE } from '../../application/services/interfaces/product-attribute.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [ProductAttributeController],
  providers: [
    ProductAttributeService,
    { provide: ATTRIBUTE_SERVICE, useExisting: ProductAttributeService },
    ...(ATTRIBUTE_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(ATTRIBUTE_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [ProductAttributeService, ATTRIBUTE_SERVICE],
})
export class ProductAttributeModule {}
