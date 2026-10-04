/**
 * Base Guard
 * @module shared-kernel/interfaces/guards
 */
import type { CanActivate, ExecutionContext } from '@nestjs/common';

export abstract class BaseGuard implements CanActivate {
  abstract canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
