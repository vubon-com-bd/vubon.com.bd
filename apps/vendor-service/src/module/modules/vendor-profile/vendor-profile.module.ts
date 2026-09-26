import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorProfileController } from '../../interfaces/controllers/rest/vendor-profile.controller';
import { VendorProfilePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-profile.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorProfileController],
  providers: [VendorProfilePrismaRepository],
  exports: [VendorProfilePrismaRepository],
})
export class VendorProfileModule {}
