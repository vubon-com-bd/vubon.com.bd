/**
 * DeviceFingerprintService — Unit Tests
 * @module auth-service/infrastructure/services/internal
 */
import { DeviceFingerprintService } from './device-fingerprint.service';

describe('DeviceFingerprintService', () => {
  let service: DeviceFingerprintService;

  beforeEach(() => {
    service = new DeviceFingerprintService();
  });

  it('should have name', () => {
    expect(service.name).toBe('DeviceFingerprintService');
  });

  describe('fingerprint()', () => {
    it('should produce 64-char hex string', () => {
      const fp = service.fingerprint({
        userAgent: 'Mozilla/5.0',
        ip: '192.168.1.1',
      });
      expect(fp).toMatch(/^[a-f0-9]{64}$/);
    });

    it('should be deterministic for same inputs', () => {
      const input = { userAgent: 'Mozilla/5.0', ip: '1.1.1.1' };
      const fp1 = service.fingerprint(input);
      const fp2 = service.fingerprint(input);
      expect(fp1).toBe(fp2);
    });

    it('should produce different hash for different inputs', () => {
      const fp1 = service.fingerprint({ userAgent: 'A', ip: '1.1.1.1' });
      const fp2 = service.fingerprint({ userAgent: 'B', ip: '1.1.1.1' });
      expect(fp1).not.toBe(fp2);
    });

    it('should include optional headers in hash', () => {
      const base = { userAgent: 'Mozilla', ip: '1.1.1.1' };
      const withHeaders = {
        ...base,
        acceptLanguage: 'en-US',
        acceptEncoding: 'gzip',
      };
      expect(service.fingerprint(base)).not.toBe(service.fingerprint(withHeaders));
    });
  });
});
