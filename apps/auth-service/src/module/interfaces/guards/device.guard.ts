/**
 * DeviceGuard — enforces trusted-device requirement
 * @module auth-service/interfaces/guards
 */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DEVICE_TRUSTED_KEY } from '../decorators/device-trusted.decorator';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';

@Injectable()
export class DeviceGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<boolean>(
      DEVICE_TRUSTED_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required) return true;

    const request = context
      .switchToHttp()
      .getRequest<{ user?: AuthenticatedUser }>();
    const user = request.user;
    if (!user?.deviceTrusted) {
      throw new ForbiddenException('Trusted device required');
    }
    return true;
  }
}
