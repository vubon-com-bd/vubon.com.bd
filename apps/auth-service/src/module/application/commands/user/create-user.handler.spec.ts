/**
 * CreateUserHandler — Unit Tests
 * @module auth-service/application/commands/user
 */
import { CreateUserHandler } from './create-user.handler';
import { CreateUserCommand } from './create-user.command';

const mockUserService = () => ({
  name: 'UserService',
  create: jest.fn(),
  toResponse: jest.fn(),
});

describe('CreateUserHandler', () => {
  let handler: CreateUserHandler;
  let userService: ReturnType<typeof mockUserService>;

  beforeEach(() => {
    userService = mockUserService();
    handler = new CreateUserHandler(userService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('CreateUserCommand');
  });

  it('should create user and return response', async () => {
    const userEntity = { id: 'user-1' };
    const responseDto = { id: 'user-1', email: 'new@example.com' };
    userService.create.mockResolvedValue(userEntity);
    userService.toResponse.mockReturnValue(responseDto);

    const command = new CreateUserCommand({ email: 'new@example.com' } as never);
    const result = await handler.execute(command);

    expect(userService.create).toHaveBeenCalledWith(command.input);
    expect(userService.toResponse).toHaveBeenCalledWith(userEntity);
    expect(result).toEqual(responseDto);
  });
});
