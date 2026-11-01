/**
 * DeviceOwnerGuard — verifies device belongs to current user
 * @module notification-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS, ROLE } from '@vubon/shared-constants/common';

import {
  DEVICE_REPOSITORY,
  type DeviceRepository,
} from '@domain/repositories/device.repository.interface.js';
import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';

@Injectable()
export class DeviceOwnerGuard extends BaseGuard {
  constructor(
    @Inject(DEVICE_REPOSITORY)
    private readonly repo: DeviceRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
      user?: { userId?: string; roles?: readonly string[] };
    }>();

    const deviceId = req.params?.['deviceId'] ?? req.params?.['id'];
    if (!deviceId) return true;

    const user = req.user;
    if (!user?.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Authentication required',
      });
    }

    const isAdmin =
      user.roles?.includes(ROLE.ADMIN) ||
      user.roles?.includes(ROLE.SUPER_ADMIN);
    if (isAdmin) return true;

    const vo = DeviceIdVO.create(deviceId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Device not found',
      });
    }

    if (entity.vo.userId.value !== user.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'You do not own this device',
      });
    }

    return true;
  }
}
