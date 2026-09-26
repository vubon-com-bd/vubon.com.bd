import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateBankAccountCommand } from './update-bank-account.command';
import type { VendorBankAccountRepository } from '../../../domain/repositories/vendor-bank-account.repository.interface';
import { BankAccountIdVO } from '../../../domain/value-objects/primitives/bank-account-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(UpdateBankAccountCommand)
export class UpdateBankAccountHandler
  extends BaseCommandHandler<UpdateBankAccountCommand, void>
  implements ICommandHandler<UpdateBankAccountCommand>
{
  readonly commandType = 'vendor.bank-account.update';

  constructor(
    private readonly bankRepo: VendorBankAccountRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateBankAccountCommand): Promise<void> {
    const account = await this.bankRepo.findById(
      BankAccountIdVO.create(command.accountId),
    );
    if (!account) throw new VendorNotFoundAppError(command.accountId);
    void this.eventBus;
    throw new Error('update-bank-account orchestration not yet wired');
  }
}
