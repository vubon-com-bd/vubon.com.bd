import { describe, it, expect } from '@jest/globals';
import { PasswordHasherService } from '@application/services/impl/password-hasher.service.js';

describe('PasswordHasherService', () => {
  it('name', () => expect(new PasswordHasherService().name).toBe('PasswordHasherService'));
  it('hash() should throw (must be implemented in infrastructure)', async () => {
    await expect(new PasswordHasherService().hash('x')).rejects.toThrow();
  });
  it('verify() should throw (must be implemented in infrastructure)', async () => {
    await expect(new PasswordHasherService().verify('x', 'y')).rejects.toThrow();
  });
});
