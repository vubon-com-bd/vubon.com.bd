/**
 * PasswordHasherService — Unit Tests (with mock HashService)
 */
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { PasswordHasherService } from '../../../../src/module/infrastructure/services/internal/password-hasher.service.js';

describe('PasswordHasherService', () => {
  let service: PasswordHasherService;
  let mockHasher: { hash: jest.Mock; compare: jest.Mock };

  beforeEach(() => {
    mockHasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };
    service = new PasswordHasherService(mockHasher as never);
  });

  it('has correct name', () => {
    expect(service.name).toBe('PasswordHasherService');
  });

  it('delegates hash to HashService', async () => {
    mockHasher.hash.mockResolvedValue('$2b$12$hashedvalue' as never);
    const result = await service.hash('PlainPass123!');
    expect(result).toBe('$2b$12$hashedvalue');
    expect(mockHasher.hash).toHaveBeenCalledWith('PlainPass123!');
  });

  it('delegates verify to HashService', async () => {
    mockHasher.compare.mockResolvedValue(true as never);
    const result = await service.verify('PlainPass123!', '$2b$12$hashedvalue');
    expect(result).toBe(true);
    expect(mockHasher.compare).toHaveBeenCalledWith('PlainPass123!', '$2b$12$hashedvalue');
  });

  it('returns false on verify error', async () => {
    mockHasher.compare.mockRejectedValue(new Error('compare failed') as never);
    const result = await service.verify('plain', 'hash');
    expect(result).toBe(false);
  });
});
