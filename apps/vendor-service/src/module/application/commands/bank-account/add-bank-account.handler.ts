import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddBankAccountCommand } from './add-bank-account.command.js';
import {
  VENDOR_BANK_ACCOUNT_SERVICE,
  type IVendorBankAccountService,
} from '../../services/interfaces/vendor-bank-account.service.interface.js';
import type { BankAccountResponseDTO } from '../../dtos/responses/bank-account-response.dto.js';

@CommandHandler(AddBankAccountCommand)
export class AddBankAccountHandler
  implements ICommandHandler<AddBankAccountCommand, BankAccountResponseDTO>
{
  constructor(
    @Inject(VENDOR_BANK_ACCOUNT_SERVICE)
    private readonly service: IVendorBankAccountService,
  ) {}

  async execute(c: AddBankAccountCommand): Promise<BankAccountResponseDTO> {
    return this.service.add(c.dto, c.actorId);
  }
}
