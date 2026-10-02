/**
 * ProductVariantModule
 * @module product-service/modules/product-variant
 */
import { Module } from '@nestjs/common';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/repositories.module.js';
import { ProductVariantController } from '../../interfaces/controllers/rest/product-variant.controller.js';
import { VariantService } from '../../application/services/impl/variant.service.js';
import { VARIANT_SERVICE } from '../../application/services/interfaces/variant.service.interface.js';
import { VARIANT_COMMAND_HANDLERS } from '../../application/commands/variant/index.js';
import { VARIANT_QUERY_HANDLERS } from '../../application/queries/variant/index.js';
import { VariantValidator, VARIANT_VALIDATOR } from '../../interfaces/validators/variant.validator.js';

@Module({
  imports: [PrismaRepositoriesModule],
  controllers: [ProductVariantController],
  providers: [
    VariantService,
    { provide: VARIANT_SERVICE, useExisting: VariantService },
    VariantValidator,
    { provide: VARIANT_VALIDATOR, useExisting: VariantValidator },
    ...VARIANT_COMMAND_HANDLERS,
    ...VARIANT_QUERY_HANDLERS],
  exports: [VariantService, VARIANT_SERVICE],
})
export class ProductVariantModule {}
