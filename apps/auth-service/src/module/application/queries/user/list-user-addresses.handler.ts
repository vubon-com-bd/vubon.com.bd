import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserAddressesQuery } from './list-user-addresses.query';
import type { UserAddressRepository } from '../../../domain/repositories/user-address.repository.interface';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto';
import { USER_ADDRESS_REPO } from '../../tokens';

@QueryHandler(ListUserAddressesQuery)
export class ListUserAddressesHandler
  extends BaseQueryHandler<ListUserAddressesQuery, readonly UserAddressResponseDTO[]>
  implements IQueryHandler<ListUserAddressesQuery> {
  readonly queryType = 'ListUserAddressesQuery';
  constructor(
    @Inject(USER_ADDRESS_REPO) private readonly repo: UserAddressRepository,
  ) { super(); }

  async execute(
    query: ListUserAddressesQuery,
  ): Promise<readonly UserAddressResponseDTO[]> {
    const rows = await this.repo.findByUserId(query.userId);
    return rows.map((a) => ({
      id: a.id,
      userId: a.userId,
      label: a.label,
      line1: '',
      division: '',
      district: '',
      upazila: '',
      postalCode: a.postalCode,
      isDefault: a.isDefault,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    }));
  }
}
