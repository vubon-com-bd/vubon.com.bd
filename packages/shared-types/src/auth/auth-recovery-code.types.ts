export interface AuthRecoveryCode {
  codeId: string;
  userId: string;
  code: string;
  isUsed: boolean;
  usedAt?: Date;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}
