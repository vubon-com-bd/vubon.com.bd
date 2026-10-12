/**
 * Local JwtAuthGuard — user-service
 * @module user-service/interfaces/guards
 *
 * Uses `new Reflector()` internally instead of DI to sidestep pnpm's
 * dual @nestjs/core identity problem in this monorepo (peer-dep hash mismatch
 * means the guard's `Reflector` class differs from the one NestJS resolves
 * in the module container → DI failure).
 *
 * Behavior mirrors the kernel JwtAuthGuard:
 *   1. @Public() opt-out → allow
 *   2. require request.user → else 401
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@vubon/shared-kernel/interfaces/decorators';

interface AuthenticatedUser {
  readonly userId: string;
  readonly sessionId?: string;
  readonly roles?: readonly string[];
  readonly permissions?: readonly string[];
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  // No DI for Reflector — see module header note.
  private readonly reflector = new Reflector();

  canActivate(context: ExecutionContext): boolean {
    // 1. @Public() opt-out
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    // 2. require authenticated user
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedUser }>();
    if (!request.user) {
      throw new UnauthorizedException('Authentication required');
    }
    return true;
  }
}
