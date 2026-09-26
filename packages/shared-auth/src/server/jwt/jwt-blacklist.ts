/**
 * In-memory JWT jti blacklist.
 * ⚠️ Back with Redis for multi-instance deployment.
 */
export interface JwtBlacklistStore {
  add(jti: string, expiresAt: number): Promise<void>;
  has(jti: string): Promise<boolean>;
  cleanup(): Promise<void>;
}

export class InMemoryJwtBlacklist implements JwtBlacklistStore {
  private readonly map = new Map<string, number>();

  async add(jti: string, expiresAt: number): Promise<void> {
    this.map.set(jti, expiresAt);
  }

  async has(jti: string): Promise<boolean> {
    const exp = this.map.get(jti);
    if (exp === undefined) return false;
    if (exp <= Math.floor(Date.now() / 1000)) {
      this.map.delete(jti);
      return false;
    }
    return true;
  }

  async cleanup(): Promise<void> {
    const now = Math.floor(Date.now() / 1000);
    for (const [jti, exp] of this.map.entries()) {
      if (exp <= now) this.map.delete(jti);
    }
  }
}

export const jwtBlacklist: JwtBlacklistStore = new InMemoryJwtBlacklist();
