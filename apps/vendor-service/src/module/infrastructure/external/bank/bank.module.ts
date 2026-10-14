/**
 * Vendor Bank Module
 * @module vendor-service/infrastructure/external/bank
 */
import { Global, Module } from '@nestjs/common';
import { BANK_PROVIDERS, BankService } from './bank.service.js';
import { BkashProvider } from './providers/bkash.provider.js';
import { NagadProvider } from './providers/nagad.provider.js';
import { RocketProvider } from './providers/rocket.provider.js';
import { BankTransferProvider } from './providers/bank-transfer.provider.js';

@Global()
@Module({
  providers: [
    BkashProvider,
    NagadProvider,
    RocketProvider,
    BankTransferProvider,
    {
      provide: BANK_PROVIDERS,
      useFactory: (
        bkash: BkashProvider,
        nagad: NagadProvider,
        rocket: RocketProvider,
        bt: BankTransferProvider,
      ) => [bkash, nagad, rocket, bt],
      inject: [BkashProvider, NagadProvider, RocketProvider, BankTransferProvider],
    },
    BankService,
  ],
  exports: [BankService, BANK_PROVIDERS],
})
export class BankModule {}
