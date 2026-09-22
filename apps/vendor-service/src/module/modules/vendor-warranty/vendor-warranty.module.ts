import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorWarrantyController } from '../../interfaces/controllers/rest/vendor-warranty.controller';
import { UpdateWarrantyHandler } from '../../application/commands/warranty';
import { VendorWarrantyPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-warranty.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorWarrantyController],
  providers: [
    VendorWarrantyPrismaRepository,
    UpdateWarrantyHandler,
  ],
  exports: [VendorWarrantyPrismaRepository],
})
export class VendorWarrantyModule {}
