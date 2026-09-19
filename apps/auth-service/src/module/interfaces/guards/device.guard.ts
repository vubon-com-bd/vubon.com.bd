import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

@Injectable()
export class DeviceGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ headers: Record<string, string | undefined> }>();
    const fingerprint = request.headers['x-device-fingerprint'];
    if (!fingerprint) {
      throw new ForbiddenException('Device fingerprint required');
    }
    return true;
  }
}
