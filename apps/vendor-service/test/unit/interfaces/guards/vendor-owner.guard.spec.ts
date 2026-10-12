/**
 * VendorOwnerGuard — unit tests
 */
import { jest } from '@jest/globals';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { VendorOwnerGuard } from '../../../../src/module/interfaces/guards/vendor-owner.guard.js';
import type { VendorRepository } from '../../../../src/module/domain/repositories/vendor.repository.interface.js';
import { VendorEntity } from '../../../../src/module/domain/entities/vendor.entity.js';
import { VendorNameVO } from '../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../../src/module/domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../../../../src/module/domain/value-objects/primitives/vendor-email.vo.js';
import { VendorTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { VendorStatusVO } from '../../../../src/module/domain/value-objects/primitives/vendor-status.vo.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const OTHER_UUID = '8c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();

function makeVendor(userId: string = UUID): VendorEntity {
  return VendorEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    status: VendorStatusVO.approved(),
    props: {
      userId,
      name: VendorNameVO.create('Acme'),
      slug: VendorSlugVO.create('acme'),
      displayName: VendorNameVO.create('Acme'),
      type: VendorTypeVO.create('individual'),
      businessType: VendorBusinessTypeVO.create('retailer'),
      email: VendorEmailVO.create('a@b.com'),
      tier: VendorTierVO.reconstitute('bronze'),
      rating: RatingScoreVO.zero(),
      totalSales: 0, totalOrders: 0,
      isVerified: false, isFeatured: false,
      joinedAt: NOW,
    },
  });
}

function makeContext(user: unknown, params: Record<string, string> = {}): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => ({ user, params }) }),
    getHandler: () => ({}),
    getClass: () => ({}),
  } as never;
}

function makeRepo(): jest.Mocked<VendorRepository> {
  return {
    findById: jest.fn(),
  } as unknown as jest.Mocked<VendorRepository>;
}

describe('VendorOwnerGuard', () => {
  let guard: VendorOwnerGuard;
  let reflector: jest.Mocked<Reflector>;
  let repo: jest.Mocked<VendorRepository>;

  beforeEach(() => {
    reflector = { get: jest.fn(), getAllAndOverride: jest.fn() } as unknown as jest.Mocked<Reflector>;
    repo = makeRepo();
    guard = new VendorOwnerGuard(reflector, repo);
  });

  it('returns true when no param metadata', async () => {
    reflector.get.mockReturnValue(undefined);
    expect(await guard.canActivate(makeContext({ userId: UUID }))).toBe(true);
  });

  it('throws ForbiddenException when user missing', async () => {
    reflector.get.mockReturnValue('vendorId');
    await expect(guard.canActivate(makeContext(null, { vendorId: UUID }))).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('throws ForbiddenException when vendor not found', async () => {
    reflector.get.mockReturnValue('vendorId');
    repo.findById.mockResolvedValue(null);
    await expect(
      guard.canActivate(makeContext({ userId: UUID }, { vendorId: UUID })),
    ).rejects.toThrow(ForbiddenException);
  });

  it('returns true for super admin', async () => {
    reflector.get.mockReturnValue('vendorId');
    repo.findById.mockResolvedValue(makeVendor(OTHER_UUID));
    const r = await guard.canActivate(
      makeContext({ userId: UUID, roles: ['super_admin'] }, { vendorId: UUID }),
    );
    expect(r).toBe(true);
  });

  it('returns true for admin role', async () => {
    reflector.get.mockReturnValue('vendorId');
    repo.findById.mockResolvedValue(makeVendor(OTHER_UUID));
    const r = await guard.canActivate(makeContext({ userId: UUID, roles: ['admin'] }, { vendorId: UUID }));
    expect(r).toBe(true);
  });

  it('returns true for owner', async () => {
    reflector.get.mockReturnValue('vendorId');
    repo.findById.mockResolvedValue(makeVendor(UUID));
    const r = await guard.canActivate(makeContext({ userId: UUID }, { vendorId: UUID }));
    expect(r).toBe(true);
  });

  it('throws when not owner', async () => {
    reflector.get.mockReturnValue('vendorId');
    repo.findById.mockResolvedValue(makeVendor(OTHER_UUID));
    await expect(
      guard.canActivate(makeContext({ userId: UUID }, { vendorId: UUID })),
    ).rejects.toThrow(ForbiddenException);
  });

  it('returns true when vendorId param not present', async () => {
    reflector.get.mockReturnValue('vendorId');
    const r = await guard.canActivate(makeContext({ userId: UUID }, {}));
    expect(r).toBe(true);
  });
});
