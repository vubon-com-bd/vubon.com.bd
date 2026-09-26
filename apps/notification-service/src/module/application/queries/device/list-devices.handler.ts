import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListDevicesQuery } from './list-devices.query';
import type { DeviceRepository } from '../../../domain/repositories/device.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { DeviceResponseDTO } from '../../dtos/responses/device-response.dto';

@QueryHandler(ListDevicesQuery)
export class ListDevicesHandler
  extends BaseQueryHandler<ListDevicesQuery, readonly DeviceResponseDTO[]>
  implements IQueryHandler<ListDevicesQuery>
{
  readonly queryType = 'device.list';

  constructor(private readonly deviceRepo: DeviceRepository) {
    super();
  }

  async execute(query: ListDevicesQuery): Promise<readonly DeviceResponseDTO[]> {
    const entities = await this.deviceRepo.findByUser(UserIdVO.create(query.userId));
    return entities.map((e) => ({
      id: e.id.value,
      userId: e.userId.value,
      type: e.type.value,
      platform: e.platform.value,
      status: e.status.value,
      fingerprint: e.fingerprint,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    }));
  }
}
