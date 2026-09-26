/**
 * DeleteUserHandler — Unit Tests
 */
import { DeleteUserHandler } from './delete-user.handler';
import { DeleteUserCommand } from './delete-user.command';

const mockUserService = () => ({ delete: jest.fn() });

describe('DeleteUserHandler', () => {
  let handler: DeleteUserHandler;
  let userService: ReturnType<typeof mockUserService>;

  beforeEach(() => {
    userService = mockUserService();
    handler = new DeleteUserHandler(userService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('DeleteUserCommand');
  });

  it('should delegate delete with reason', async () => {
    userService.delete.mockResolvedValue(undefined);
    const command = new DeleteUserCommand('user-1' as never, { reason: 'user_request' } as never);

    await handler.execute(command);

    expect(userService.delete).toHaveBeenCalledWith('user-1', 'user_request');
  });
});
