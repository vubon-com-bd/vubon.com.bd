import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUserContactQuery } from './get-user-contact.query';
import type { UserContactRepository } from '../../../domain/repositories/user-contact.repository.interface';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@QueryHandler(GetUserContactQuery)
export class GetUserContactHandler
  extends BaseQueryHandler<GetUserContactQuery, UserContactResponseDTO | null>
  implements IQueryHandler<GetUserContactQuery>
{
  readonly queryType = 'user.get-contact';

  constructor(@Inject('UserContactRepository') private readonly contactRepo: UserContactRepository) {
    super();
  }

  async execute(query: GetUserContactQuery): Promise<UserContactResponseDTO | null> {
    const entity = await this.contactRepo.findByUserId(UserIdVO.create(query.userId));
    if (!entity) return null;
    return {
      id: entity.id.value,
      value: entity.phone.value,
      type: 'phone',
      isPrimary: true,
      isVerified: false,
      label: undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
