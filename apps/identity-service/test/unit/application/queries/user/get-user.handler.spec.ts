/**
 * GetUserHandler unit tests
 * @module identity-service/test/unit/application/queries/user
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetUserHandler } from '@application/queries/user/get-user.handler.js';
import { makeGetUserQuery } from '@fixtures/index';
import { makeUserServiceMock } from '@fixtures/index';
import { TEST_IDS, TEST_EMAIL } from '@fixtures/index';
import { UserNotFoundError } from '@domain/errors/user.errors.js';

describe('GetUserHandler', () => {
  let handler: GetUserHandler;
  let userService: ReturnType<typeof makeUserServiceMock>;

  beforeEach(() => {
    userService = makeUserServiceMock();
    handler = new GetUserHandler(userService as never);
  });

  describe('queryType', () => {
    it('should have correct queryType', () => {
      expect(handler.queryType).toBe('user.get');
    });
  });

  describe('execute() — found', () => {
    it('should return user DTO when found', async () => {
      const userDTO = {
        id: TEST_IDS.USER_ID,
        email: TEST_EMAIL,
        status: 'active',
        type: 'individual',
        roles: ['customer'],
        emailVerified: true,
        phoneVerified: false,
        isMfaEnabled: false,
        createdAt: new Date().toISOString(),
      };
      userService.findById.mockResolvedValue(userDTO as never);

      const result = await handler.execute(makeGetUserQuery());

      expect(result).toEqual(userDTO);
      expect(userService.findById).toHaveBeenCalledWith(TEST_IDS.USER_ID);
      expect(userService.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('execute() — not found', () => {
    it('should throw UserNotFoundError when null', async () => {
      userService.findById.mockResolvedValue(null);

      await expect(handler.execute(makeGetUserQuery())).rejects.toThrow(
        UserNotFoundError,
      );
    });

    it('should include userId in error', async () => {
      userService.findById.mockResolvedValue(null);

      try {
        await handler.execute(makeGetUserQuery());
      } catch (err) {
        expect(err).toBeInstanceOf(UserNotFoundError);
        expect((err as Error).message).toContain(TEST_IDS.USER_ID);
      }
    });
  });
});
