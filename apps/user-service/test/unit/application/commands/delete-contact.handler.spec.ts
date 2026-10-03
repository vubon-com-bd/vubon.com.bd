import { DeleteContactHandler } from '@application/commands/contact/delete-contact.handler';
import { DeleteContactCommand } from '@application/commands/contact/delete-contact.command';
import { UserContactEntity } from '@domain/entities/user-contact.entity';
import { ContactIdVO } from '@domain/value-objects/primitives/contact-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ContactTypeVO } from '@domain/value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '@domain/value-objects/primitives/contact-value.vo';
import { createUserContactRepositoryMock } from '../../../helpers/user-repository.mock';

describe('DeleteContactHandler', () => {
  let handler: DeleteContactHandler;
  let contactRepo: ReturnType<typeof createUserContactRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    contactRepo = createUserContactRepositoryMock();
    handler = new DeleteContactHandler(contactRepo as never);
  });

  it('should delete contact', async () => {
    const contact = UserContactEntity.create({
      contactId: ContactIdVO.create('c-1'),
      userId: UserIdVO.create('user-1'),
      type: ContactTypeVO.create('email'),
      contactValue: ContactValueVO.create('user@example.com'),
      isPrimary: false,
      now,
    });
    contactRepo.findById.mockResolvedValue(contact);

    const result = await handler.execute(new DeleteContactCommand('user-1', 'c-1'));
    expect(result.success).toBe(true);
    expect(contactRepo.delete).toHaveBeenCalledWith('c-1');
  });

  it('should throw when not found', async () => {
    contactRepo.findById.mockResolvedValue(null);
    await expect(
      handler.execute(new DeleteContactCommand('user-1', 'missing'))
    ).rejects.toThrow();
  });
});
