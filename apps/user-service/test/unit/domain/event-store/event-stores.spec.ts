/**
 * Event Stores — combined Unit Test
 */
import { UserEventStore } from '@domain/event-store/user.event-store';
import { UserProfileEventStore } from '@domain/event-store/user-profile.event-store';
import { UserPreferencesEventStore } from '@domain/event-store/user-preferences.event-store';
import { UserKycEventStore } from '@domain/event-store/user-kyc.event-store';

describe('Event Stores', () => {
  const buildEvent = (aggregateId: string, version: number) => ({
    id: `${aggregateId}:${version}`,
    type: 'test.event',
    aggregateId,
    aggregateType: 'Test',
    payload: {},
    occurredAt: { epochMs: Date.now(), timezone: 'UTC' } as never,
    version,
  });

  describe('UserEventStore', () => {
    let store: UserEventStore;
    beforeEach(() => { store = new UserEventStore(); });

    it('append + loadStream', async () => {
      await store.append(buildEvent('agg-1', 1));
      const stream = await store.loadStream('agg-1');
      expect(stream.length).toBe(1);
    });

    it('appendBatch', async () => {
      await store.appendBatch([buildEvent('agg-1', 1), buildEvent('agg-1', 2)]);
      const stream = await store.loadStream('agg-1');
      expect(stream.length).toBe(2);
    });

    it('getVersion returns max version', async () => {
      await store.append(buildEvent('agg-1', 1));
      await store.append(buildEvent('agg-1', 5));
      expect(await store.getVersion('agg-1')).toBe(5);
    });

    it('getVersion returns 0 for unknown', async () => {
      expect(await store.getVersion('missing')).toBe(0);
    });

    it('exists true after append', async () => {
      await store.append(buildEvent('agg-1', 1));
      expect(await store.exists('agg-1')).toBe(true);
    });

    it('exists false for unknown', async () => {
      expect(await store.exists('missing')).toBe(false);
    });

    it('loadStream from version', async () => {
      await store.append(buildEvent('agg-1', 1));
      await store.append(buildEvent('agg-1', 3));
      const stream = await store.loadStream('agg-1', 2);
      expect(stream.length).toBe(1);
      expect(stream[0].event.version).toBe(3);
    });

    it('clear removes stream', async () => {
      await store.append(buildEvent('agg-1', 1));
      await store.clear('agg-1');
      expect(await store.exists('agg-1')).toBe(false);
    });
  });

  describe('UserProfileEventStore', () => {
    let store: UserProfileEventStore;
    beforeEach(() => { store = new UserProfileEventStore(); });

    it('append + getVersion', async () => {
      await store.append(buildEvent('p-1', 2));
      expect(await store.getVersion('p-1')).toBe(2);
    });

    it('loadStream works', async () => {
      await store.append(buildEvent('p-1', 1));
      expect((await store.loadStream('p-1')).length).toBe(1);
    });
  });

  describe('UserPreferencesEventStore', () => {
    let store: UserPreferencesEventStore;
    beforeEach(() => { store = new UserPreferencesEventStore(); });

    it('appendBatch + loadStream', async () => {
      await store.appendBatch([buildEvent('pref-1', 1)]);
      expect((await store.loadStream('pref-1')).length).toBe(1);
    });

    it('exists / clear', async () => {
      await store.append(buildEvent('pref-1', 1));
      await store.clear('pref-1');
      expect(await store.exists('pref-1')).toBe(false);
    });
  });

  describe('UserKycEventStore', () => {
    let store: UserKycEventStore;
    beforeEach(() => { store = new UserKycEventStore(); });

    it('append + getVersion', async () => {
      await store.append(buildEvent('kyc-1', 3));
      expect(await store.getVersion('kyc-1')).toBe(3);
    });

    it('loadStream with fromVersion', async () => {
      await store.append(buildEvent('kyc-1', 1));
      await store.append(buildEvent('kyc-1', 3));
      expect((await store.loadStream('kyc-1', 2)).length).toBe(1);
    });
  });
});
