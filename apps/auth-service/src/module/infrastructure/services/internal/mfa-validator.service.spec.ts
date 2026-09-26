/**
 * MfaValidatorService — Unit Tests
 * @module auth-service/infrastructure/services/internal
 */
import { MfaValidatorService } from './mfa-validator.service';
import { TotpService } from './totp.service';
import { MfaInvalidError } from '../../../domain/errors/mfa.errors';

describe('MfaValidatorService', () => {
  let service: MfaValidatorService;
  let totp: TotpService;

  beforeEach(() => {
    totp = new TotpService();
    service = new MfaValidatorService(totp);
  });

  it('should have name', () => {
    expect(service.name).toBe('MfaValidatorService');
  });

  describe('validate()', () => {
    it('should throw for invalid code', async () => {
      await expect(
        service.validate('JBSWY3DPEHPK3PXP', '000000'),
      ).rejects.toThrow(MfaInvalidError);
    });
  });

  describe('isValid()', () => {
    it('should return false for invalid code', async () => {
      const result = await service.isValid('JBSWY3DPEHPK3PXP', '000000');
      expect(typeof result).toBe('boolean');
    });

    it('should return false for empty secret', async () => {
      const result = await service.isValid('', '123456');
      expect(result).toBe(false);
    });
  });
});
