import { jest } from '@jest/globals';

import { UserContactController } from '@interfaces/controllers/rest/user-contact.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ListContactsQuery } from '@application/queries/contact/list-contacts.query';
import { AddContactCommand } from '@application/commands/contact/add-contact.command';

describe('UserContactController', () => {
  let controller: UserContactController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new UserContactController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus
    );
  });

  it('should list contacts', async () => {
    queryBus.execute.mockResolvedValue({ items: [], total: 0 });
    const result = await controller.list('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListContactsQuery));
    expect(result.total).toBe(0);
  });

  it('should add contact', async () => {
    commandBus.execute.mockResolvedValue({
      id: 'c-1',
      userId: 'user-1',
      type: 'email',
      value: 'user@example.com',
      isPrimary: false,
      isVerified: false,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    });
    const result = await controller.add('user-1', {
      type: 'email',
      value: 'user@example.com',
    });
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(AddContactCommand));
    expect(result.id).toBe('c-1');
  });
});
