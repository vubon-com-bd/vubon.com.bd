/**
 * VerifiedPaymentGuard — require payment to be in a successful state
 * @module payment-service/interfaces/guards
 *
 * Blocks actions (e.g., refund) on unpaid payments.
 */
import {
  BadRequestException,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '@domain/repositories/payment.repository.interface';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';

@Injectable()
export class VerifiedPaymentGuard extends BaseGuard {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly repo: PaymentRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
    }>();

    const paymentId = req.params?.['paymentId'] ?? req.params?.['id'];
    if (!paymentId) return true;

    const vo = PaymentIdVO.create(paymentId);
    const payment = await this.repo.findByIdVO(vo);
    if (!payment) {
      throw new BadRequestException({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: 'Payment not found',
      });
    }

    if (!payment.isSuccessful() && !payment.isRefundable()) {
      throw new BadRequestException({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: `Payment status "${payment.status.value}" is not verified`,
      });
    }

    return true;
  }
}
