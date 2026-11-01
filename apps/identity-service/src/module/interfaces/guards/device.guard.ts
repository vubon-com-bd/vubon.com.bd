/**
 * DeviceGuard — requires a trusted device
 * @module identity-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';

interface DeviceRequest {
  user?: {
    userId?: string;
    deviceTrusted?: boolean;
  };
}

@Injectable()
export class DeviceGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<DeviceRequest>();
    const user = req.user;

    if (!user?.userId) {
      throw new ForbiddenException('Authentication required');
    }

    if (user.deviceTrusted !== true) {
      throw new ForbiddenException('Trusted device required');
    }

    return true;
  }
}
