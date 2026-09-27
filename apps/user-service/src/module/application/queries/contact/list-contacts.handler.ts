/**
 * ListContactsHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListContactsQuery } from './list-contacts.query.js';
import { USER_CONTACT_REPOSITORY } from '@domain/repositories/user-contact.repository.interface';
import type { UserContactRepository } from '@domain/repositories/user-contact.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserContactMapper } from '../../mappers/user-contact.mapper.js';
import type { ContactResponseDTO } from '../../dtos/responses/contact-response.dto.js';

export interface ListContactsResult {
  readonly items: readonly ContactResponseDTO[];
  readonly total: number;
}

@QueryHandler(ListContactsQuery)
export class ListContactsHandler
  implements IQueryHandler<ListContactsQuery, ListContactsResult>
{
  constructor(
    @Inject(USER_CONTACT_REPOSITORY)
    private readonly contactRepo: UserContactRepository
  ) {}

  async execute(query: ListContactsQuery): Promise<ListContactsResult> {
    const items = await this.contactRepo.findByUserId(UserIdVO.create(query.userId));
    return {
      items: UserContactMapper.toResponseList(items),
      total: items.length,
    };
  }
}
