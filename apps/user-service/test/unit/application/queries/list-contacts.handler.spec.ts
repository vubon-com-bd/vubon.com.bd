import { ListContactsHandler } from '@application/queries/contact/list-contacts.handler';
import { ListContactsQuery } from '@application/queries/contact/list-contacts.query';
import { UserContactEntity } from '@domain/entities/user-contact.entity';
import { ContactIdVO } from '@domain/value-objects/primitives/contact-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ContactTypeVO } from '@domain/value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '@domain/value-objects/primitives/contact-value.vo';
import { createUserContactRepositoryMock } from '../../../helpers/user-repository.mock';

describe('ListContactsHandler', () => {
  let handler: ListContactsHandler;
  let contactRepo: ReturnType<typeof createUserContactRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    contactRepo = createUserContactRepositoryMock();
    handler = new ListContactsHandler(contactRepo);
  });

  it('should return empty list when no contacts', async () => {
    contactRepo.findByUserId.mockResolvedValue([]);
    const result = await handler.execute(new ListContactsQuery('user-1'));
    expect(result.items.length).toBe(0);
  });

  it('should map contacts to DTOs', async () => {
    const c = UserContactEntity.create({
      contactId: ContactIdVO.create('c-1'),
      userId: UserIdVO.create('user-1'),
      type: ContactTypeVO.create('email'),
      contactValue: ContactValueVO.create('user@example.com'),
      isPrimary: true,
      now,
    });
    contactRepo.findByUserId.mockResolvedValue([c]);

    const result = await handler.execute(new ListContactsQuery('user-1'));
    expect(result.items.length).toBe(1);
    expect(result.items[0].id).toBe('c-1');
  });
});
