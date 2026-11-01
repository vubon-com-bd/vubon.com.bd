import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListBankAccountsQuery } from './list-bank-accounts.query.js';
import {
  VENDOR_BANK_ACCOUNT_SERVICE,
  type IVendorBankAccountService,
} from '../../services/interfaces/vendor-bank-account.service.interface.js';
import type { BankAccountListResponseDTO } from '../../dtos/responses/bank-account-response.dto.js';

@QueryHandler(ListBankAccountsQuery)
export class ListBankAccountsHandler
  implements IQueryHandler<ListBankAccountsQuery, BankAccountListResponseDTO>
{
  constructor(
    @Inject(VENDOR_BANK_ACCOUNT_SERVICE)
    private readonly service: IVendorBankAccountService,
  ) {}

  async execute(q: ListBankAccountsQuery): Promise<BankAccountListResponseDTO> {
    return this.service.listByVendor(q.vendorId);
  }
}
