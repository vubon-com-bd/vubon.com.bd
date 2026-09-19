import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserContactsQuery } from './list-user-contacts.query';
import type { UserContactRepository } from '../../../domain/repositories/user-contact.repository.interface';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

@QueryHandler(ListUserContactsQuery)
export class ListUserContactsHandler
  extends BaseQueryHandler<ListUserContactsQuery, readonly UserContactResponseDTO[]>
  implements IQueryHandler<ListUserContactsQuery>
{
  readonly queryType = 'user.list-contacts';

  constructor(private readonly contactRepo: UserContactRepository) {
    super();
  }

  async execute(query: ListUserContactsQuery): Promise<readonly UserContactResponseDTO[]> {
    const entity = await this.contactRepo.findByUserId(UserIdVO.create(query.userId));
    if (!entity) return [];
    return [{
      id: entity.id.value,
      value: entity.phone.value,
      type: 'phone',
      isPrimary: true,
      isVerified: false,
      label: undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }];
  }
}
