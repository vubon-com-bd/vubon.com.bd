/**
 * BrandModule
 */
import { Module } from '@nestjs/common';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/repositories.module.js';
import { BrandController } from '../../interfaces/controllers/rest/brand.controller.js';
import { BrandService } from '../../application/services/impl/brand.service.js';
import { BRAND_SERVICE } from '../../application/services/interfaces/brand.service.interface.js';
import { BRAND_COMMAND_HANDLERS } from '../../application/commands/brand/index.js';
import { BRAND_QUERY_HANDLERS } from '../../application/queries/brand/index.js';

@Module({
  imports: [PrismaRepositoriesModule],
  controllers: [BrandController],
  providers: [
    BrandService,
    { provide: BRAND_SERVICE, useExisting: BrandService },
    ...BRAND_COMMAND_HANDLERS,
    ...BRAND_QUERY_HANDLERS],
  exports: [BrandService, BRAND_SERVICE],
})
export class BrandModule {}
