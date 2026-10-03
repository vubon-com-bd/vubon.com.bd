import { Injectable, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { BaseGuard } from './base.guard';

/**
 * Passes only if the route is marked `@Public()`.
 */
@Injectable()
export class PublicGuard extends BaseGuard {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  override check(context: ExecutionContext): boolean {
    return Boolean(
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
    );
  }
}
