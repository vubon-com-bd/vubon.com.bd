/**
 * Database Seeding Script - Enterprise Grade (v2.0)
 * 
 * @module prisma/seed
 * 
 * @description
 * Seeds the database with development/test data.
 * Safe to run multiple times (idempotent).
 * Enhanced with missing functions and security fixes.
 * 
 * Usage:
 * npm run prisma:seed
 * npm run prisma:seed -- --dry-run
 * npm run prisma:seed -- --verbose
 * 
 * Enterprise Rules:
 * ✅ Idempotent - Safe to run multiple times
 * ✅ Environment-aware - Never runs in production
 * ✅ Transaction-safe
 * ✅ Error handling
 * ✅ Dry-run mode for validation
 * ✅ Verbose mode for debugging
 * ✅ Mock secrets for security
 */

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

// ============================================================
// Types
// ============================================================

interface SeedConfig {
  environment: 'development' | 'test' | 'production';
  dryRun: boolean;
  verbose: boolean;
}

// ============================================================
// Configuration
// ============================================================

const prisma = new PrismaClient();

const config: SeedConfig = {
  environment: (process.env.NODE_ENV as any) || 'development',
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose'),
};

// Mock TOTP secret for development only (DO NOT use in production)
const MOCK_TOTP_SECRET = 'DEV_MOCK_TOTP_SECRET_BASE32_1234567890';

// ============================================================
// Helper Functions
// ============================================================

function log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
  if (level === 'error' || config.verbose || level === 'info') {
    const prefix = {
      info: '📘',
      warn: '⚠️',
      error: '❌',
    }[level];
    console.log(`${prefix} ${message}`);
  }
}

function generateMockToken(prefix: string): string {
  return `${prefix}_${crypto.randomBytes(16).toString('hex')}`;
}

async function hashPassword(password: string): Promise<string> {
  // Development/test speed optimization (10 rounds is sufficient)
  return bcrypt.hash(password, 10);
}

async function clearDatabase(prisma: PrismaClient): Promise<void> {
  // Order matters to avoid foreign key constraint violations
  const deleteOrder = [
    prisma.loginAttempt.deleteMany(),
    prisma.device.deleteMany(),
    prisma.socialAccount.deleteMany(),
    prisma.emailVerification.deleteMany(),
    prisma.passwordReset.deleteMany(),
    prisma.accountLock.deleteMany(),
    prisma.mFA.deleteMany(),
    prisma.refreshToken.deleteMany(),
    prisma.session.deleteMany(),
    prisma.user.deleteMany(),
  ];

  await prisma.$transaction(deleteOrder);
  log('Database cleared');
}

// ============================================================
// Seed Functions (All implemented)
// ============================================================

async function seedUsers(prisma: PrismaClient): Promise<void> {
  log('👤 Seeding users...');

  const defaultPassword = 'Test123!@#';
  const hashedPassword = await hashPassword(defaultPassword);

  const users = [
    {
      id: 'usr_super_admin_001',
      email: 'superadmin@vubon.com.bd',
      password: hashedPassword,
      fullName: 'Super Admin',
      phone: '+8801712345678',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      isEmailVerified: true,
      isPhoneVerified: true,
      mfaEnabled: false,
    },
    {
      id: 'usr_admin_001',
      email: 'admin@vubon.com.bd',
      password: hashedPassword,
      fullName: 'Admin User',
      phone: '+8801712345679',
      role: 'ADMIN',
      status: 'ACTIVE',
      isEmailVerified: true,
      isPhoneVerified: true,
      mfaEnabled: false,
    },
    {
      id: 'usr_moderator_001',
      email: 'moderator@vubon.com.bd',
      password: hashedPassword,
      fullName: 'Moderator User',
      phone: '+8801712345680',
      role: 'MODERATOR',
      status: 'ACTIVE',
      isEmailVerified: true,
      isPhoneVerified: true,
      mfaEnabled: true,
    },
    {
      id: 'usr_user_001',
      email: 'user@vubon.com.bd',
      password: hashedPassword,
      fullName: 'Regular User',
      phone: '+8801712345681',
      role: 'USER',
      status: 'ACTIVE',
      isEmailVerified: true,
      isPhoneVerified: false,
      mfaEnabled: false,
    },
    {
      id: 'usr_user_mfa_001',
      email: 'mfa-user@vubon.com.bd',
      password: hashedPassword,
      fullName: 'MFA Enabled User',
      phone: '+8801712345685',
      role: 'USER',
      status: 'ACTIVE',
      isEmailVerified: true,
      isPhoneVerified: true,
      mfaEnabled: true,
    },
    {
      id: 'usr_locked_001',
      email: 'locked@vubon.com.bd',
      password: hashedPassword,
      fullName: 'Locked Account',
      phone: '+8801712345682',
      role: 'USER',
      status: 'LOCKED',
      isEmailVerified: false,
      isPhoneVerified: false,
      mfaEnabled: false,
    },
    {
      id: 'usr_inactive_001',
      email: 'inactive@vubon.com.bd',
      password: hashedPassword,
      fullName: 'Inactive Account',
      phone: '+8801712345683',
      role: 'USER',
      status: 'INACTIVE',
      isEmailVerified: false,
      isPhoneVerified: false,
      mfaEnabled: false,
    },
    {
      id: 'usr_suspended_001',
      email: 'suspended@vubon.com.bd',
      password: hashedPassword,
      fullName: 'Suspended Account',
      phone: '+8801712345684',
      role: 'USER',
      status: 'SUSPENDED',
      isEmailVerified: false,
      isPhoneVerified: false,
      mfaEnabled: false,
    },
  ];

  if (config.dryRun) {
    log(`Would seed ${users.length} users (dry-run)`, 'info');
    return;
  }

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
  }

  log(`✅ ${users.length} users seeded`);
}

