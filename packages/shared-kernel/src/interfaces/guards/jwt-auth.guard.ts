/**
 * Global JWT auth guard.
 * Respects `@Public()` to skip auth on specific routes.
 * Also accepts INTERNAL_SERVICE_TOKEN for service-to-service calls.
 */
import {
  Injectable,
  type ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator.js';

export interface AuthenticatedUser {
  readonly userId: string;
  readonly sub?: string;
  readonly roles?: readonly string[];
  readonly permissions?: readonly string[];
  readonly internal?: boolean;
  readonly email?: string;
  readonly [key: string]: unknown;
}


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  override canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // 1. Check @Public()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    // 2. Accept internal service token
    const internalToken = process.env['INTERNAL_SERVICE_TOKEN'];
    if (internalToken) {
      const req = context.switchToHttp().getRequest<{
        headers?: { authorization?: string };
        user?: unknown;
      }>();
      const authHeader = req?.headers?.authorization ?? '';
      if (authHeader === `Bearer ${internalToken}`) {
        // Set a synthetic user for internal calls
        req.user = {
          userId: 'internal-service',
          sub: 'internal-service',
          roles: ['service'],
          internal: true,
        };
        return true;
      }
    }

    // 3. Default JWT flow
    return super.canActivate(context) as boolean | Promise<boolean>;
  }

  override handleRequest<TUser>(err: unknown, user: TUser | false): TUser {
    if (err || !user) {
      throw err instanceof Error
        ? err
        : new UnauthorizedException('Authentication required');
    }
    return user;
  }
}
