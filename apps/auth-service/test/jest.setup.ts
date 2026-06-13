/**
 * Jest Setup File
 * 
 * @description
 * Global test setup for unit and E2E tests.
 * 
 * Enterprise Rules:
 * ✅ Pure test configuration - No business logic
 * ✅ Environment setup
 * ✅ Global mocks
 * ✅ Database cleanup
 */

import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

// ============================================================
// Environment Setup
// ============================================================

// Load test environment variables
config({ path: '.env.test' });

// Set test environment
process.env.NODE_ENV = 'test';

// Override database for testing
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 
  'postgresql://postgres:postgres@localhost:5432/auth_test_db';

// Increase timeout for e2e tests
jest.setTimeout(30000);

// ============================================================
// Database Helpers
// ============================================================

const prisma = new PrismaClient();

const cleanDatabase = async () => {
  const tables = ['User', 'Session', 'RefreshToken', 'MFA', 'SocialAccount', 'AccountLock'];
  
  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
  }
};

// ============================================================
// Global Mocks
// ============================================================

// Logger mock
jest.mock('@nestjs/common', () => ({
  ...jest.requireActual('@nestjs/common'),
  Logger: jest.fn().mockReturnValue({
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
    localInstance: {
      log: jest.fn(),
      error: jest.fn(),
    },
  }),
}));

// Prisma mock (for unit tests that don't need real DB)
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    session: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    refreshToken: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    mFA: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback(mockPrismaClient)),
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  };
  
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

// Redis mock
jest.mock('ioredis', () => {
  const mockRedis = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    expire: jest.fn(),
    ttl: jest.fn(),
    keys: jest.fn(),
    exists: jest.fn(),
    pipeline: jest.fn(() => ({
      set: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([]),
    })),
    quit: jest.fn(),
  };
  
  return {
    Redis: jest.fn(() => mockRedis),
    Cluster: jest.fn(() => mockRedis),
  };
});

// JWT mock
jest.mock('@nestjs/jwt', () => ({
  JwtService: jest.fn().mockReturnValue({
    sign: jest.fn().mockReturnValue('mock-jwt-token'),
    signAsync: jest.fn().mockResolvedValue('mock-jwt-token'),
    verify: jest.fn().mockReturnValue({ sub: 'test-user-id', email: 'test@example.com' }),
    verifyAsync: jest.fn().mockResolvedValue({ sub: 'test-user-id', email: 'test@example.com' }),
    decode: jest.fn().mockReturnValue({ sub: 'test-user-id' }),
  }),
}));

// Bcrypt mock (for unit tests)
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed-password'),
  compare: jest.fn().mockResolvedValue(true),
  genSalt: jest.fn().mockResolvedValue('salt'),
}));

// ============================================================
// Test Lifecycle Hooks
// ============================================================

// Before all tests
beforeAll(async () => {
  console.log('🧪 Starting test suite...');
  await prisma.$connect();
});

// Before each test
beforeEach(async () => {
  // Clean database before each test
  await cleanDatabase();
  jest.clearAllMocks();
});

// After each test
afterEach(async () => {
  jest.clearAllMocks();
});

// After all tests
afterAll(async () => {
  console.log('✅ Test suite complete');
  await cleanDatabase();
  await prisma.$disconnect();
});

// ============================================================
// Global Test Utilities
// ============================================================

// Create test user helper
global.createTestUser = async (overrides = {}) => {
  const defaultUser = {
    email: 'test@example.com',
    password: 'hashed-password',
    fullName: 'Test User',
  };
  
  return prisma.user.create({
    data: { ...defaultUser, ...overrides },
  });
};

// Generate test token helper
global.generateTestToken = (userId: string = 'test-user-id') => {
  return 'mock-jwt-token';
};

// Clean database helper
global.cleanDatabase = cleanDatabase;

// Type declarations for global helpers
declare global {
  function createTestUser(overrides?: any): Promise<any>;
  function generateTestToken(userId?: string): string;
  function cleanDatabase(): Promise<void>;
}
