import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorSuspensionController } from '../../interfaces/controllers/rest/vendor-suspension.controller';
import { SuspendVendorHandler } from '../../application/commands/suspension';
import { ReinstateVendorHandler } from '../../application/commands/suspension';
import { AppealSuspensionHandler } from '../../application/commands/suspension';
import { VendorSuspensionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-suspension.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorSuspensionController],
  providers: [
    VendorSuspensionPrismaRepository,
    SuspendVendorHandler,
    ReinstateVendorHandler,
    AppealSuspensionHandler,
  ],
  exports: [VendorSuspensionPrismaRepository],
})
export class VendorSuspensionModule {}
