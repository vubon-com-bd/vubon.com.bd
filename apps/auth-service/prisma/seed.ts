/**
 * Database Seeding Script
 * 
 * @module prisma/seed
 * 
 * @description
 * Seeds the database with development/test data.
 * Safe to run multiple times (idempotent).
 * 
 * Usage:
 * npm run prisma:seed
 * npm run prisma:seed -- --dry-run
 * 
 * Enterprise Rules:
 * ✅ Idempotent - Safe to run multiple times
 * ✅ Environment-aware - Never runs in production
 * ✅ Transaction-safe
 * ✅ Error handling
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
  return bcrypt.hash(password, 10);
}

async function clearDatabase(prisma: PrismaClient): Promise<void> {
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
// Seed Functions
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
      secret: 'JBSWY3DPEHPK3PXP',
      status: 'ENABLED',
      backupCodes: ['BACKUP_001', 'BACKUP_002', 'BACKUP_003'],
      verifiedAt: new Date(),
    },
    {
      id: 'mfa_user_002',
      userId: 'usr_user_mfa_001',
      type: 'TOTP',
      secret: 'JBSWY3DPEHPK3PXP',
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

    // Seed data in transaction
    if (!config.dryRun) {
      await prisma.$transaction(async (tx) => {
        await seedUsers(tx);
        await seedMfaConfigs(tx);
        await seedSocialAccounts(tx);
        await seedSessions(tx);
        await seedDevices(tx);
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
