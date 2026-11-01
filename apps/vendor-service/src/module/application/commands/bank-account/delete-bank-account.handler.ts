import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteBankAccountCommand } from './delete-bank-account.command.js';
import {
  VENDOR_BANK_ACCOUNT_SERVICE,
  type IVendorBankAccountService,
} from '../../services/interfaces/vendor-bank-account.service.interface.js';

@CommandHandler(DeleteBankAccountCommand)
export class DeleteBankAccountHandler
  implements ICommandHandler<DeleteBankAccountCommand, { readonly success: true }>
{
  constructor(
    @Inject(VENDOR_BANK_ACCOUNT_SERVICE)
    private readonly service: IVendorBankAccountService,
  ) {}

  async execute(c: DeleteBankAccountCommand): Promise<{ readonly success: true }> {
    return this.service.remove(c.dto);
  }
}