async function seedMfaConfigs(prisma: PrismaClient): Promise<void> {
  log('🔑 Seeding MFA configurations...');

  const mfaConfigs = [
    {
      id: 'mfa_user_001',
      userId: 'usr_moderator_001',
      type: 'TOTP',
      secret: MOCK_TOTP_SECRET, // Mock secret for development
      status: 'ENABLED',
      backupCodes: ['BACKUP_001', 'BACKUP_002', 'BACKUP_003'],
      verifiedAt: new Date(),
    },
    {
      id: 'mfa_user_002',
      userId: 'usr_user_mfa_001',
      type: 'TOTP',
      secret: MOCK_TOTP_SECRET, // Mock secret for development
      status: 'ENABLED',
      backupCodes: ['BACKUP_004', 'BACKUP_005', 'BACKUP_006'],
      verifiedAt: new Date(),
    },
  ];

  if (config.dryRun) {
    log(`Would seed ${mfaConfigs.length} MFA configs (dry-run)`, 'info');
    return;
  }

  for (const mfa of mfaConfigs) {
    await prisma.mFA.upsert({
      where: { id: mfa.id },
      update: mfa,
      create: mfa,
    });
  }

  log(`✅ ${mfaConfigs.length} MFA configurations seeded`);
}

async function seedSocialAccounts(prisma: PrismaClient): Promise<void> {
  log('🌐 Seeding social accounts...');

  const socialAccounts = [
    {
      id: 'social_001',
      userId: 'usr_user_001',
      provider: 'GOOGLE',
      providerUserId: 'google_123456789',
      providerEmail: 'user@gmail.com',
      providerName: 'User Google',
      accessToken: generateMockToken('google_token'),
      refreshToken: generateMockToken('google_refresh'),
      isLinked: true,
      linkedAt: new Date(),
    },
    {
      id: 'social_002',
      userId: 'usr_user_001',
      provider: 'GITHUB',
      providerUserId: 'github_987654321',
      providerEmail: 'user@github.com',
      providerName: 'User GitHub',
      accessToken: generateMockToken('github_token'),
      refreshToken: generateMockToken('github_refresh'),
      isLinked: true,
      linkedAt: new Date(),
    },
  ];

  if (config.dryRun) {
    log(`Would seed ${socialAccounts.length} social accounts (dry-run)`, 'info');
    return;
  }

  for (const account of socialAccounts) {
    await prisma.socialAccount.upsert({
      where: { id: account.id },
      update: account,
      create: account,
    });
  }

  log(`✅ ${socialAccounts.length} social accounts seeded`);
}

// ============================================================
// NEW: Sessions Seeding (Previously missing)
// ============================================================

