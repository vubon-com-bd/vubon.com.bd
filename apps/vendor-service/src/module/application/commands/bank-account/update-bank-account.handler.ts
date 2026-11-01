import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateBankAccountCommand } from './update-bank-account.command.js';
import {
  VENDOR_BANK_ACCOUNT_SERVICE,
  type IVendorBankAccountService,
} from '../../services/interfaces/vendor-bank-account.service.interface.js';
import type { BankAccountResponseDTO } from '../../dtos/responses/bank-account-response.dto.js';

@CommandHandler(UpdateBankAccountCommand)
export class UpdateBankAccountHandler
  implements ICommandHandler<UpdateBankAccountCommand, BankAccountResponseDTO>
{
  constructor(
    @Inject(VENDOR_BANK_ACCOUNT_SERVICE)
    private readonly service: IVendorBankAccountService,
  ) {}

  async execute(c: UpdateBankAccountCommand): Promise<BankAccountResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
