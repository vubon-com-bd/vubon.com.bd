import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateSplitPaymentCommand } from './create-split-payment.command';
import type { SplitPaymentRepository } from '../../../domain/repositories/split-payment.repository.interface';
import { SplitCalculationService } from '../../../domain/services/split-calculation.service';
import type { SplitResponseDTO } from '../../dtos/responses/split-response.dto';
import { PaymentOperationFailedError } from '../../errors/payment.errors';

@CommandHandler(CreateSplitPaymentCommand)
export class CreateSplitPaymentHandler
  extends BaseCommandHandler<CreateSplitPaymentCommand, readonly SplitResponseDTO[]>
  implements ICommandHandler<CreateSplitPaymentCommand>
{
  readonly commandType = 'split.create';

  constructor(
    @Inject('SplitPaymentRepository')
    private readonly splitRepo: SplitPaymentRepository,
    private readonly calculationService: SplitCalculationService,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateSplitPaymentCommand): Promise<readonly SplitResponseDTO[]> {
    // Validate percentages sum to 100
    const sum = command.shares.reduce((acc, s) => acc + s.percentage, 0);
    if (Math.abs(sum - 100) > 0.0001) {
      throw new PaymentOperationFailedError('split percentages must sum to 100');
    }
    void this.splitRepo;
    void this.calculationService;
    void this.eventBus;
    return [];
  }
}
