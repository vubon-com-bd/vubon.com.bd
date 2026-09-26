import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetDeviceQuery } from './get-device.query';
import type { DeviceRepository } from '../../../domain/repositories/device.repository.interface';
import { DeviceIdVO } from '../../../domain/value-objects/primitives/device-id.vo';
import type { DeviceResponseDTO } from '../../dtos/responses/device-response.dto';

@QueryHandler(GetDeviceQuery)
export class GetDeviceHandler
  extends BaseQueryHandler<GetDeviceQuery, DeviceResponseDTO | null>
  implements IQueryHandler<GetDeviceQuery>
{
  readonly queryType = 'device.get';

  constructor(private readonly deviceRepo: DeviceRepository) {
    super();
  }

  async execute(query: GetDeviceQuery): Promise<DeviceResponseDTO | null> {
    const entity = await this.deviceRepo.findById(DeviceIdVO.create(query.deviceId));
    if (!entity) return null;
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      platform: entity.platform.value,
      status: entity.status.value,
      fingerprint: entity.fingerprint,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
