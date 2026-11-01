import { describe, it, expect, beforeEach } from '@jest/globals';
import { Auth2FaService } from '@application/services/impl/auth-2fa.service.js';
import { makeAuth2FaRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('Auth2FaService', () => {
  let service: Auth2FaService;
  let repo: ReturnType<typeof makeAuth2FaRepositoryMock>;

  beforeEach(() => {
    repo = makeAuth2FaRepositoryMock();
    service = new Auth2FaService(repo as never);
  });

  it('name', () => expect(service.name).toBe('Auth2FaService'));

  it('setup() should return secret + qr', async () => {
    const result = await service.setup(TEST_IDS.AUTH_ID, 'totp');
    expect(result.secret).toBeDefined();
    expect(result.qrCodeUrl).toBeDefined();
  });

  it('getConfig() should delegate to repo', async () => {
    repo.findByAuthIdRaw.mockResolvedValue(null);
    expect(await service.getConfig(TEST_IDS.AUTH_ID)).toBeNull();
  });
});
