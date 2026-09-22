import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorContactController } from '../../interfaces/controllers/rest/vendor-contact.controller';
import { VendorContactPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-contact.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorContactController],
  providers: [VendorContactPrismaRepository],
  exports: [VendorContactPrismaRepository],
})
export class VendorContactModule {}
