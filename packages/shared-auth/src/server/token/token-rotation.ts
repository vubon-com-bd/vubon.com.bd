export interface RotationRecord {
  readonly familyId: string;
  readonly currentJti: string;
  readonly usedJtis: readonly string[];
  readonly userId: string;
  readonly createdAt: number;
}

export interface RotationStore {
  get(familyId: string): Promise<RotationRecord | null>;
  set(record: RotationRecord): Promise<void>;
  revoke(familyId: string): Promise<void>;
}

export class InMemoryRotationStore implements RotationStore {
  private readonly map = new Map<string, RotationRecord>();

  async get(familyId: string): Promise<RotationRecord | null> {
    return this.map.get(familyId) ?? null;
  }
  async set(record: RotationRecord): Promise<void> {
    this.map.set(record.familyId, record);
  }
  async revoke(familyId: string): Promise<void> {
    this.map.delete(familyId);
  }
}

/**
 * Detect refresh-token reuse.
 * If a previously-used jti comes back, the whole family is compromised
 * and MUST be revoked (all sessions for that family).
 */
export class TokenRotationTracker {
  constructor(private readonly store: RotationStore = new InMemoryRotationStore()) {}

  async onRotate(input: {
    familyId: string;
    userId: string;
    newJti: string;
    oldJti?: string;
  }): Promise<{ readonly reuseDetected: boolean }> {
    const existing = await this.store.get(input.familyId);
    if (existing && input.oldJti && existing.usedJtis.includes(input.oldJti)) {
      await this.store.revoke(input.familyId);
      return { reuseDetected: true };
    }
    const usedJtis = existing
      ? [...existing.usedJtis, input.oldJti].filter((j): j is string => Boolean(j))
      : [];
    await this.store.set({
      familyId: input.familyId,
      currentJti: input.newJti,
      usedJtis,
      userId: input.userId,
      createdAt: existing?.createdAt ?? Date.now(),
    });
    return { reuseDetected: false };
  }
}

export const tokenRotationTracker = new TokenRotationTracker();
