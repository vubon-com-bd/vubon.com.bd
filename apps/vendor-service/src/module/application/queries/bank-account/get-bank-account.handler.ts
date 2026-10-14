import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetBankAccountQuery } from './get-bank-account.query.js';
import {
  VENDOR_BANK_ACCOUNT_SERVICE,
  type IVendorBankAccountService,
} from '../../services/interfaces/vendor-bank-account.service.interface.js';
import type { BankAccountResponseDTO } from '../../dtos/responses/bank-account-response.dto.js';

@QueryHandler(GetBankAccountQuery)
export class GetBankAccountHandler
  implements IQueryHandler<GetBankAccountQuery, BankAccountResponseDTO>
{
  constructor(
    @Inject(VENDOR_BANK_ACCOUNT_SERVICE)
    private readonly service: IVendorBankAccountService,
  ) {}

  async execute(q: GetBankAccountQuery): Promise<BankAccountResponseDTO> {
    return this.service.getById(q.bankAccountId);
  }
}
