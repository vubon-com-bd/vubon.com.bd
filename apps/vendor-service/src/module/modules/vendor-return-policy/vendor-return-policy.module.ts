import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorReturnPolicyController } from '../../interfaces/controllers/rest/vendor-return-policy.controller';
import { UpdateReturnPolicyHandler } from '../../application/commands/return-policy';
import { VendorReturnPolicyPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-return-policy.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorReturnPolicyController],
  providers: [
    VendorReturnPolicyPrismaRepository,
    UpdateReturnPolicyHandler,
  ],
  exports: [VendorReturnPolicyPrismaRepository],
})
export class VendorReturnPolicyModule {}
