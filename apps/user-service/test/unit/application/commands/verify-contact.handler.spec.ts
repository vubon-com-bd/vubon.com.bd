import { VerifyContactHandler } from '@application/commands/contact/verify-contact.handler';
import { VerifyContactCommand } from '@application/commands/contact/verify-contact.command';
import { UserContactEntity } from '@domain/entities/user-contact.entity';
import { ContactIdVO } from '@domain/value-objects/primitives/contact-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ContactTypeVO } from '@domain/value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '@domain/value-objects/primitives/contact-value.vo';
import { createUserContactRepositoryMock } from '../../../helpers/user-repository.mock';

describe('VerifyContactHandler', () => {
  let handler: VerifyContactHandler;
  let contactRepo: ReturnType<typeof createUserContactRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    contactRepo = createUserContactRepositoryMock();
    handler = new VerifyContactHandler(contactRepo as never);
  });

  const buildContact = () =>
    UserContactEntity.create({
      contactId: ContactIdVO.create('c-1'),
      userId: UserIdVO.create('user-1'),
      type: ContactTypeVO.create('email'),
      contactValue: ContactValueVO.create('user@example.com'),
      isPrimary: false,
      now,
    });

  it('should verify contact with valid 6-digit code', async () => {
    contactRepo.findById.mockResolvedValue(buildContact());
    const result = await handler.execute(
      new VerifyContactCommand('user-1', 'c-1', '123456')
    );
    expect(result.isVerified).toBe(true);
  });

  it('should throw on invalid code format', async () => {
    contactRepo.findById.mockResolvedValue(buildContact());
    await expect(
      handler.execute(new VerifyContactCommand('user-1', 'c-1', 'abc'))
    ).rejects.toThrow();
  });

  it('should throw when contact not found', async () => {
    contactRepo.findById.mockResolvedValue(null);
    await expect(
      handler.execute(new VerifyContactCommand('user-1', 'missing', '123456'))
    ).rejects.toThrow();
  });

  it('should throw when already verified', async () => {
    const c = buildContact();
    c.verify();
    contactRepo.findById.mockResolvedValue(c);
    await expect(
      handler.execute(new VerifyContactCommand('user-1', 'c-1', '123456'))
    ).rejects.toThrow();
  });
});
