import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAuthDevicesQuery } from './list-auth-devices.query';
import type { AuthDeviceRepository } from '../../../domain/repositories/auth-device.repository.interface';
import type { AuthDeviceResponseDTO } from '../../dtos/responses/auth-device-response.dto';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@QueryHandler(ListAuthDevicesQuery)
export class ListAuthDevicesHandler
  extends BaseQueryHandler<ListAuthDevicesQuery, readonly AuthDeviceResponseDTO[]>
  implements IQueryHandler<ListAuthDevicesQuery>
{
  readonly queryType = 'auth.list-devices';

  constructor(private readonly deviceRepo: AuthDeviceRepository) {
    super();
  }

  async execute(query: ListAuthDevicesQuery): Promise<readonly AuthDeviceResponseDTO[]> {
    const entities = await this.deviceRepo.findByUser(UserIdVO.create(query.userId));
    return entities.map((entity) => ({
      id: entity.id,
      type: entity.type.value,
      name: entity.name ?? undefined,
      trusted: entity.isTrusted,
      lastActiveAt: entity.lastSeenAt.toISOString(),
      createdAt: entity.createdAt,
      isCurrent: false,
    }));
  }
}
