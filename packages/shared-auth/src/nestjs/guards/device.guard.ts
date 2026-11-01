import { Injectable, type ExecutionContext, ForbiddenException } from '@nestjs/common';
import type { AuthContext } from '@vubon/shared-types/auth';
import type { DeviceServiceContract } from '../../server/device/device.service.interface';
import { BaseGuard } from './base.guard';

interface RequestWithUser {
  user?: AuthContext & { deviceId?: string };
}

/**
 * Ensures the request comes from a trusted device.
 * Inject a DeviceServiceContract from your app module.
 */
@Injectable()
export class DeviceGuard extends BaseGuard {
  constructor(
    private readonly deviceService: DeviceServiceContract,
    private readonly headerName = 'x-device-id'
  ) {
    super();
  }

  override async check(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const user = req.user;
    if (!user) throw new ForbiddenException('No authenticated user');

    const headers = context.switchToHttp().getRequest<{
      headers?: Record<string, string | undefined>;
    }>().headers;
    const deviceId = user.deviceId ?? headers?.[this.headerName] ?? undefined;

    if (!deviceId) throw new ForbiddenException('Missing device id');

    const trusted = await this.deviceService.isTrusted(user.userId, deviceId);
    if (!trusted) throw new ForbiddenException('Untrusted device');
    return true;
  }
}
