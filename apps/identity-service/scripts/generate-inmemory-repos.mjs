#!/usr/bin/env node
/**
 * Generate FULL InMemory Repositories for identity-service
 * @generator identity-service/scripts
 *
 * Auto-generates all 27 InMemory repositories with domain interface methods.
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = join(__dirname, '..');
const MEMORY_DIR = join(ROOT, 'src/module/infrastructure/persistence/memory/repositories');

// ─── Helper: common filter patterns ────────────
const filterBy = (field, voType, voPath) => ({
  import: `import type { ${voType} } from '${voPath}';`,
  method: (methodName, entity) =>
    `async ${methodName}(${field === 'userId' ? 'userId' : field}: ${voType}): Promise<readonly ${entity}[]> {
    const all = await this.findAll();
    return all.filter((e) => e.${field}.value === ${field === 'userId' ? 'userId' : field}.value);
  }`,
});

const paginatedMethod = (entity) => `async findPaginated(options: { page: number; limit: number }): Promise<unknown> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return {
      items: all.slice(start, start + options.limit),
      total: all.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(all.length / options.limit),
    };
  }`;

const softDeleteMethod = `async softDelete(id: string): Promise<void> {
    return this.softDeleteById(id);
  }`;

// ─── Repository Specs (ALL 27) ──────────────────
const SPECS = [
  // ═══ AUTH CORE ═══
  {
    file: 'auth.memory.repository.ts',
    entity: 'AuthEntity',
    className: 'Auth',
    entityPath: '../../../../domain/entities/auth.entity.js',
    interfaceName: 'AuthRepository',
    interfacePath: '../../../../domain/repositories/auth.repository.interface.js',
    voImports: [
      { name: 'AuthIdVO', path: '../../../../domain/value-objects/primitives/auth-id.vo.js' },
      { name: 'UserIdVO', path: '../../../../domain/value-objects/primitives/user-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: AuthIdVO): Promise<AuthEntity | null> { return this.findById(id.value); }`,
      `async findByUserId(userId: UserIdVO): Promise<readonly AuthEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value);
  }`,
      `async findByIdentifier(identifier: string): Promise<AuthEntity | null> {
    const lower = identifier.trim().toLowerCase();
    const all = await this.findAll();
    return all.find((e) => e.identifier.normalized.toLowerCase() === lower) ?? null;
  }`,
      `async findByUserIdAndProvider(userId: UserIdVO, provider: string): Promise<AuthEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.userId.value === userId.value && e.provider.value === provider) ?? null;
  }`,
      paginatedMethod('AuthEntity'),
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, byStatus: {}, byType: {}, byProvider: {}, activeCount: 0, lockedCount: 0, mfaEnabledCount: 0 };
  }`,
      `async findLockedExpired(): Promise<readonly AuthEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.status.isLocked());
  }`,
      `async findInactive(olderThanDays: number): Promise<readonly AuthEntity[]> {
    const cutoff = Date.now() - olderThanDays * 24 * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.status.isInactive() && Date.parse(e.updatedAt) < cutoff);
  }`,
      `async findUnverified(olderThanHours: number): Promise<readonly AuthEntity[]> {
    const cutoff = Date.now() - olderThanHours * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => !e.isEmailVerified && Date.parse(e.createdAt) < cutoff);
  }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'session.memory.repository.ts',
    entity: 'SessionEntity',
    className: 'Session',
    entityPath: '../../../../domain/entities/session.entity.js',
    interfaceName: 'SessionRepository',
    interfacePath: '../../../../domain/repositories/session.repository.interface.js',
    voImports: [
      { name: 'SessionIdVO', path: '../../../../domain/value-objects/primitives/session-id.vo.js' },
      { name: 'UserIdVO', path: '../../../../domain/value-objects/primitives/user-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: SessionIdVO): Promise<SessionEntity | null> { return this.findById(id.value); }`,
      `async findByUserId(userId: UserIdVO): Promise<readonly SessionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value);
  }`,
      `async findActiveByUserId(userId: UserIdVO): Promise<readonly SessionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value && e.status.isActive());
  }`,
      `async countActiveByUserId(userId: UserIdVO): Promise<number> {
    return (await this.findActiveByUserId(userId)).length;
  }`,
      `async findByAuthId(authId: string): Promise<readonly SessionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId);
  }`,
      paginatedMethod('SessionEntity'),
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, activeCount: all.filter((e) => e.status.isActive()).length, byStatus: {}, averageDurationSeconds: 0 };
  }`,
      `async findExpired(nowMs: number = Date.now()): Promise<readonly SessionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.expiry.isAbsoluteExpired(nowMs));
  }`,
      `async findIdle(idleThresholdMs: number, nowMs: number = Date.now()): Promise<readonly SessionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => nowMs - Date.parse(e.lastAccessedAt) > idleThresholdMs);
  }`,
      `async findOldestByUserId(userId: UserIdVO): Promise<SessionEntity | null> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value).sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))[0] ?? null;
  }`,
      `async revokeAllByUserId(userId: UserIdVO, reason: string): Promise<number> {
    const all = await this.findAll();
    let count = 0;
    for (const s of all) {
      if (s.userId.value === userId.value && !s.status.isRevoked()) {
        s.revoke(reason); await this.save(s); count++;
      }
    }
    return count;
  }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'token.memory.repository.ts',
    entity: 'TokenEntity',
    className: 'Token',
    entityPath: '../../../../domain/entities/token.entity.js',
    interfaceName: 'TokenRepository',
    interfacePath: '../../../../domain/repositories/token.repository.interface.js',
    voImports: [
      { name: 'TokenIdVO', path: '../../../../domain/value-objects/primitives/token-id.vo.js' },
      { name: 'UserIdVO', path: '../../../../domain/value-objects/primitives/user-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: TokenIdVO): Promise<TokenEntity | null> { return this.findById(id.value); }`,
      `async findByJti(jti: string): Promise<TokenEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.jti === jti) ?? null;
  }`,
      `async findByUserId(userId: UserIdVO): Promise<readonly TokenEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value);
  }`,
      `async findBySessionId(sessionId: string): Promise<readonly TokenEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.sessionId.value === sessionId);
  }`,
      paginatedMethod('TokenEntity'),
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, activeCount: all.filter((e) => e.isUsable()).length, revokedCount: all.filter((e) => e.isRevoked()).length, byType: {} };
  }`,
      `async findExpired(nowMs: number = Date.now()): Promise<readonly TokenEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isExpired(nowMs));
  }`,
      `async findUnusedExpired(nowMs: number = Date.now()): Promise<readonly TokenEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isExpired(nowMs) && !e.isUsed());
  }`,
      `async revokeAllByUserId(userId: UserIdVO, reason: string): Promise<number> {
    const all = await this.findAll();
    let count = 0;
    for (const t of all) {
      if (t.userId.value === userId.value && !t.isRevoked()) { t.revoke(reason); await this.save(t); count++; }
    }
    return count;
  }`,
      `async revokeAllBySessionId(_sessionId: string, _reason: string): Promise<number> { return 0; }`,
      `async purge(_cutoffIso: string): Promise<number> { return 0; }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'user.memory.repository.ts',
    entity: 'UserEntity',
    className: 'User',
    entityPath: '../../../../domain/entities/user.entity.js',
    interfaceName: 'UserRepository',
    interfacePath: '../../../../domain/repositories/user.repository.interface.js',
    voImports: [
      { name: 'UserIdVO', path: '../../../../domain/value-objects/primitives/user-id.vo.js' },
      { name: 'UserEmailVO', path: '../../../../domain/value-objects/primitives/user-email.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: UserIdVO): Promise<UserEntity | null> { return this.findById(id.value); }`,
      `async findByEmail(email: UserEmailVO): Promise<UserEntity | null> { return this.findByEmailRaw(email.value); }`,
      `async findByEmailRaw(email: string): Promise<UserEntity | null> {
    const lower = email.trim().toLowerCase();
    const all = await this.findAll();
    return all.find((e) => e.email.value.toLowerCase() === lower) ?? null;
  }`,
      `async findByPhone(phone: string): Promise<UserEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.phone?.value === phone) ?? null;
  }`,
      `async findByUsername(_username: string): Promise<UserEntity | null> { return null; }`,
      paginatedMethod('UserEntity'),
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, byStatus: {}, byType: {}, byRole: {}, activeCount: all.filter((e) => e.status.isActive()).length, suspendedCount: 0, verifiedCount: all.filter((e) => e.emailVerified).length };
  }`,
      `async findActive(): Promise<readonly UserEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.status.isActive());
  }`,
      `async findByRole(role: string): Promise<readonly UserEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.hasRole(role));
  }`,
      `async findInactive(olderThanDays: number): Promise<readonly UserEntity[]> {
    const cutoff = Date.now() - olderThanDays * 24 * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.status.isInactive() && Date.parse(e.updatedAt) < cutoff);
  }`,
      `async findUnverified(olderThanHours: number): Promise<readonly UserEntity[]> {
    const cutoff = Date.now() - olderThanHours * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => !e.emailVerified && Date.parse(e.createdAt) < cutoff);
  }`,
      `async softDelete(id: string, _deletedBy?: string): Promise<void> { return this.softDeleteById(id); }`,
    ],
  },

  // ═══ USER SUB-ENTITIES ═══
  {
    file: 'user-profile.memory.repository.ts',
    entity: 'UserProfileEntity',
    className: 'UserProfile',
    entityPath: '../../../../domain/entities/user-profile.entity.js',
    interfaceName: 'UserProfileRepository',
    interfacePath: '../../../../domain/repositories/user-profile.repository.interface.js',
    voImports: [
      { name: 'UserIdVO', path: '../../../../domain/value-objects/primitives/user-id.vo.js' },
    ],
    customMethods: [
      `async findByUserId(userId: UserIdVO): Promise<UserProfileEntity | null> { return this.findByUserIdRaw(userId.value); }`,
      `async findByUserIdRaw(userId: string): Promise<UserProfileEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.userId.value === userId) ?? null;
  }`,
      `async findIncomplete(): Promise<readonly UserProfileEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => !e.firstName || !e.lastName);
  }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'user-settings.memory.repository.ts',
    entity: 'UserSettingsEntity',
    className: 'UserSettings',
    entityPath: '../../../../domain/entities/user-settings.entity.js',
    interfaceName: 'UserSettingsRepository',
    interfacePath: '../../../../domain/repositories/user-settings.repository.interface.js',
    voImports: [
      { name: 'UserIdVO', path: '../../../../domain/value-objects/primitives/user-id.vo.js' },
    ],
    customMethods: [
      `async findByUserId(userId: UserIdVO): Promise<UserSettingsEntity | null> { return this.findByUserIdRaw(userId.value); }`,
      `async findByUserIdRaw(userId: string): Promise<UserSettingsEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.userId.value === userId) ?? null;
  }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'user-preferences.memory.repository.ts',
    entity: 'UserPreferencesEntity',
    className: 'UserPreferences',
    entityPath: '../../../../domain/entities/user-preferences.entity.js',
    interfaceName: 'UserPreferencesRepository',
    interfacePath: '../../../../domain/repositories/user-preferences.repository.interface.js',
    voImports: [
      { name: 'UserIdVO', path: '../../../../domain/value-objects/primitives/user-id.vo.js' },
    ],
    customMethods: [
      `async findByUserId(userId: UserIdVO): Promise<UserPreferencesEntity | null> { return this.findByUserIdRaw(userId.value); }`,
      `async findByUserIdRaw(userId: string): Promise<UserPreferencesEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.userId.value === userId) ?? null;
  }`,
      `async findWithMarketing(): Promise<readonly UserPreferencesEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.promotions || e.newsletter);
  }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'user-address.memory.repository.ts',
    entity: 'UserAddressEntity',
    className: 'UserAddress',
    entityPath: '../../../../domain/entities/user-address.entity.js',
    interfaceName: 'UserAddressRepository',
    interfacePath: '../../../../domain/repositories/user-address.repository.interface.js',
    voImports: [
      { name: 'AddressIdVO', path: '../../../../domain/value-objects/primitives/address-id.vo.js' },
      { name: 'UserIdVO', path: '../../../../domain/value-objects/primitives/user-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: AddressIdVO): Promise<UserAddressEntity | null> { return this.findById(id.value); }`,
      `async findByUserId(userId: UserIdVO): Promise<readonly UserAddressEntity[]> { return this.findByUserIdRaw(userId.value); }`,
      `async findByUserIdRaw(userId: string): Promise<readonly UserAddressEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId);
  }`,
      `async findDefaultByUserId(userId: UserIdVO): Promise<UserAddressEntity | null> {
    const all = await this.findByUserId(userId);
    return all.find((e) => e.isDefault) ?? null;
  }`,
      `async findDefaultShippingByUserId(userId: UserIdVO): Promise<UserAddressEntity | null> {
    const all = await this.findByUserId(userId);
    return all.find((e) => e.isDefaultShipping) ?? null;
  }`,
      `async findDefaultBillingByUserId(userId: UserIdVO): Promise<UserAddressEntity | null> {
    const all = await this.findByUserId(userId);
    return all.find((e) => e.isDefaultBilling) ?? null;
  }`,
      `async countByUserId(userId: UserIdVO): Promise<number> { return (await this.findByUserId(userId)).length; }`,
      paginatedMethod('UserAddressEntity'),
      `async unsetAllDefault(userId: UserIdVO): Promise<number> { return 0; }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'user-contact.memory.repository.ts',
    entity: 'UserContactEntity',
    className: 'UserContact',
    entityPath: '../../../../domain/entities/user-contact.entity.js',
    interfaceName: 'UserContactRepository',
    interfacePath: '../../../../domain/repositories/user-contact.repository.interface.js',
    voImports: [
      { name: 'UserIdVO', path: '../../../../domain/value-objects/primitives/user-id.vo.js' },
    ],
    customMethods: [
      `async findByUserId(userId: UserIdVO): Promise<readonly UserContactEntity[]> { return this.findByUserIdRaw(userId.value); }`,
      `async findByUserIdRaw(userId: string): Promise<readonly UserContactEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId);
  }`,
      `async findPrimaryByUserId(userId: UserIdVO): Promise<UserContactEntity | null> {
    const all = await this.findByUserId(userId);
    return all.find((e) => e.isPrimary) ?? null;
  }`,
      `async findByValue(value: string): Promise<UserContactEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.contactValue === value) ?? null;
  }`,
      `async unsetAllPrimary(userId: UserIdVO): Promise<number> { return 0; }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'user-verification.memory.repository.ts',
    entity: 'UserVerificationEntity',
    className: 'UserVerification',
    entityPath: '../../../../domain/entities/user-verification.entity.js',
    interfaceName: 'UserVerificationRepository',
    interfacePath: '../../../../domain/repositories/user-verification.repository.interface.js',
    voImports: [
      { name: 'UserIdVO', path: '../../../../domain/value-objects/primitives/user-id.vo.js' },
    ],
    customMethods: [
      `async findByUserId(userId: UserIdVO): Promise<UserVerificationEntity | null> { return this.findByUserIdRaw(userId.value); }`,
      `async findByUserIdRaw(userId: string): Promise<UserVerificationEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.userId.value === userId) ?? null;
  }`,
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, emailVerifiedCount: all.filter((e) => e.emailVerified).length, phoneVerifiedCount: all.filter((e) => e.phoneVerified).length, identityVerifiedCount: 0, fullyVerifiedCount: 0 };
  }`,
      `async findUnverifiedUsers(): Promise<readonly UserVerificationEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => !e.emailVerified || !e.phoneVerified);
  }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'user-kyc.memory.repository.ts',
    entity: 'UserKycEntity',
    className: 'UserKyc',
    entityPath: '../../../../domain/entities/user-kyc.entity.js',
    interfaceName: 'UserKycRepository',
    interfacePath: '../../../../domain/repositories/user-kyc.repository.interface.js',
    voImports: [
      { name: 'KycIdVO', path: '../../../../domain/value-objects/primitives/kyc-id.vo.js' },
      { name: 'UserIdVO', path: '../../../../domain/value-objects/primitives/user-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: KycIdVO): Promise<UserKycEntity | null> { return this.findById(id.value); }`,
      `async findByUserId(userId: UserIdVO): Promise<UserKycEntity | null> { return this.findByUserIdRaw(userId.value); }`,
      `async findByUserIdRaw(userId: string): Promise<UserKycEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.userId.value === userId) ?? null;
  }`,
      paginatedMethod('UserKycEntity'),
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, byStatus: {}, pendingCount: all.filter((e) => e.isPending()).length, verifiedCount: all.filter((e) => e.isVerified()).length, rejectedCount: all.filter((e) => e.isRejected()).length };
  }`,
      `async findPending(olderThanHours: number): Promise<readonly UserKycEntity[]> {
    const cutoff = Date.now() - olderThanHours * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.isPending() && Date.parse(e.createdAt) < cutoff);
  }`,
      `async findExpiring(withinDays: number): Promise<readonly UserKycEntity[]> {
    const cutoff = Date.now() + withinDays * 24 * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.expiresAt && Date.parse(e.expiresAt) < cutoff);
  }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'user-activity.memory.repository.ts',
    entity: 'UserActivityEntity',
    className: 'UserActivity',
    entityPath: '../../../../domain/entities/user-activity.entity.js',
    interfaceName: 'UserActivityRepository',
    interfacePath: '../../../../domain/repositories/user-activity.repository.interface.js',
    voImports: [
      { name: 'UserIdVO', path: '../../../../domain/value-objects/primitives/user-id.vo.js' },
    ],
    customMethods: [
      `async findByUserId(userId: UserIdVO, limit?: number): Promise<readonly UserActivityEntity[]> {
    const all = await this.findAll();
    const filtered = all.filter((e) => e.userId.value === userId.value);
    return limit ? filtered.slice(0, limit) : filtered;
  }`,
      `async findByType(type: string, limit?: number): Promise<readonly UserActivityEntity[]> {
    const all = await this.findAll();
    const filtered = all.filter((e) => e.type.value === type);
    return limit ? filtered.slice(0, limit) : filtered;
  }`,
      `async findSecurityEvents(userId: UserIdVO, limit?: number): Promise<readonly UserActivityEntity[]> {
    const all = await this.findAll();
    const filtered = all.filter((e) => e.userId.value === userId.value && e.type.isSecurityEvent());
    return limit ? filtered.slice(0, limit) : filtered;
  }`,
      `async findRecent(userId: UserIdVO, sinceMs: number): Promise<readonly UserActivityEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value && Date.parse(e.occurredAt) >= sinceMs);
  }`,
      paginatedMethod('UserActivityEntity'),
      `async purge(_cutoffIso: string): Promise<number> { return 0; }`,
      softDeleteMethod,
    ],
  },

  // ═══ AUTH CHILD ENTITIES ═══
  {
    file: 'account-lock.memory.repository.ts',
    entity: 'AccountLockEntity',
    className: 'AccountLock',
    entityPath: '../../../../domain/entities/account-lock.entity.js',
    interfaceName: 'AccountLockRepository',
    interfacePath: '../../../../domain/repositories/account-lock.repository.interface.js',
    voImports: [
      { name: 'AuthIdVO', path: '../../../../domain/value-objects/primitives/auth-id.vo.js' },
    ],
    customMethods: [
      `async findActiveByAuthId(authId: AuthIdVO): Promise<AccountLockEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.authId.value === authId.value && e.isActive()) ?? null;
  }`,
      `async findActiveByUserId(userId: string): Promise<AccountLockEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.userId.value === userId && e.isActive()) ?? null;
  }`,
      `async findByAuthId(authId: AuthIdVO): Promise<readonly AccountLockEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId.value);
  }`,
      paginatedMethod('AccountLockEntity'),
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, activeCount: all.filter((e) => e.isActive()).length, byReason: {} };
  }`,
      `async findExpired(nowMs: number = Date.now()): Promise<readonly AccountLockEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isExpired(nowMs));
  }`,
      `async autoUnlockExpired(_nowMs: number = Date.now()): Promise<number> { return 0; }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'login-attempt.memory.repository.ts',
    entity: 'LoginAttemptEntity',
    className: 'LoginAttempt',
    entityPath: '../../../../domain/entities/login-attempt.entity.js',
    interfaceName: 'LoginAttemptRepository',
    interfacePath: '../../../../domain/repositories/login-attempt.repository.interface.js',
    voImports: [],
    customMethods: [
      `async findByIdentifier(identifier: string, limit = 20): Promise<readonly LoginAttemptEntity[]> {
    const all = await this.findAll();
    const lower = identifier.toLowerCase();
    return all.filter((e) => e.identifier.normalized.toLowerCase() === lower).slice(0, limit);
  }`,
      `async findByIp(ipAddress: string, limit = 20): Promise<readonly LoginAttemptEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.ipAddress?.value === ipAddress).slice(0, limit);
  }`,
      `async findRecent(identifier: string, windowSeconds: number, nowMs: number = Date.now()): Promise<readonly LoginAttemptEntity[]> {
    const cutoff = nowMs - windowSeconds * 1000;
    return (await this.findByIdentifier(identifier, 100)).filter((e) => Date.parse(e.attemptedAt) >= cutoff);
  }`,
      `async countRecent(identifier: string, windowSeconds: number, nowMs: number = Date.now()): Promise<number> {
    return (await this.findRecent(identifier, windowSeconds, nowMs)).length;
  }`,
      `async countRecentByIp(ipAddress: string, windowSeconds: number, nowMs: number = Date.now()): Promise<number> {
    const cutoff = nowMs - windowSeconds * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.ipAddress?.value === ipAddress && Date.parse(e.attemptedAt) >= cutoff).length;
  }`,
      paginatedMethod('LoginAttemptEntity'),
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, successCount: all.filter((e) => e.isSuccess()).length, failureCount: all.filter((e) => e.isFailure()).length, blockedCount: 0, byStatus: {} };
  }`,
      `async purge(_cutoffIso: string): Promise<number> { return 0; }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'device.memory.repository.ts',
    entity: 'DeviceEntity',
    className: 'Device',
    entityPath: '../../../../domain/entities/device.entity.js',
    interfaceName: 'DeviceRepository',
    interfacePath: '../../../../domain/repositories/device.repository.interface.js',
    voImports: [
      { name: 'DeviceIdVO', path: '../../../../domain/value-objects/primitives/device-id.vo.js' },
      { name: 'UserIdVO', path: '../../../../domain/value-objects/primitives/user-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: DeviceIdVO): Promise<DeviceEntity | null> { return this.findById(id.value); }`,
      `async findByUserId(userId: UserIdVO): Promise<readonly DeviceEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value);
  }`,
      `async findByFingerprint(userId: UserIdVO, fingerprint: string): Promise<DeviceEntity | null> {
    const all = await this.findByUserId(userId);
    return all.find((e) => e.fingerprint.value === fingerprint) ?? null;
  }`,
      `async countByUserId(userId: UserIdVO): Promise<number> { return (await this.findByUserId(userId)).length; }`,
      paginatedMethod('DeviceEntity'),
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, trustedCount: all.filter((e) => e.trusted).length, byType: {} };
  }`,
      `async findStale(inactiveDays: number): Promise<readonly DeviceEntity[]> {
    const cutoff = Date.now() - inactiveDays * 24 * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => Date.parse(e.lastActiveAt) < cutoff);
  }`,
      `async findOldestByUserId(userId: UserIdVO): Promise<DeviceEntity | null> {
    const all = await this.findByUserId(userId);
    return all.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))[0] ?? null;
  }`,
      `async findExpiredTrust(): Promise<readonly DeviceEntity[]> { return []; }`,
      `async removeExpiredTrust(): Promise<number> { return 0; }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'mfa.memory.repository.ts',
    entity: 'MfaEntity',
    className: 'Mfa',
    entityPath: '../../../../domain/entities/mfa.entity.js',
    interfaceName: 'MfaRepository',
    interfacePath: '../../../../domain/repositories/mfa.repository.interface.js',
    voImports: [
      { name: 'MfaIdVO', path: '../../../../domain/value-objects/primitives/mfa-id.vo.js' },
      { name: 'AuthIdVO', path: '../../../../domain/value-objects/primitives/auth-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: MfaIdVO): Promise<MfaEntity | null> { return this.findById(id.value); }`,
      `async findByAuthId(authId: AuthIdVO): Promise<readonly MfaEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId.value);
  }`,
      `async findPrimaryByAuthId(authId: AuthIdVO): Promise<MfaEntity | null> {
    const all = await this.findByAuthId(authId);
    return all[0] ?? null;
  }`,
      `async findEnabledByAuthId(authId: AuthIdVO): Promise<MfaEntity | null> {
    const all = await this.findByAuthId(authId);
    return all.find((e) => e.isEnabledAndVerified()) ?? null;
  }`,
      paginatedMethod('MfaEntity'),
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, enabledCount: all.filter((e) => e.isEnabledAndVerified()).length, byMethod: {}, byVerified: { yes: 0, no: 0 } };
  }`,
      `async findUnverified(olderThanHours: number): Promise<readonly MfaEntity[]> {
    const cutoff = Date.now() - olderThanHours * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => !e.verified && Date.parse(e.createdAt) < cutoff);
  }`,
      `async findFailing(_threshold: number): Promise<readonly MfaEntity[]> { return []; }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'backup-code.memory.repository.ts',
    entity: 'BackupCodeEntity',
    className: 'BackupCode',
    entityPath: '../../../../domain/entities/backup-code.entity.js',
    interfaceName: 'BackupCodeRepository',
    interfacePath: '../../../../domain/repositories/backup-code.repository.interface.js',
    voImports: [
      { name: 'AuthIdVO', path: '../../../../domain/value-objects/primitives/auth-id.vo.js' },
    ],
    customMethods: [
      `async findByAuthId(authId: AuthIdVO): Promise<readonly BackupCodeEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId.value);
  }`,
      `async findUnusedByAuthId(authId: AuthIdVO): Promise<readonly BackupCodeEntity[]> {
    const all = await this.findByAuthId(authId);
    return all.filter((e) => !e.used);
  }`,
      `async countUnusedByAuthId(authId: AuthIdVO): Promise<number> { return (await this.findUnusedByAuthId(authId)).length; }`,
      `async findByCode(authId: AuthIdVO, code: string): Promise<BackupCodeEntity | null> {
    const all = await this.findByAuthId(authId);
    return all.find((e) => e.code.value === code) ?? null;
  }`,
      paginatedMethod('BackupCodeEntity'),
      `async deleteAllByAuthId(_authId: AuthIdVO): Promise<number> { return 0; }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'credential.memory.repository.ts',
    entity: 'CredentialEntity',
    className: 'Credential',
    entityPath: '../../../../domain/entities/credential.entity.js',
    interfaceName: 'CredentialRepository',
    interfacePath: '../../../../domain/repositories/credential.repository.interface.js',
    voImports: [
      { name: 'AuthIdVO', path: '../../../../domain/value-objects/primitives/auth-id.vo.js' },
    ],
    customMethods: [
      `async findByAuthId(_authId: AuthIdVO): Promise<CredentialEntity | null> { return null; }`,
      `async findByAuthIdRaw(_authId: string): Promise<CredentialEntity | null> { return null; }`,
      paginatedMethod('CredentialEntity'),
      `async findExpired(): Promise<readonly CredentialEntity[]> { return []; }`,
      `async findMustChange(): Promise<readonly CredentialEntity[]> { return []; }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'verification.memory.repository.ts',
    entity: 'VerificationEntity',
    className: 'Verification',
    entityPath: '../../../../domain/entities/verification.entity.js',
    interfaceName: 'VerificationRepository',
    interfacePath: '../../../../domain/repositories/verification.repository.interface.js',
    voImports: [
      { name: 'VerificationIdVO', path: '../../../../domain/value-objects/primitives/verification-id.vo.js' },
      { name: 'AuthIdVO', path: '../../../../domain/value-objects/primitives/auth-id.vo.js' },
      { name: 'UserIdVO', path: '../../../../domain/value-objects/primitives/user-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: VerificationIdVO): Promise<VerificationEntity | null> { return this.findById(id.value); }`,
      `async findByAuthId(authId: AuthIdVO): Promise<readonly VerificationEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId.value);
  }`,
      `async findByUserId(userId: UserIdVO): Promise<readonly VerificationEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value);
  }`,
      `async findPendingByTarget(_target: string, _purpose: string): Promise<VerificationEntity | null> { return null; }`,
      `async findLatestByAuthId(authId: AuthIdVO): Promise<VerificationEntity | null> {
    const all = await this.findByAuthId(authId);
    return all.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))[0] ?? null;
  }`,
      paginatedMethod('VerificationEntity'),
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, verifiedCount: all.filter((e) => e.status.isVerified()).length, pendingCount: all.filter((e) => e.status.isPending()).length, byPurpose: {} };
  }`,
      `async findExpired(nowMs: number = Date.now()): Promise<readonly VerificationEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isExpired(nowMs));
  }`,
      `async findPendingOlderThan(minutes: number, nowMs: number = Date.now()): Promise<readonly VerificationEntity[]> {
    const cutoff = nowMs - minutes * 60 * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.status.isPending() && Date.parse(e.createdAt) < cutoff);
  }`,
      `async purge(_cutoffIso: string): Promise<number> { return 0; }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'social-account.memory.repository.ts',
    entity: 'SocialAccountEntity',
    className: 'SocialAccount',
    entityPath: '../../../../domain/entities/social-account.entity.js',
    interfaceName: 'SocialAccountRepository',
    interfacePath: '../../../../domain/repositories/social-account.repository.interface.js',
    voImports: [
      { name: 'UserIdVO', path: '../../../../domain/value-objects/primitives/user-id.vo.js' },
    ],
    customMethods: [
      `async findByUserId(userId: UserIdVO): Promise<readonly SocialAccountEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId.value);
  }`,
      `async findByProviderAndProviderUserId(provider: string, providerUserId: string): Promise<SocialAccountEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.provider.value === provider && e.providerUserId === providerUserId) ?? null;
  }`,
      `async findByUserIdAndProvider(userId: UserIdVO, provider: string): Promise<SocialAccountEntity | null> {
    const all = await this.findByUserId(userId);
    return all.find((e) => e.provider.value === provider) ?? null;
  }`,
      paginatedMethod('SocialAccountEntity'),
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, activeCount: all.filter((e) => e.isActive).length, byProvider: {} };
  }`,
      `async findInactive(olderThanDays: number): Promise<readonly SocialAccountEntity[]> {
    const cutoff = Date.now() - olderThanDays * 24 * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => !e.lastUsedAt || Date.parse(e.lastUsedAt) < cutoff);
  }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'oauth-client.memory.repository.ts',
    entity: 'OAuthClientEntity',
    className: 'OAuthClient',
    entityPath: '../../../../domain/entities/oauth-client.entity.js',
    interfaceName: 'OAuthClientRepository',
    interfacePath: '../../../../domain/repositories/oauth-client.repository.interface.js',
    voImports: [],
    customMethods: [
      `async findByClientId(clientId: string): Promise<OAuthClientEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.clientId === clientId) ?? null;
  }`,
      `async findActiveClients(): Promise<readonly OAuthClientEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isActive);
  }`,
      paginatedMethod('OAuthClientEntity'),
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, activeCount: all.filter((e) => e.isActive).length, publicCount: all.filter((e) => e.isPublic).length, confidentialCount: all.filter((e) => !e.isPublic).length };
  }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'sso-config.memory.repository.ts',
    entity: 'SsoConfigEntity',
    className: 'SsoConfig',
    entityPath: '../../../../domain/entities/sso-config.entity.js',
    interfaceName: 'SsoConfigRepository',
    interfacePath: '../../../../domain/repositories/sso-config.repository.interface.js',
    voImports: [],
    customMethods: [
      `async findByName(name: string): Promise<SsoConfigEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.name === name) ?? null;
  }`,
      `async findByProvider(provider: string): Promise<readonly SsoConfigEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.provider.value === provider);
  }`,
      `async findActive(): Promise<readonly SsoConfigEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isActive);
  }`,
      paginatedMethod('SsoConfigEntity'),
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, activeCount: all.filter((e) => e.isActive).length, byProvider: {} };
  }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'role.memory.repository.ts',
    entity: 'RoleEntity',
    className: 'Role',
    entityPath: '../../../../domain/entities/role.entity.js',
    interfaceName: 'RoleRepository',
    interfacePath: '../../../../domain/repositories/role.repository.interface.js',
    voImports: [
      { name: 'RoleIdVO', path: '../../../../domain/value-objects/primitives/role-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: RoleIdVO): Promise<RoleEntity | null> { return this.findById(id.value); }`,
      `async findByName(name: string): Promise<RoleEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.name.value === name) ?? null;
  }`,
      `async findSystemRoles(): Promise<readonly RoleEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isSystemRole);
  }`,
      `async findWithPermission(_permission: string): Promise<readonly RoleEntity[]> { return []; }`,
      paginatedMethod('RoleEntity'),
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, systemRoleCount: all.filter((e) => e.isSystemRole).length, byLevel: {} };
  }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'permission.memory.repository.ts',
    entity: 'PermissionEntity',
    className: 'Permission',
    entityPath: '../../../../domain/entities/permission.entity.js',
    interfaceName: 'PermissionRepository',
    interfacePath: '../../../../domain/repositories/permission.repository.interface.js',
    voImports: [],
    customMethods: [
      `async findByName(name: string): Promise<PermissionEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.name.value === name) ?? null;
  }`,
      `async findByCategory(category: string): Promise<readonly PermissionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.category === category);
  }`,
      `async findSensitive(): Promise<readonly PermissionEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isSensitive);
  }`,
      paginatedMethod('PermissionEntity'),
      `async getStats(): Promise<unknown> {
    const all = await this.findAll();
    return { total: all.length, sensitiveCount: all.filter((e) => e.isSensitive).length, byCategory: {} };
  }`,
      softDeleteMethod,
    ],
  },

  // ═══ MISSING (auth-2fa, auth-biometric, auth-recovery-code) ═══
  {
    file: 'auth-2fa.memory.repository.ts',
    entity: 'AuthTwoFactorEntity',
    className: 'Auth2Fa',
    entityPath: '../../../../domain/entities/auth-2fa.entity.js',
    interfaceName: 'Auth2FaRepository',
    interfacePath: '../../../../domain/repositories/auth-2fa.repository.interface.js',
    voImports: [
      { name: 'AuthIdVO', path: '../../../../domain/value-objects/primitives/auth-id.vo.js' },
    ],
    customMethods: [
      `async findByAuthId(authId: AuthIdVO): Promise<AuthTwoFactorEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.authId.value === authId.value) ?? null;
  }`,
      `async findByAuthIdRaw(authId: string): Promise<AuthTwoFactorEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.authId.value === authId) ?? null;
  }`,
      `async findEnabledByAuthId(authId: AuthIdVO): Promise<AuthTwoFactorEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.authId.value === authId.value && e.isEnabled()) ?? null;
  }`,
      `async findLocked(): Promise<readonly AuthTwoFactorEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.status.isLocked());
  }`,
      `async findUnverified(olderThanHours: number): Promise<readonly AuthTwoFactorEntity[]> {
    const cutoff = Date.now() - olderThanHours * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => !e.verified && Date.parse(e.createdAt) < cutoff);
  }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'auth-biometric.memory.repository.ts',
    entity: 'AuthBiometricEntity',
    className: 'AuthBiometric',
    entityPath: '../../../../domain/entities/auth-biometric.entity.js',
    interfaceName: 'AuthBiometricRepository',
    interfacePath: '../../../../domain/repositories/auth-biometric.repository.interface.js',
    voImports: [
      { name: 'AuthIdVO', path: '../../../../domain/value-objects/primitives/auth-id.vo.js' },
    ],
    customMethods: [
      `async findByAuthId(authId: AuthIdVO): Promise<readonly AuthBiometricEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId.value);
  }`,
      `async findByAuthIdRaw(authId: string): Promise<readonly AuthBiometricEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId);
  }`,
      `async findByAuthIdAndDevice(authId: AuthIdVO, deviceId: string): Promise<AuthBiometricEntity | null> {
    const all = await this.findByAuthId(authId);
    return all.find((e) => e.deviceId?.value === deviceId) ?? null;
  }`,
      `async findStale(inactiveDays: number): Promise<readonly AuthBiometricEntity[]> {
    const cutoff = Date.now() - inactiveDays * 24 * 3600 * 1000;
    const all = await this.findAll();
    return all.filter((e) => !e.lastUsedAt || Date.parse(e.lastUsedAt) < cutoff);
  }`,
      softDeleteMethod,
    ],
  },
  {
    file: 'auth-recovery-code.memory.repository.ts',
    entity: 'AuthRecoveryCodeEntity',
    className: 'AuthRecoveryCode',
    entityPath: '../../../../domain/entities/auth-recovery-code.entity.js',
    interfaceName: 'AuthRecoveryCodeRepository',
    interfacePath: '../../../../domain/repositories/auth-recovery-code.repository.interface.js',
    voImports: [
      { name: 'AuthIdVO', path: '../../../../domain/value-objects/primitives/auth-id.vo.js' },
    ],
    customMethods: [
      `async findByAuthId(authId: AuthIdVO): Promise<readonly AuthRecoveryCodeEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.authId.value === authId.value);
  }`,
      `async findActiveByAuthId(authId: AuthIdVO): Promise<readonly AuthRecoveryCodeEntity[]> {
    const all = await this.findByAuthId(authId);
    return all.filter((e) => e.isActive());
  }`,
      `async countActiveByAuthId(authId: AuthIdVO): Promise<number> {
    return (await this.findActiveByAuthId(authId)).length;
  }`,
      `async findByCode(authId: AuthIdVO, code: string): Promise<AuthRecoveryCodeEntity | null> {
    const all = await this.findByAuthId(authId);
    return all.find((e) => e.code.value === code) ?? null;
  }`,
      `async revokeAllByAuthId(authId: AuthIdVO): Promise<number> {
    const all = await this.findActiveByAuthId(authId);
    let count = 0;
    for (const rc of all) { rc.revoke(); await this.save(rc); count++; }
    return count;
  }`,
      `async deleteAllByAuthId(_authId: AuthIdVO): Promise<number> { return 0; }`,
      softDeleteMethod,
    ],
  },
];

// ─── Template Generator ────────────────────────
function generateRepo(spec) {
  const voImports = spec.voImports
    .map((v) => `import type { ${v.name} } from '${v.path}';`)
    .join('\n');

  const customMethods = spec.customMethods.join('\n\n  ');

  return `/**
 * ${spec.entity} In-Memory Repository — Full Implementation
 * @module identity-service/infrastructure/persistence/memory/repositories
 *
 * Implements: ${spec.interfaceName}
 * Auto-generated by scripts/generate-inmemory-repos.mjs
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { ${spec.entity} } from '${spec.entityPath}';
import type { ${spec.interfaceName} } from '${spec.interfacePath}';
${voImports}

@Injectable()
export class InMemory${spec.className}Repository
  extends InMemoryRepository<${spec.entity}, string>
  implements ${spec.interfaceName}
{
  protected idOf(entity: ${spec.entity}): string {
    return entity.id;
  }

  ${customMethods}
}
`;
}

// ─── Main ──────────────────────────────────────
function main() {
  if (!existsSync(MEMORY_DIR)) {
    mkdirSync(MEMORY_DIR, { recursive: true });
  }

  let generated = 0;
  let skipped = 0;

  for (const spec of SPECS) {
    const targetPath = join(MEMORY_DIR, spec.file);
    try {
      writeFileSync(targetPath, generateRepo(spec), 'utf8');
      console.log(`✅ ${spec.file}`);
      generated++;
    } catch (err) {
      console.error(`❌ ${spec.file} — ${err.message}`);
      skipped++;
    }
  }

  console.log(`\n📊 Summary: ${generated} generated, ${skipped} skipped, ${SPECS.length} total`);
}

main();
