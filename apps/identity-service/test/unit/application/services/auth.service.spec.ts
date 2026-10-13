/**
 * AuthService — Unit Tests
 */
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../../src/module/application/services/impl/auth.service.js';
import { AUTH_REPOSITORY } from '../../../../src/module/domain/repositories/auth.repository.interface.js';
import { AUTH_SESSION_SERVICE } from '../../../../src/module/application/services/interfaces/auth-session.service.interface.js';
import { AUTH_TOKEN_SERVICE } from '../../../../src/module/application/services/interfaces/auth-token.service.interface.js';
import { AUTH_MFA_SERVICE } from '../../../../src/module/application/services/interfaces/auth-mfa.service.interface.js';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AUTH_REPOSITORY,
          useValue: { findByIdentifier: jest.fn(), save: jest.fn() },
        },
        { provide: AUTH_SESSION_SERVICE, useValue: { create: jest.fn() } },
        { provide: AUTH_TOKEN_SERVICE, useValue: { issue: jest.fn() } },
        { provide: AUTH_MFA_SERVICE, useValue: { challenge: jest.fn() } },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('has correct name', () => {
    expect(service.name).toBe('AuthService');
  });
});
