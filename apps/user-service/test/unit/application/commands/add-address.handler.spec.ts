import { AddAddressHandler } from '@application/commands/address/add-address.handler';
import { AddAddressCommand } from '@application/commands/address/add-address.command';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { createUserRepositoryMock, createUserAddressRepositoryMock } from '../../../helpers/user-repository.mock';

describe('AddAddressHandler', () => {
  let handler: AddAddressHandler;
  let userRepo: ReturnType<typeof createUserRepositoryMock>;
  let addrRepo: ReturnType<typeof createUserAddressRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    userRepo = createUserRepositoryMock();
    addrRepo = createUserAddressRepositoryMock();
    handler = new AddAddressHandler(addrRepo as never, userRepo as never);
  });

  it('should add address when below limit', async () => {
    const user = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    user.activate(now);
    userRepo.findById.mockResolvedValue(user);
    addrRepo.countByUserId.mockResolvedValue(0);

    const result = await handler.execute(
      new AddAddressCommand({
        userId: 'user-1',
        type: 'home',
        line1: '123 Main Street',
        city: 'Dhaka',
        state: 'dhaka',
        postalCode: '1200',
        country: 'BD',
      })
    );
    expect(result.userId).toBe('user-1');
    expect(addrRepo.save).toHaveBeenCalled();
  });

  it('should throw when user not found', async () => {
    userRepo.findById.mockResolvedValue(null);
    await expect(
      handler.execute(
        new AddAddressCommand({
          userId: 'missing',
          type: 'home',
          line1: '123 Main Street',
          city: 'Dhaka',
          state: 'dhaka',
          postalCode: '1200',
          country: 'BD',
        })
      )
    ).rejects.toThrow();
  });
});
