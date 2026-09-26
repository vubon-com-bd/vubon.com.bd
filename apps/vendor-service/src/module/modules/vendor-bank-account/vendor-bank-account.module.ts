import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorBankAccountController } from '../../interfaces/controllers/rest/vendor-bank-account.controller';
import { AddBankAccountHandler } from '../../application/commands/bank-account';
import { UpdateBankAccountHandler } from '../../application/commands/bank-account';
import { DeleteBankAccountHandler } from '../../application/commands/bank-account';
import { SetDefaultAccountHandler } from '../../application/commands/bank-account';
import { VendorBankAccountPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-bank-account.prisma.repository';

const CommandHandlers = [
  AddBankAccountHandler,
  UpdateBankAccountHandler,
  DeleteBankAccountHandler,
  SetDefaultAccountHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [VendorBankAccountController],
  providers: [VendorBankAccountPrismaRepository, ...CommandHandlers],
  exports: [VendorBankAccountPrismaRepository],
})
export class VendorBankAccountModule {}