async function seedSessions(prisma: PrismaClient): Promise<void> {
  log('🖥️ Seeding sessions...');

  const sessions = [
    {
      id: 'sess_user_001',
      userId: 'usr_user_001',
      token: generateMockToken('session'),
      status: 'ACTIVE',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      lastActivityAt: new Date(),
      deviceInfo: { deviceType: 'desktop', browser: 'Chrome', os: 'Windows' },
    },
    {
      id: 'sess_admin_001',
      userId: 'usr_admin_001',
      token: generateMockToken('session'),
      status: 'ACTIVE',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      lastActivityAt: new Date(),
      deviceInfo: { deviceType: 'laptop', browser: 'Firefox', os: 'macOS' },
    },
  ];

  if (config.dryRun) {
    log(`Would seed ${sessions.length} sessions (dry-run)`, 'info');
    return;
  }

  for (const session of sessions) {
    await prisma.session.upsert({
      where: { id: session.id },
      update: session,
      create: session,
    });
  }

  log(`✅ ${sessions.length} sessions seeded`);
}

// ============================================================
// NEW: Devices Seeding (Previously missing)
// ============================================================

async function seedDevices(prisma: PrismaClient): Promise<void> {
  log('📱 Seeding devices...');

  const devices = [
    {
      id: 'dev_user_001',
      userId: 'usr_user_001',
      deviceId: 'device_chrome_desktop_001',
      deviceType: 'DESKTOP',
      status: 'ACTIVE',
      trustLevel: 'STANDARD',
      lastUsedAt: new Date(),
    },
    {
      id: 'dev_admin_001',
      userId: 'usr_admin_001',
      deviceId: 'device_firefox_laptop_001',
      deviceType: 'LAPTOP',
      status: 'ACTIVE',
      trustLevel: 'TRUSTED',
      lastUsedAt: new Date(),
    },
  ];

  if (config.dryRun) {
    log(`Would seed ${devices.length} devices (dry-run)`, 'info');
    return;
  }

  for (const device of devices) {
    await prisma.device.upsert({
      where: { id: device.id },
      update: device,
      create: device,
    });
  }

  log(`✅ ${devices.length} devices seeded`);
}

// ============================================================
// NEW: Email Verifications Seeding
// ============================================================

async function seedEmailVerifications(prisma: PrismaClient): Promise<void> {
  log('📧 Seeding email verifications...');

  const verifications = [
    {
      id: 'email_ver_001',
      userId: 'usr_user_mfa_001',
      email: 'mfa-user@vubon.com.bd',
      token: generateMockToken('email_ver'),
      status: 'VERIFIED',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      verifiedAt: new Date(),
    },
  ];

  if (config.dryRun) {
    log(`Would seed ${verifications.length} email verifications (dry-run)`, 'info');
    return;
  }

  for (const verification of verifications) {
    await prisma.emailVerification.upsert({
      where: { id: verification.id },
      update: verification,
      create: verification,
    });
  }

  log(`✅ ${verifications.length} email verifications seeded`);
}

// ============================================================
// Main Function
// ============================================================

async function main(): Promise<void> {
  const startTime = Date.now();
  
  // 🚨 CRITICAL: Prevent seeding in production
  if (config.environment === 'production') {
    log('❌ Database seeding is NOT allowed in production environment!', 'error');
    log('This could overwrite production data with test data.', 'error');
    process.exit(1);
  }
  
  log(`🚀 Starting database seeding (${config.environment} environment)`);
  
  if (config.dryRun) {
    log('🏁 DRY RUN MODE - No changes will be made');
  }

  try {
    // Validate environment
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    // Clear and seed
    if (!config.dryRun) {
      await clearDatabase(prisma);
    } else {
      log('Would clear database (dry-run)', 'info');
    }

    // Seed data in transaction (all functions now defined)
    if (!config.dryRun) {
      await prisma.$transaction(async (tx) => {
        await seedUsers(tx);
        await seedMfaConfigs(tx);
        await seedSocialAccounts(tx);
        await seedSessions(tx);        // ✅ Fixed: Now defined
        await seedDevices(tx);         // ✅ Fixed: Now defined
        await seedEmailVerifications(tx);
      });
    } else {
      log('Would seed data in transaction (dry-run)', 'info');
    }

    const duration = Date.now() - startTime;
    log(`✅ Seeding completed successfully in ${duration}ms`);
  } catch (error) {
    log(`Seeding failed: ${error.message}`, 'error');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run seeding
main();
