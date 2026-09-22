import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CalculateCommissionCommand } from './calculate-commission.command';
import type { VendorCommissionRepository } from '../../../domain/repositories/vendor-commission.repository.interface';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import { VendorCommissionEntity } from '../../../domain/entities/vendor-commission.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import { CommissionRateVO } from '../../../domain/value-objects/primitives/commission-rate.vo';
import { CommissionTypeVO } from '../../../domain/value-objects/primitives/commission-type.vo';
import { PayoutAmountVO } from '../../../domain/value-objects/primitives/payout-amount.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { CommissionResponseDto } from '../../dtos/responses/commission-response.dto';

@CommandHandler(CalculateCommissionCommand)
export class CalculateCommissionHandler
  extends BaseCommandHandler<CalculateCommissionCommand, CommissionResponseDto>
  implements ICommandHandler<CalculateCommissionCommand>
{
  readonly commandType = 'vendor.commission.calculate';

  constructor(
    private readonly vendorRepo: VendorRepository,
    private readonly commissionRepo: VendorCommissionRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CalculateCommissionCommand): Promise<CommissionResponseDto> {
    const vendorId = VendorIdVO.create(command.vendorId);
    const vendor = await this.vendorRepo.findById(vendorId);
    if (!vendor) throw new VendorNotFoundAppError(command.vendorId);

    const rate = CommissionRateVO.create('10');
    const orderAmount = PayoutAmountVO.create(command.orderAmount, command.currency);
    const commissionAmount = PayoutAmountVO.create(
      Math.round(command.orderAmount * 0.1 * 100) / 100,
      command.currency,
    );

    const entity = VendorCommissionEntity.create({
      vendorId,
      orderId: OrderIdVO.create(command.orderId),
      rate,
      type: CommissionTypeVO.create('percentage'),
      orderAmount,
      commissionAmount,
      isSettled: false,
    });

    await this.commissionRepo.save(entity);

    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }

    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      orderId: entity.orderId.value,
      rate: entity.rate.numeric,
      type: entity.type.value,
      orderAmount: entity.orderAmount.amount,
      commissionAmount: entity.commissionAmount.amount,
      currency: entity.orderAmount.currency,
      isSettled: entity.isSettled,
      calculatedAt: entity.createdAt,
    };
  }
}
