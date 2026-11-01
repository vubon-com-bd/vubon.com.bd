/**
 * GuestCartGuard — validates guest token for guest-only routes
 * @module cart-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  GUEST_CART_REPOSITORY,
  type GuestCartRepository,
} from '../../domain/repositories/guest-cart.repository.interface.js';

@Injectable()
export class GuestCartGuard extends BaseGuard {
  constructor(
    @Inject(GUEST_CART_REPOSITORY)
    private readonly repo: GuestCartRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
      user?: { userId?: string };
    }>();

    // If already authenticated as user → allow (user cart path)
    if (req.user?.userId) return true;

    // Otherwise require guest token
    const token =
      this.extractToken(req.headers['x-guest-token']) ??
      this.extractToken(req.headers['guest-token']);

    if (!token) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Guest token required',
      });
    }

    const guest = await this.repo.findByToken(token);
    if (!guest) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Invalid or expired guest token',
      });
    }

    if (!guest.isActive()) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: `Guest cart status: ${guest.status.value}`,
      });
    }

    return true;
  }

  private extractToken(raw: string | string[] | undefined): string | undefined {
    if (Array.isArray(raw)) return raw[0];
    return raw;
  }
}
