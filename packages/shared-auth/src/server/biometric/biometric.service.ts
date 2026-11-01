import type { BiometricServiceContract, RegisteredCredential } from './biometric.service.interface';

/**
 * Server-side biometric (WebAuthn) service.
 * In-memory registry — back with persistent DB in production.
 */
export class BiometricService implements BiometricServiceContract {
  private readonly store = new Map<string, RegisteredCredential>();

  private key(userId: string, credentialId: string): string {
    return `${userId}::${credentialId}`;
  }

  async register(input: {
    userId: string;
    credentialId: string;
    publicKey: string;
    algorithm: 'ES256' | 'RS256';
  }): Promise<RegisteredCredential> {
    const rec: RegisteredCredential = {
      credentialId: input.credentialId,
      userId: input.userId,
      publicKey: input.publicKey,
      algorithm: input.algorithm,
      signCount: 0,
      registeredAt: new Date().toISOString(),
    };
    this.store.set(this.key(input.userId, input.credentialId), rec);
    return rec;
  }

  async get(userId: string, credentialId: string): Promise<RegisteredCredential | null> {
    return this.store.get(this.key(userId, credentialId)) ?? null;
  }

  async verify(input: {
    userId: string;
    credentialId: string;
    challenge: string;
    signature: string;
  }): Promise<boolean> {
    const rec = await this.get(input.userId, input.credentialId);
    if (!rec) return false;
    // TODO: verify signature with rec.publicKey against challenge.
    // Stub returns true if signature is non-empty.
    return input.signature.length > 0;
  }
}

export const biometricService = new BiometricService();
