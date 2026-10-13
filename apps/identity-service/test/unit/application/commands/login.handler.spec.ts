/**
 * LoginHandler — Unit Tests
 */
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginHandler } from '../../../../src/module/application/commands/auth/login.handler.js';
import { LoginCommand } from '../../../../src/module/application/commands/auth/login.command.js';
import { AUTH_REPOSITORY } from '../../../../src/module/domain/repositories/auth.repository.interface.js';
import { AUTH_SESSION_SERVICE } from '../../../../src/module/application/services/interfaces/auth-session.service.interface.js';
import { AUTH_TOKEN_SERVICE } from '../../../../src/module/application/services/interfaces/auth-token.service.interface.js';
import { AUTH_MFA_SERVICE } from '../../../../src/module/application/services/interfaces/auth-mfa.service.interface.js';

describe('LoginHandler', () => {
  let handler: LoginHandler;
  let authRepo: { findByIdentifier: jest.Mock; save: jest.Mock };
  let sessionService: { create: jest.Mock };
  let tokenService: { issue: jest.Mock };
  let mfaService: { challenge: jest.Mock };

  beforeEach(async () => {
    authRepo = {
      findByIdentifier: jest.fn(),
      save: jest.fn(),
    };
    sessionService = { create: jest.fn() };
    tokenService = { issue: jest.fn() };
    mfaService = { challenge: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginHandler,
        { provide: AUTH_REPOSITORY, useValue: authRepo },
        { provide: AUTH_SESSION_SERVICE, useValue: sessionService },
        { provide: AUTH_TOKEN_SERVICE, useValue: tokenService },
        { provide: AUTH_MFA_SERVICE, useValue: mfaService },
      ],
    }).compile();

    handler = module.get(LoginHandler);
  });

  it('throws when auth not found', async () => {
    authRepo.findByIdentifier.mockResolvedValue(null as never);

    const command = new LoginCommand({
      identifier: 'user@example.com',
      password: 'Password123!',
    } as never);

    await expect(handler.execute(command)).rejects.toThrow();
  });

  it('creates session and tokens on valid login', async () => {
    authRepo.findByIdentifier.mockResolvedValue({
      id: 'auth-1',
      userId: { value: 'user-1' },
      identifier: { normalized: 'user@example.com' },
      isEmailVerified: true,
      isPhoneVerified: false,
      isMfaEnabled: false,
      createdAt: '2026-01-01T00:00:00Z',
      recordLogin: jest.fn(),
    } as never);

    sessionService.create.mockResolvedValue({
      id: 'sess-1',
      userId: 'user-1',
      status: 'active',
      createdAt: '2026-01-01T00:00:00Z',
      lastAccessedAt: '2026-01-01T00:00:00Z',
      expiresAt: '2026-01-02T00:00:00Z',
      isCurrent: true,
    } as never);

    tokenService.issue.mockResolvedValue({
      accessToken: 'access',
      refreshToken: 'refresh',
      tokenType: 'Bearer',
      expiresIn: 900,
      expiresAt: 1700000000,
    } as never);

    const command = new LoginCommand({
      identifier: 'user@example.com',
      password: 'Password123!',
    } as never);

    const result = await handler.execute(command);
    expect(result.success).toBe(true);
    expect(sessionService.create).toHaveBeenCalledWith('user-1', expect.any(Object));
    expect(tokenService.issue).toHaveBeenCalled();
  });
});
