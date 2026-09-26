import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthDeviceQuery } from './get-auth-device.query';
import type { AuthDeviceRepository } from '../../../domain/repositories/auth-device.repository.interface';
import type { AuthDeviceResponseDTO } from '../../dtos/responses/auth-device-response.dto';
import { DeviceNotFoundError } from '../../../domain/errors/device.errors';
import { AUTH_DEVICE_REPO } from '../../tokens';

@QueryHandler(GetAuthDeviceQuery)
export class GetAuthDeviceHandler
  extends BaseQueryHandler<GetAuthDeviceQuery, AuthDeviceResponseDTO>
  implements IQueryHandler<GetAuthDeviceQuery> {
  readonly queryType = 'GetAuthDeviceQuery';
  constructor(
    @Inject(AUTH_DEVICE_REPO) private readonly repo: AuthDeviceRepository,
  ) { super(); }

  async execute(query: GetAuthDeviceQuery): Promise<AuthDeviceResponseDTO> {
    const device = await this.repo.findById(query.deviceId);
    if (!device) throw new DeviceNotFoundError(query.deviceId);
    return {
      id: device.id,
      userId: device.userId,
      name: device.name,
      type: device.type.value,
      status: device.status.value,
      fingerprintMasked: device.fingerprint.masked,
      firstSeenAt: new Date(device.createdAt).toISOString(),
      lastSeenAt: new Date(device.lastSeenAt).toISOString(),
      isTrusted: device.isTrusted(),
    };
  }
}
