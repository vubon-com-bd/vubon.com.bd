import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductAttributeController } from '../../interfaces/controllers/rest/product-attribute.controller';
import { ProductAttributeService } from '../../application/services/impl/product-attribute.service';
import {
  AddAttributeHandler,
  UpdateAttributeHandler,
  RemoveAttributeHandler,
} from '../../application/commands/attribute';
import { ProductAttributePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/product-attribute.prisma.repository';

const COMMAND_HANDLERS = [
  AddAttributeHandler,
  UpdateAttributeHandler,
  RemoveAttributeHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [ProductAttributeController],
  providers: [
    ProductAttributePrismaRepository,
    ProductAttributeService,
    ...COMMAND_HANDLERS,
  ],
  exports: [ProductAttributeService, ProductAttributePrismaRepository],
})
export class ProductAttributeModule {}
