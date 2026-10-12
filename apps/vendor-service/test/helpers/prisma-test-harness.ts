/**
 * Prisma test harness — mock PrismaService with in-memory model delegates
 * @module vendor-service/test/helpers
 *
 * Provides a `.mock` object with jest.fn() for each Prisma delegate method.
 * Usage: const { prisma, mock } = createMockPrisma();
 */
import { jest } from '@jest/globals';
import type { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';

type MockFn = jest.Mock<Promise<unknown>, unknown[]>;

export interface PrismaMock {
  findFirst: MockFn;
  findMany: MockFn;
  findUnique: MockFn;
  create: MockFn;
  update: MockFn;
  updateMany: MockFn;
  delete: MockFn;
  deleteMany: MockFn;
  count: MockFn;
  aggregate: MockFn;
  groupBy: MockFn;
}

export interface MockPrismaService {
  prisma: PrismaService;
  mock: Record<string, PrismaMock>;
}

/** Create fresh PrismaMock for one delegate. */
export function createPrismaMock(): PrismaMock {
  return {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
    count: jest.fn(),
    aggregate: jest.fn(),
    groupBy: jest.fn(),
  };
}

const DELEGATES = [
  'vendor',
  'vendorProfile',
  'vendorSettings',
  'vendorDocument',
  'vendorVerification',
  'vendorApproval',
  'vendorSuspension',
  'vendorSuspensionLog',
  'vendorTeamMember',
  'vendorTeamInvite',
  'vendorPayout',
  'vendorSettlement',
  'vendorInvoice',
  'vendorSubscription',
  'vendorCommission',
  'vendorRating',
  'vendorReview',
  'vendorPerformance',
  'vendorStats',
  'vendorReport',
  'vendorShipping',
  'vendorWarranty',
  'vendorReturnPolicy',
] as const;

/** Create mock PrismaService with all 23 vendor delegates mocked. */
export function createMockPrisma(): MockPrismaService {
  const mock: Record<string, PrismaMock> = {};
  for (const d of DELEGATES) {
    mock[d] = createPrismaMock();
  }
  const mockRoot = { ...mock };
  const prisma = mockRoot as unknown as PrismaService;
  return { prisma, mock };
}

/** Helper: build Prisma row for vendor. */
export function makeVendorRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  const now = new Date('2026-01-01T00:00:00.000Z');
  return {
    id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    userId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    name: 'Acme Store',
    slug: 'acme-store',
    displayName: 'Acme',
    description: null,
    type: 'individual',
    businessType: 'retailer',
    status: 'pending',
    tier: 'bronze',
    email: 'shop@acme.com',
    phone: null,
    website: null,
    logoUrl: null,
    bannerUrl: null,
    addressLine1: '123 Main Street',
    addressLine2: null,
    area: null,
    upazila: 'Savar',
    district: 'Dhaka',
    division: 'Dhaka',
    postalCode: '1340',
    country: 'BD',
    rating: 0,
    totalSales: 0,
    totalOrders: 0,
    isVerified: false,
    isFeatured: false,
    joinedAt: now,
    approvedAt: null,
    suspendedAt: null,
    version: 0,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    ...overrides,
  };
}

/** Helper: build Prisma row for vendor document. */
export function makeDocumentRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  const now = new Date('2026-01-01T00:00:00.000Z');
  return {
    id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    vendorId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    type: 'business_license',
    status: 'pending',
    fileUrl: 'https://cdn.example.com/doc.pdf',
    fileName: 'doc.pdf',
    mimeType: 'application/pdf',
    fileSize: 500000,
    documentNumber: null,
    issuedAt: null,
    expiresAt: new Date('2027-01-01T00:00:00.000Z'),
    verifiedAt: null,
    verifiedBy: null,
    rejectionReason: null,
    notes: null,
    version: 0,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    ...overrides,
  };
}
