import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthDevicesQuery } from './list-auth-devices.query.js';
import type { AuthDeviceRepository } from '../../../domain/repositories/auth-device.repository.interface.js';
import type { AuthDeviceResponseDTO } from '../../dtos/responses/auth-device-response.dto.js';
import { AUTH_DEVICE_REPO } from '../../tokens.js';

@QueryHandler(ListAuthDevicesQuery)
export class ListAuthDevicesHandler
  extends BaseQueryHandler<ListAuthDevicesQuery, readonly AuthDeviceResponseDTO[]>
  implements IQueryHandler<ListAuthDevicesQuery> {
  readonly queryType = 'ListAuthDevicesQuery';
  constructor(
    @Inject(AUTH_DEVICE_REPO) private readonly repo: AuthDeviceRepository,
  ) { super(); }

  async execute(
    query: ListAuthDevicesQuery,
  ): Promise<readonly AuthDeviceResponseDTO[]> {
    const devices = await this.repo.findByUser(query.userId);
    return devices.map((d) => ({
      id: d.id,
      userId: d.userId,
      name: d.name,
      type: d.type.value,
      status: d.status.value,
      fingerprintMasked: d.fingerprint.masked,
      firstSeenAt: new Date(d.createdAt).toISOString(),
      lastSeenAt: new Date(d.lastSeenAt).toISOString(),
      isTrusted: d.isTrusted(),
    }));
  }
}
