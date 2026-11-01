/**
 * Null-entity branches — `if (!entity) return null` true side.
 */
import { jest } from '@jest/globals';
import { DigestService } from '@application/services/impl/digest.service.js';
import { createMockDigestRepo, createMockEventBridge } from '@application-fixtures/mock-repos.fixture.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const BRIDGE = () => createMockEventBridge() as never;

describe('Null-entity branch — digest.service:115', () => {
  it('getLatestForUser — repo returns null → return null', async () => {
    const repo = createMockDigestRepo();
    repo.findLatestForUser.mockResolvedValue(null);
    const svc = new DigestService(repo as never, BRIDGE());
    const r = await svc.getLatestForUser(IDS.userId);
    expect(r).toBeNull();
  });

  it('getLatestForUser — repo returns entity → return DTO', async () => {
    const repo = createMockDigestRepo();
    repo.findLatestForUser.mockResolvedValue({
      id: IDS.digestId,
      vo: { userId: { value: IDS.userId }, period: { frequency: 'daily' }, type: { value: 'summary' }, status: { value: 'sent' }, categories: [], sendHour: 9, timezone: 'UTC', generatedAt: null, sentAt: null },
      itemCount: 1, items: [], createdAt: '2025-01-01T00:00:00Z',
    });
    const svc = new DigestService(repo as never, BRIDGE());
    const r = await svc.getLatestForUser(IDS.userId);
    expect(r).not.toBeNull();
  });
});
