import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorFeatureController } from '../../interfaces/controllers/rest/vendor-feature.controller';
import { VendorFeaturePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-feature.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorFeatureController],
  providers: [VendorFeaturePrismaRepository],
  exports: [VendorFeaturePrismaRepository],
})
export class VendorFeatureModule {}
