/**
 * VendorBankAccountModule
 * @module vendor-service/modules/vendor-bank-account
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorBankAccountController } from '../../interfaces/controllers/rest/vendor-bank-account.controller.js';

import { VENDOR_BANK_ACCOUNT_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_BANK_ACCOUNT_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_BANK_ACCOUNT_EVENT_HANDLERS } from './events/index.js';

import { VendorBankAccountService } from '../../application/services/impl/vendor-bank-account.service.js';
import { VENDOR_BANK_ACCOUNT_SERVICE } from '../../application/services/interfaces/vendor-bank-account.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorBankAccountController],
  providers: [
    VendorBankAccountService,
    { provide: VENDOR_BANK_ACCOUNT_SERVICE, useExisting: VendorBankAccountService },
    ...(VENDOR_BANK_ACCOUNT_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_BANK_ACCOUNT_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_BANK_ACCOUNT_EVENT_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [VendorBankAccountService, VENDOR_BANK_ACCOUNT_SERVICE],
})
export class VendorBankAccountModule {}
