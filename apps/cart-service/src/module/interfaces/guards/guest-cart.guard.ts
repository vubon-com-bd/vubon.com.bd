/**
 * GuestCartGuard — requires guest token header
 * @module cart-service/interfaces/guards
 */
import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS } from '@vubon/shared-constants/common';

@Injectable()
export class GuestCartGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<{
      headers?: Record<string, string | string[] | undefined>;
    }>();
    const token = req.headers?.['x-guest-token'];
    if (!token || (Array.isArray(token) && token.length === 0)) {
      throw new BadRequestException({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: 'X-Guest-Token header required',
      });
    }
    return true;
  }
}
