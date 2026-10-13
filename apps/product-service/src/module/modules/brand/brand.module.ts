/**
 * BrandModule — brand feature wiring
 * @module product-service/modules/brand
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { BrandController } from '../../interfaces/controllers/rest/brand.controller.js';

import { BRAND_COMMAND_HANDLERS } from './commands/index.js';
import { BRAND_QUERY_HANDLERS } from './queries/index.js';

import { BrandService } from '../../application/services/impl/brand.service.js';
import { BRAND_SERVICE } from '../../application/services/interfaces/brand.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [BrandController],
  providers: [
    BrandService,
    { provide: BRAND_SERVICE, useExisting: BrandService },
    ...(BRAND_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(BRAND_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [BrandService, BRAND_SERVICE],
})
export class BrandModule {}
