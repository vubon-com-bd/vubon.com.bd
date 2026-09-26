/**
 * RefreshTokenHandler — Unit Tests
 */
import { RefreshTokenHandler } from './refresh-token.handler';
import { RefreshTokenCommand } from './refresh-token.command';

const mockTokenService = () => ({
  name: 'AuthTokenService',
  refresh: jest.fn(),
});

describe('RefreshTokenHandler', () => {
  let handler: RefreshTokenHandler;
  let tokenService: ReturnType<typeof mockTokenService>;

  beforeEach(() => {
    tokenService = mockTokenService();
    handler = new RefreshTokenHandler(tokenService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('RefreshTokenCommand');
  });

  it('should call tokenService.refresh', async () => {
    const mockResult = { accessToken: 'new', refreshToken: 'new-refresh' };
    tokenService.refresh.mockResolvedValue(mockResult);

    const command = new RefreshTokenCommand({
      refreshToken: 'old-token',
    } as never);

    const result = await handler.execute(command);

    expect(tokenService.refresh).toHaveBeenCalledWith('old-token');
    expect(result).toEqual(mockResult);
  });

  it('should propagate errors', async () => {
    tokenService.refresh.mockRejectedValue(new Error('Invalid'));
    await expect(
      handler.execute(new RefreshTokenCommand({ refreshToken: 'bad' } as never)),
    ).rejects.toThrow('Invalid');
  });
});
