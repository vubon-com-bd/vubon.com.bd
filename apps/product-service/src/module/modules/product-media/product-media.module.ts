/**
 * ProductMediaModule — media feature wiring
 * @module product-service/modules/product-media
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductMediaController } from '../../interfaces/controllers/rest/product-media.controller.js';

import { MEDIA_COMMAND_HANDLERS } from './commands/index.js';
import { MEDIA_QUERY_HANDLERS } from './queries/index.js';

import { ProductMediaApplicationService } from '../../application/services/impl/product-media.service.js';
import { MEDIA_SERVICE } from '../../application/services/interfaces/product-media.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [ProductMediaController],
  providers: [
    ProductMediaApplicationService,
    { provide: MEDIA_SERVICE, useExisting: ProductMediaApplicationService },
    ...(MEDIA_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(MEDIA_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [ProductMediaApplicationService, MEDIA_SERVICE],
})
export class ProductMediaModule {}
