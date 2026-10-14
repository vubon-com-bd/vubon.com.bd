import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SetDefaultAccountCommand } from './set-default-account.command.js';
import {
  VENDOR_BANK_ACCOUNT_SERVICE,
  type IVendorBankAccountService,
} from '../../services/interfaces/vendor-bank-account.service.interface.js';
import type { BankAccountResponseDTO } from '../../dtos/responses/bank-account-response.dto.js';

@CommandHandler(SetDefaultAccountCommand)
export class SetDefaultAccountHandler
  implements ICommandHandler<SetDefaultAccountCommand, BankAccountResponseDTO>
{
  constructor(
    @Inject(VENDOR_BANK_ACCOUNT_SERVICE)
    private readonly service: IVendorBankAccountService,
  ) {}

  async execute(c: SetDefaultAccountCommand): Promise<BankAccountResponseDTO> {
    return this.service.setDefault(c.dto, c.actorId);
  }
}
