import { jest } from '@jest/globals';

import { UserContactService } from '@application/services/impl/user-contact.service';
import { ListContactsQuery } from '@application/queries/contact/list-contacts.query';
import { AddContactCommand } from '@application/commands/contact/add-contact.command';
import { VerifyContactCommand } from '@application/commands/contact/verify-contact.command';

describe('Application UserContactService', () => {
  let service: UserContactService;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    service = new UserContactService(commandBus as never, queryBus as never);
  });

  it('list → ListContactsQuery', async () => {
    queryBus.execute.mockResolvedValue({ items: [], total: 0 });
    await service.list('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListContactsQuery));
  });

  it('add → AddContactCommand', async () => {
    commandBus.execute.mockResolvedValue({ id: 'c-1' });
    await service.add({ userId: 'user-1' } as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(AddContactCommand));
  });

  it('verify → VerifyContactCommand', async () => {
    commandBus.execute.mockResolvedValue({ id: 'c-1', isVerified: true });
    await service.verify('user-1', 'c-1', '123456');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(VerifyContactCommand));
  });
});
