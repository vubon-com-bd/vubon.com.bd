import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { VERIFIED_PAYMENT_KEY } from '../decorators/verified-payment.decorator';

interface PaymentRequest {
  readonly payment?: { readonly status?: string };
}

@Injectable()
export class VerifiedPaymentGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<boolean>(
      VERIFIED_PAYMENT_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required) return true;

    const request = context.switchToHttp().getRequest<PaymentRequest>();
    const status = request.payment?.status;
    if (status !== 'verified' && status !== 'paid') {
      throw new ForbiddenException('Payment verification required');
    }
    return true;
  }
}
