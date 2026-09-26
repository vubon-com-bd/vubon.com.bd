import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorAddressController } from '../../interfaces/controllers/rest/vendor-address.controller';
import { VendorAddressPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-address.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorAddressController],
  providers: [VendorAddressPrismaRepository],
  exports: [VendorAddressPrismaRepository],
})
export class VendorAddressModule {}
