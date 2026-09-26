import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { getOptionalEnvBool } from '@vubon/shared-config/common';

@Injectable()
export class RealTimeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const enabled = getOptionalEnvBool('REALTIME_ENABLED', false);
    if (!enabled) {
      throw new ForbiddenException('Real-time analytics disabled');
    }

    const request = context
      .switchToHttp()
      .getRequest<{ user?: { permissions?: readonly string[] } }>();
    const permissions = request.user?.permissions ?? [];

    if (!permissions.includes('analytics.realtime')) {
      throw new ForbiddenException('Real-time access denied');
    }
    return true;
  }
}
