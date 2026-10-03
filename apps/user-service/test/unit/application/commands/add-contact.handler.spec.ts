import { AddContactHandler } from '@application/commands/contact/add-contact.handler';
import { AddContactCommand } from '@application/commands/contact/add-contact.command';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { createUserRepositoryMock, createUserContactRepositoryMock } from '../../../helpers/user-repository.mock';

describe('AddContactHandler', () => {
  let handler: AddContactHandler;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;
  let contactRepo: ReturnType<typeof createUserContactRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    contactRepo = createUserContactRepositoryMock();
    handler = new AddContactHandler(contactRepo as never, userRepo as never);
  });

  it('should add email contact', async () => {
    const user = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    userRepo.findById.mockResolvedValue(user);
    contactRepo.countByUserId.mockResolvedValue(0);

    const result = await handler.execute(
      new AddContactCommand({
        userId: 'user-1',
        type: 'email',
        value: 'new@example.com',
      })
    );
    expect(result.userId).toBe('user-1');
    expect(contactRepo.save).toHaveBeenCalled();
  });

  it('should throw when user not found', async () => {
    userRepo.findById.mockResolvedValue(null);
    await expect(
      handler.execute(
        new AddContactCommand({ userId: 'missing', type: 'email', value: 'a@b.com' })
      )
    ).rejects.toThrow();
  });

  it('should throw when limit reached', async () => {
    const user = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    userRepo.findById.mockResolvedValue(user);
    contactRepo.countByUserId.mockResolvedValue(10);

    await expect(
      handler.execute(
        new AddContactCommand({ userId: 'user-1', type: 'email', value: 'a@b.com' })
      )
    ).rejects.toThrow();
  });
});
