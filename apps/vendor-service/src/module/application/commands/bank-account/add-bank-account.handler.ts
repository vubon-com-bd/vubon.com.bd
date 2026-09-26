import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddBankAccountCommand } from './add-bank-account.command';
import type { VendorBankAccountRepository } from '../../../domain/repositories/vendor-bank-account.repository.interface';
import { VendorBankAccountEntity } from '../../../domain/entities/vendor-bank-account.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { BankAccountNumberVO } from '../../../domain/value-objects/primitives/bank-account-number.vo';
import { BankNameVO } from '../../../domain/value-objects/primitives/bank-name.vo';
import type { BankAccountResponseDto } from '../../dtos/responses/bank-account-response.dto';

@CommandHandler(AddBankAccountCommand)
export class AddBankAccountHandler
  extends BaseCommandHandler<AddBankAccountCommand, BankAccountResponseDto>
  implements ICommandHandler<AddBankAccountCommand>
{
  readonly commandType = 'vendor.bank-account.add';

  constructor(
    private readonly bankRepo: VendorBankAccountRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AddBankAccountCommand): Promise<BankAccountResponseDto> {
    const accountNumber = BankAccountNumberVO.create(command.accountNumber);

    const entity = VendorBankAccountEntity.create({
      vendorId: VendorIdVO.create(command.vendorId),
      accountNumber,
      bankName: BankNameVO.create(command.bankName),
      accountHolderName: command.accountHolderName,
      branchName: command.branchName ?? null,
      routingNumber: command.routingNumber ?? null,
      isDefault: command.isDefault ?? false,
      isVerified: false,
    });

    await this.bankRepo.save(entity);

    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }

    const num = accountNumber.value;
    const masked = '*'.repeat(Math.max(0, num.length - 4)) + num.slice(-4);

    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      maskedAccountNumber: masked,
      bankName: entity.bankName.value,
      accountHolderName: entity.accountHolderName,
      branchName: entity.branchName,
      isDefault: entity.isDefault,
    };
  }
}
