import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAuthDeviceQuery } from './get-auth-device.query';
import type { AuthDeviceRepository } from '../../../domain/repositories/auth-device.repository.interface';
import type { AuthDeviceResponseDTO } from '../../dtos/responses/auth-device-response.dto';

@QueryHandler(GetAuthDeviceQuery)
export class GetAuthDeviceHandler
  extends BaseQueryHandler<GetAuthDeviceQuery, AuthDeviceResponseDTO | null>
  implements IQueryHandler<GetAuthDeviceQuery>
{
  readonly queryType = 'auth.get-device';

  constructor(@Inject('AuthDeviceRepository') private readonly deviceRepo: AuthDeviceRepository) {
    super();
  }

  async execute(query: GetAuthDeviceQuery): Promise<AuthDeviceResponseDTO | null> {
    const entity = await this.deviceRepo.findById(query.deviceId);
    if (!entity) return null;
    return {
      id: entity.id,
      type: entity.type.value,
      name: entity.name ?? undefined,
      trusted: entity.isTrusted,
      lastActiveAt: entity.lastSeenAt.toISOString(),
      createdAt: entity.createdAt,
      isCurrent: false,
    };
  }
}
