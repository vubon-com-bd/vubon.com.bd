import { jest } from '@jest/globals';

import { UserContactService } from '@application/services/impl/user-contact.service';
import { ListContactsQuery } from '@application/queries/contact/list-contacts.query';
import { GetContactQuery } from '@application/queries/contact/get-contact.query';
import { AddContactCommand } from '@application/commands/contact/add-contact.command';
import { UpdateContactCommand } from '@application/commands/contact/update-contact.command';
import { DeleteContactCommand } from '@application/commands/contact/delete-contact.command';
import { VerifyContactCommand } from '@application/commands/contact/verify-contact.command';

describe('UserContactService — extended', () => {
  let service: UserContactService;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn().mockResolvedValue({ id: 'c-1' }) };
    queryBus = { execute: jest.fn().mockResolvedValue({ id: 'c-1' }) };
    service = new UserContactService(commandBus as never, queryBus as never);
  });

  it('findById → GetContactQuery', async () => {
    await service.findById('u-1', 'c-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetContactQuery));
  });

  it('update → UpdateContactCommand', async () => {
    await service.update('u-1', 'c-1', 'new@e.com');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(UpdateContactCommand));
  });

  it('remove → DeleteContactCommand', async () => {
    await service.remove('u-1', 'c-1');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(DeleteContactCommand));
  });

  it('verify → VerifyContactCommand', async () => {
    await service.verify('u-1', 'c-1', '123456');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(VerifyContactCommand));
  });

  it('list → ListContactsQuery', async () => {
    queryBus.execute.mockResolvedValue({ items: [], total: 0 });
    await service.list('u-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListContactsQuery));
  });

  it('add → AddContactCommand', async () => {
    await service.add({ userId: 'u-1' } as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(AddContactCommand));
  });
});
