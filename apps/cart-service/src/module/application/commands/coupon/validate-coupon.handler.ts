import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ValidateCouponCommand } from './validate-coupon.command';
import { CouponValidationService } from '../../../domain/services/coupon-validation.service';
import type { CouponResponseDTO } from '../../dtos/responses/coupon-response.dto';
import { CouponOperationFailedError } from '../../errors/coupon.errors';

@CommandHandler(ValidateCouponCommand)
export class ValidateCouponHandler
  extends BaseCommandHandler<ValidateCouponCommand, CouponResponseDTO>
  implements ICommandHandler<ValidateCouponCommand>
{
  readonly commandType = 'cart.coupon.validate';

  constructor(private readonly validationService: CouponValidationService) {
    super();
  }

  async execute(command: ValidateCouponCommand): Promise<CouponResponseDTO> {
    const valid = this.validationService.validateCodeFormat(command.code);
    if (!valid) {
      throw new CouponOperationFailedError('invalid coupon format');
    }
    void command;
    throw new CouponOperationFailedError('not yet wired');
  }
}
