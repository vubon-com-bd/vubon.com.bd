import { describe, it, expect, beforeEach } from '@jest/globals';
import { RefreshTokenHandler } from '@application/commands/auth/refresh-token.handler.js';
import { RefreshTokenCommand } from '@application/commands/auth/refresh-token.command.js';
import { makeAuthTokenServiceMock, TEST_REFRESH_TOKEN } from '@fixtures/index.js';

describe('RefreshTokenHandler', () => {
  let handler: RefreshTokenHandler;
  let tokenService: ReturnType<typeof makeAuthTokenServiceMock>;

  beforeEach(() => {
    tokenService = makeAuthTokenServiceMock();
    tokenService.issue.mockResolvedValue({
      accessToken: 'a', refreshToken: 'r', tokenType: 'Bearer', expiresIn: 900, expiresAt: 0,
    } as never);
    handler = new RefreshTokenHandler(tokenService as never);
  });

  it('commandType = auth.refresh-token', () => {
    expect(handler.commandType).toBe('auth.refresh-token');
  });

  it('should return new tokens', async () => {
    const cmd = new RefreshTokenCommand({ refreshToken: TEST_REFRESH_TOKEN } as never);
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
    expect(result.tokens).toBeDefined();
  });
});
