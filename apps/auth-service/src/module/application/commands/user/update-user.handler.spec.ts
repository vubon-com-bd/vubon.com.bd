/**
 * UpdateUserHandler — Unit Tests
 */
import { UpdateUserHandler } from './update-user.handler';
import { UpdateUserCommand } from './update-user.command';

const mockUserService = () => ({
  update: jest.fn(),
  toResponse: jest.fn(),
});

describe('UpdateUserHandler', () => {
  let handler: UpdateUserHandler;
  let userService: ReturnType<typeof mockUserService>;

  beforeEach(() => {
    userService = mockUserService();
    handler = new UpdateUserHandler(userService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('UpdateUserCommand');
  });

  it('should delegate to service', async () => {
    const entity = { id: 'user-1' };
    const dto = { id: 'user-1', name: 'New Name' };
    userService.update.mockResolvedValue(entity);
    userService.toResponse.mockReturnValue(dto);

    const command = new UpdateUserCommand('user-1' as never, { name: 'New Name' } as never);
    const result = await handler.execute(command);

    expect(userService.update).toHaveBeenCalledWith('user-1', command.input);
    expect(result).toEqual(dto);
  });
});
