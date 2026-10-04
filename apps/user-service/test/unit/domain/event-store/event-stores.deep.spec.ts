/**
 * Event Stores — deep coverage (all paths)
 */
import { UserEventStore } from '@domain/event-store/user.event-store';
import { UserProfileEventStore } from '@domain/event-store/user-profile.event-store';
import { UserPreferencesEventStore } from '@domain/event-store/user-preferences.event-store';
import { UserKycEventStore } from '@domain/event-store/user-kyc.event-store';

describe('Event Stores — deep coverage', () => {
  const ev = (aggId: string, version: number) => ({
    id: `e-${version}`,
    type: 'test.event',
    aggregateId: aggId,
    aggregateType: 'Test',
    payload: { data: 'x' },
    occurredAt: { epochMs: Date.now(), timezone: 'UTC' } as never,
    version,
  });

  describe('UserEventStore', () => {
    let store: UserEventStore;
    beforeEach(() => { store = new UserEventStore(); });

    it('loadStream returns envelope with publishedAt + retryCount', async () => {
      await store.append(ev('a-1', 1));
      const stream = await store.loadStream('a-1');
      expect(stream[0].retryCount).toBe(0);
      expect(stream[0].publishedAt).toBeDefined();
    });

    it('getVersion empty → 0', async () => {
      expect(await store.getVersion('empty')).toBe(0);
    });

    it('getVersion single event', async () => {
      await store.append(ev('a-1', 7));
      expect(await store.getVersion('a-1')).toBe(7);
    });

    it('loadStream fromVersion=0 returns all', async () => {
      await store.append(ev('a-1', 1));
      await store.append(ev('a-1', 2));
      const stream = await store.loadStream('a-1', 0);
      expect(stream.length).toBe(2);
    });

    it('loadStream returns a copy (not original array)', async () => {
      await store.append(ev('a-1', 1));
      const s1 = await store.loadStream('a-1');
      const s2 = await store.loadStream('a-1');
      expect(s1).not.toBe(s2);
    });
  });

  describe('UserProfileEventStore', () => {
    let store: UserProfileEventStore;
    beforeEach(() => { store = new UserProfileEventStore(); });

    it('append + getVersion + exists', async () => {
      await store.append(ev('p-1', 1));
      expect(await store.getVersion('p-1')).toBe(1);
      expect(await store.exists('p-1')).toBe(true);
    });

    it('appendBatch processes each event', async () => {
      await store.appendBatch([ev('p-1', 1), ev('p-1', 2)]);
      expect(await store.getVersion('p-1')).toBe(2);
    });

    it('loadStream fromVersion filters', async () => {
      await store.append(ev('p-1', 1));
      await store.append(ev('p-1', 5));
      await store.append(ev('p-1', 10));
      expect((await store.loadStream('p-1', 5)).length).toBe(2);
    });

    it('clear removes stream', async () => {
      await store.append(ev('p-1', 1));
      await store.clear('p-1');
      expect(await store.exists('p-1')).toBe(false);
    });
  });

  describe('UserPreferencesEventStore', () => {
    let store: UserPreferencesEventStore;
    beforeEach(() => { store = new UserPreferencesEventStore(); });

    it('append + getVersion', async () => {
      await store.append(ev('pref-1', 3));
      expect(await store.getVersion('pref-1')).toBe(3);
    });

    it('getVersion missing → 0', async () => {
      expect(await store.getVersion('missing')).toBe(0);
    });

    it('exists false initially', async () => {
      expect(await store.exists('pref-1')).toBe(false);
    });

    it('loadStream no events', async () => {
      expect((await store.loadStream('empty')).length).toBe(0);
    });
  });

  describe('UserKycEventStore', () => {
    let store: UserKycEventStore;
    beforeEach(() => { store = new UserKycEventStore(); });

    it('full lifecycle', async () => {
      await store.append(ev('k-1', 1));
      await store.appendBatch([ev('k-1', 2), ev('k-1', 3)]);
      expect(await store.getVersion('k-1')).toBe(3);
      const stream = await store.loadStream('k-1');
      expect(stream.length).toBe(3);
      await store.clear('k-1');
      expect(await store.exists('k-1')).toBe(false);
    });

    it('loadStream fromVersion 2', async () => {
      await store.append(ev('k-1', 1));
      await store.append(ev('k-1', 2));
      await store.append(ev('k-1', 3));
      expect((await store.loadStream('k-1', 2)).length).toBe(2);
    });
  });
});
