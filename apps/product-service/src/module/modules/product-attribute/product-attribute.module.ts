/**
 * ProductAttributeModule
 */
import { Module } from '@nestjs/common';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/repositories.module.js';
import { ProductAttributeController } from '../../interfaces/controllers/rest/product-attribute.controller.js';
import { AttributeService } from '../../application/services/impl/attribute.service.js';
import { ATTRIBUTE_SERVICE } from '../../application/services/interfaces/attribute.service.interface.js';
import { ATTRIBUTE_COMMAND_HANDLERS } from '../../application/commands/attribute/index.js';
import { ATTRIBUTE_QUERY_HANDLERS } from '../../application/queries/attribute/index.js';

@Module({
  imports: [PrismaRepositoriesModule],
  controllers: [ProductAttributeController],
  providers: [
    AttributeService,
    { provide: ATTRIBUTE_SERVICE, useExisting: AttributeService },
    ...ATTRIBUTE_COMMAND_HANDLERS,
    ...ATTRIBUTE_QUERY_HANDLERS],
  exports: [AttributeService, ATTRIBUTE_SERVICE],
})
export class ProductAttributeModule {}
