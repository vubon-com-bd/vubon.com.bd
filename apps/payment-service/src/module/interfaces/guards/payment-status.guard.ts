/**
 * PaymentStatusGuard — enforces @PaymentStatus(...) metadata on routes
 * @module payment-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '../../domain/repositories/payment.repository.interface.js';
import { PAYMENT_STATUS_METADATA_KEY } from '../decorators/payment-status.decorator.js';

@Injectable()
export class PaymentStatusGuard extends BaseGuard {
  constructor(
    @Inject(PAYMENT_REPOSITORY) private readonly paymentRepo: PaymentRepository,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowed = this.reflector.getAllAndOverride<readonly string[]>(
      PAYMENT_STATUS_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!allowed || allowed.length === 0) return true;

    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
    }>();
    const paymentId = req.params?.paymentId ?? req.params?.id;
    if (!paymentId) return true;

    const payment = await this.paymentRepo.findById(paymentId);
    if (!payment) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Payment not found',
      });
    }

    if (!allowed.includes(payment.status.value)) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: `Payment status "${payment.status.value}" not allowed. Expected: ${allowed.join(', ')}`,
      });
    }
    return true;
  }
}
