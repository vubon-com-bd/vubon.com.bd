/**
 * OwnPaymentGuard — resource-level ownership check
 * @module payment-service/interfaces/guards
 *
 * Uses BaseGuard from kernel + PaymentRepository injection.
 * Admin role bypasses ownership check.
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS, ROLE } from '@vubon/shared-constants/common';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '@domain/repositories/payment.repository.interface';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';

@Injectable()
export class OwnPaymentGuard extends BaseGuard {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly repo: PaymentRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
      user?: { userId?: string; roles?: readonly string[] };
    }>();

    const paymentId = req.params?.['paymentId'] ?? req.params?.['id'];
    if (!paymentId) return true;

    const user = req.user;
    if (!user?.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Authentication required',
      });
    }

    const isAdmin =
      user.roles?.includes(ROLE.ADMIN) ||
      user.roles?.includes(ROLE.SUPER_ADMIN);
    if (isAdmin) return true;

    const vo = PaymentIdVO.create(paymentId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Payment not found',
      });
    }

    if (entity.userId.value !== user.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'You do not own this payment',
      });
    }

    return true;
  }
}
