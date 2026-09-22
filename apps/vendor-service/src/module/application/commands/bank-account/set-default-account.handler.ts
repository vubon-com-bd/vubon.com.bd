import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SetDefaultAccountCommand } from './set-default-account.command';
import type { VendorBankAccountRepository } from '../../../domain/repositories/vendor-bank-account.repository.interface';
import { BankAccountIdVO } from '../../../domain/value-objects/primitives/bank-account-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(SetDefaultAccountCommand)
export class SetDefaultAccountHandler
  extends BaseCommandHandler<SetDefaultAccountCommand, void>
  implements ICommandHandler<SetDefaultAccountCommand>
{
  readonly commandType = 'vendor.bank-account.set-default';

  constructor(
    private readonly bankRepo: VendorBankAccountRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SetDefaultAccountCommand): Promise<void> {
    const account = await this.bankRepo.findById(
      BankAccountIdVO.create(command.accountId),
    );
    if (!account) throw new VendorNotFoundAppError(command.accountId);
    void this.eventBus;
    throw new Error('set-default-account orchestration not yet wired');
  }
}
