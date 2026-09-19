/**
 * Session Token Generator Port
 * Application-layer contract for opaque session token generation.
 * Implementation lives in infrastructure layer (crypto).
 */
export interface SessionTokenGeneratorPort {
  generate(): string;
  hash(token: string): string;
}
