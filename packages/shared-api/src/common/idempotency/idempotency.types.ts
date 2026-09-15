export interface IdempotencyRecord {
  readonly key: string;
  readonly createdAt: number;
  readonly expiresAt: number;
}
