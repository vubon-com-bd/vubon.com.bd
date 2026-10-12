import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthDeviceQuery } from './get-auth-device.query.js';
import type { AuthDeviceResponseDTO } from '../../dtos/responses/auth-device-response.dto.js';
import type { DeviceRepository } from '../../../domain/repositories/device.repository.interface.js';
import { DEVICE_REPOSITORY } from '../../../domain/repositories/device.repository.interface.js';
import { DeviceNotFoundError } from '../../../domain/errors/device.errors.js';

@QueryHandler(GetAuthDeviceQuery)
export class GetAuthDeviceHandler
  extends BaseQueryHandler<GetAuthDeviceQuery, AuthDeviceResponseDTO>
  implements IQueryHandler<GetAuthDeviceQuery>
{
  readonly queryType = 'auth.get-device';
  constructor(@Inject(DEVICE_REPOSITORY) private readonly repo: DeviceRepository) { super(); }

  async execute(query: GetAuthDeviceQuery): Promise<AuthDeviceResponseDTO> {
    const device = await this.repo.findById(query.deviceId);
    if (!device) throw new DeviceNotFoundError(query.deviceId);
    return {
      id: device.id,
      userId: device.userId.value,
      type: device.type.value,
      name: device.name,
      os: device.os,
      browser: device.browser,
      trusted: device.trusted,
      trustedUntil: device.trustedUntil,
      lastActiveAt: device.lastActiveAt,
      isCurrent: false,
    };
  }
}
