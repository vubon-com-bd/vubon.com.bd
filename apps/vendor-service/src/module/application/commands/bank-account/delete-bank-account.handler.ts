import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteBankAccountCommand } from './delete-bank-account.command';
import type { VendorBankAccountRepository } from '../../../domain/repositories/vendor-bank-account.repository.interface';
import { BankAccountIdVO } from '../../../domain/value-objects/primitives/bank-account-id.vo';

@CommandHandler(DeleteBankAccountCommand)
export class DeleteBankAccountHandler
  extends BaseCommandHandler<DeleteBankAccountCommand, void>
  implements ICommandHandler<DeleteBankAccountCommand>
{
  readonly commandType = 'vendor.bank-account.delete';

  constructor(
    private readonly bankRepo: VendorBankAccountRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeleteBankAccountCommand): Promise<void> {
    await this.bankRepo.delete(BankAccountIdVO.create(command.accountId));
    void this.eventBus;
  }
}
