import { UpdateContactHandler } from '@application/commands/contact/update-contact.handler';
import { UpdateContactCommand } from '@application/commands/contact/update-contact.command';
import { UserContactEntity } from '@domain/entities/user-contact.entity';
import { ContactIdVO } from '@domain/value-objects/primitives/contact-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ContactTypeVO } from '@domain/value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '@domain/value-objects/primitives/contact-value.vo';
import { createUserContactRepositoryMock } from '../../../helpers/user-repository.mock';

describe('UpdateContactHandler', () => {
  let handler: UpdateContactHandler;
  let contactRepo: ReturnType<typeof createUserContactRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    contactRepo = createUserContactRepositoryMock();
    handler = new UpdateContactHandler(contactRepo as never);
  });

  it('should update contact value', async () => {
    const contact = UserContactEntity.create({
      contactId: ContactIdVO.create('c-1'),
      userId: UserIdVO.create('user-1'),
      type: ContactTypeVO.create('email'),
      contactValue: ContactValueVO.create('old@example.com'),
      isPrimary: false,
      now,
    });
    contactRepo.findById.mockResolvedValue(contact);

    const result = await handler.execute(
      new UpdateContactCommand('user-1', 'c-1', 'new@example.com')
    );
    expect(result.userId).toBe('user-1');
    expect(contactRepo.save).toHaveBeenCalled();
  });

  it('should throw when not found', async () => {
    contactRepo.findById.mockResolvedValue(null);
    await expect(
      handler.execute(new UpdateContactCommand('user-1', 'missing', 'x@y.com'))
    ).rejects.toThrow();
  });
});
