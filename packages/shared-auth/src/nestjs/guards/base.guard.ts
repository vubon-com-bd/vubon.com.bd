import type { CanActivate, ExecutionContext } from '@nestjs/common';

/**
 * Base guard — all custom guards should extend this.
 * Provides a hook-based canActivate that subclasses implement via
 * `check()`.
 */
export abstract class BaseGuard implements CanActivate {
  abstract check(context: ExecutionContext): boolean | Promise<boolean>;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return this.check(context);
  }
}
