/**
 * MFA fixtures
 * @module identity-service/test/fixtures
 */
import { MfaEntity } from '@domain/entities/mfa.entity.js';
import { MfaIdVO } from '@domain/value-objects/primitives/mfa-id.vo.js';
import { MfaMethodVO } from '@domain/value-objects/primitives/mfa-method.vo.js';
import { MfaSecretVO } from '@domain/value-objects/primitives/mfa-secret.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { BackupCodeEntity } from '@domain/entities/backup-code.entity.js';
import { BackupCodeVO } from '@domain/value-objects/primitives/backup-code.vo.js';

import { TEST_IDS, TEST_MFA_SECRET, TEST_BACKUP_CODE } from './ids.fixture.js';
import { TEST_DATES } from './dates.fixture.js';

export interface MakeMfaOptions {
  readonly id?: string;
  readonly authId?: string;
  readonly method?: string;
  readonly secret?: string;
  readonly verified?: boolean;
  readonly enabled?: boolean;
  readonly failedAttempts?: number;
  readonly enabledAt?: string;
  readonly verifiedAt?: string;
}

export const makeMfaEntity = (options: MakeMfaOptions = {}): MfaEntity => {
  const now = options.verifiedAt ?? TEST_DATES.NOW;
  return MfaEntity.reconstitute({
    id: options.id ?? TEST_IDS.MFA_ID,
    createdAt: now,
    updatedAt: now,
    props: {
      authId: AuthIdVO.create(options.authId ?? TEST_IDS.AUTH_ID),
      method: MfaMethodVO.reconstitute(options.method ?? 'totp'),
      secret: MfaSecretVO.create(options.secret ?? TEST_MFA_SECRET),
      verified: options.verified ?? false,
      enabled: options.enabled ?? false,
      enabledAt: options.enabledAt,
      verifiedAt: options.verifiedAt,
      failedAttempts: options.failedAttempts ?? 0,
    },
  });
};

export const unverifiedMfa = (): MfaEntity =>
  makeMfaEntity({ verified: false, enabled: false });

export const verifiedMfa = (): MfaEntity =>
  makeMfaEntity({
    verified: true,
    enabled: false,
    verifiedAt: TEST_DATES.NOW,
  });

export const enabledMfa = (): MfaEntity =>
  makeMfaEntity({
    verified: true,
    enabled: true,
    verifiedAt: TEST_DATES.NOW,
    enabledAt: TEST_DATES.NOW,
  });

export const createNewMfa = (options: MakeMfaOptions = {}): MfaEntity => {
  const now = TEST_DATES.NOW;
  return MfaEntity.create({
    id: MfaIdVO.create(options.id ?? TEST_IDS.MFA_ID),
    authId: AuthIdVO.create(options.authId ?? TEST_IDS.AUTH_ID),
    method: MfaMethodVO.reconstitute(options.method ?? 'totp'),
    secret: MfaSecretVO.create(options.secret ?? TEST_MFA_SECRET),
    now,
  });
};

// ─── Backup Code fixtures ──────────────────
export const makeBackupCodeEntity = (
  code: string = TEST_BACKUP_CODE,
  used = false,
): BackupCodeEntity => {
  return BackupCodeEntity.reconstitute({
    id: TEST_IDS.BACKUP_CODE_ID,
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
    props: {
      authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
      code: BackupCodeVO.create(code),
      used,
      usedAt: used ? TEST_DATES.NOW : undefined,
    },
  });
};

export const unusedBackupCode = (): BackupCodeEntity => makeBackupCodeEntity('ABCD1234EF', false);
export const usedBackupCode = (): BackupCodeEntity => makeBackupCodeEntity('XYZ9876WXY', true);

export const createNewBackupCode = (code: string): BackupCodeEntity => {
  return BackupCodeEntity.create({
    id: `${TEST_IDS.BACKUP_CODE_ID.slice(0, -2)}${Math.floor(Math.random() * 100)}`,
    authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
    code: BackupCodeVO.create(code),
    now: TEST_DATES.NOW,
  });
};
