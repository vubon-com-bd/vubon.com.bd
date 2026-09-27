import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserAddressQuery } from './get-user-address.query.js';
import type { UserAddressRepository } from '../../../domain/repositories/user-address.repository.interface.js';
import type { UserAddressResponseDTO } from '../../dtos/responses/user-address-response.dto.js';
import { USER_ADDRESS_REPO } from '../../tokens.js';

@QueryHandler(GetUserAddressQuery)
export class GetUserAddressHandler
  extends BaseQueryHandler<GetUserAddressQuery, UserAddressResponseDTO | null>
  implements IQueryHandler<GetUserAddressQuery> {
  readonly queryType = 'GetUserAddressQuery';
  constructor(
    @Inject(USER_ADDRESS_REPO) private readonly repo: UserAddressRepository,
  ) { super(); }

  async execute(
    query: GetUserAddressQuery,
  ): Promise<UserAddressResponseDTO | null> {
    const a = await this.repo.findById(query.addressId);
    if (!a) return null;
    return {
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
    };
  }
}
