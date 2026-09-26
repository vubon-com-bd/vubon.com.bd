import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorShippingController } from '../../interfaces/controllers/rest/vendor-shipping.controller';
import { UpdateShippingHandler } from '../../application/commands/shipping';
import { SetShippingMethodsHandler } from '../../application/commands/shipping';
import { VendorShippingPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-shipping.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorShippingController],
  providers: [
    VendorShippingPrismaRepository,
    UpdateShippingHandler,
    SetShippingMethodsHandler,
  ],
  exports: [VendorShippingPrismaRepository],
})
export class VendorShippingModule {}
