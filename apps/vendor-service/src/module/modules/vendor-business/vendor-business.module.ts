import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorBusinessController } from '../../interfaces/controllers/rest/vendor-business.controller';
import { VendorBusinessPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-business.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorBusinessController],
  providers: [VendorBusinessPrismaRepository],
  exports: [VendorBusinessPrismaRepository],
})
export class VendorBusinessModule {}
