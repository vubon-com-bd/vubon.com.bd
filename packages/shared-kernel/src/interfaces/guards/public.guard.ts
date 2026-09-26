/**
 * Public Guard (marker — always allows)
 * @module shared-kernel/interfaces/guards
 */
import { Injectable } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class PublicGuard implements CanActivate {
  canActivate(_context: ExecutionContext): boolean {
    return true;
  }
}
