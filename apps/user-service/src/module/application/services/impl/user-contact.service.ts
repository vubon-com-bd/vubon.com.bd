/**
 * UserContactService
 */
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { UserContactServiceInterface } from '../interfaces/user-contact.service.interface.js';
import { AddContactCommand } from '../../commands/contact/add-contact.command.js';
import { UpdateContactCommand } from '../../commands/contact/update-contact.command.js';
import { DeleteContactCommand } from '../../commands/contact/delete-contact.command.js';
import { VerifyContactCommand } from '../../commands/contact/verify-contact.command.js';
import { ListContactsQuery } from '../../queries/contact/list-contacts.query.js';
import { GetContactQuery } from '../../queries/contact/get-contact.query.js';
import type { AddContactRequestDTO } from '../../dtos/requests/contact/index.js';
import type { ContactResponseDTO } from '../../dtos/responses/contact-response.dto.js';
import type { ListContactsResult } from '../../queries/contact/list-contacts.handler.js';

@Injectable()
export class UserContactService implements UserContactServiceInterface {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  list(userId: string): Promise<ListContactsResult> {
    return this.queryBus.execute(new ListContactsQuery(userId));
  }

  findById(userId: string, contactId: string): Promise<ContactResponseDTO> {
    return this.queryBus.execute(new GetContactQuery(userId, contactId));
  }

  add(input: AddContactRequestDTO): Promise<ContactResponseDTO> {
    return this.commandBus.execute(new AddContactCommand(input));
  }

  update(
    userId: string,
    contactId: string,
    value?: string,
    label?: string,
    isPrimary?: boolean
  ): Promise<ContactResponseDTO> {
    return this.commandBus.execute(
      new UpdateContactCommand(userId, contactId, value, label, isPrimary)
    );
  }

  remove(userId: string, contactId: string): Promise<{ success: true }> {
    return this.commandBus.execute(new DeleteContactCommand(userId, contactId));
  }

  verify(
    userId: string,
    contactId: string,
    code: string
  ): Promise<ContactResponseDTO> {
    return this.commandBus.execute(
      new VerifyContactCommand(userId, contactId, code)
    );
  }
}
