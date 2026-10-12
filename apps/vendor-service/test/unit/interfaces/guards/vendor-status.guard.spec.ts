import { jest } from '@jest/globals';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { VendorStatusGuard } from '../../../../src/module/interfaces/guards/vendor-status.guard.js';
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
const NOW = new Date().toISOString();

function makeVendor(): VendorEntity {
  return VendorEntity.reconstitute({
    id: UUID, createdAt: NOW, updatedAt: NOW,
    status: VendorStatusVO.approved(),
    props: {
      userId: UUID,
      name: VendorNameVO.create('Acme'),
      slug: VendorSlugVO.create('acme'),
      displayName: VendorNameVO.create('Acme'),
      type: VendorTypeVO.create('individual'),
      businessType: VendorBusinessTypeVO.create('retailer'),
      email: VendorEmailVO.create('a@b.com'),
      tier: VendorTierVO.reconstitute('bronze'),
      rating: RatingScoreVO.zero(),
      totalSales: 0, totalOrders: 0,
      isVerified: false, isFeatured: false, joinedAt: NOW,
    },
  });
}

function makeContext(params: Record<string, string>): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => ({ params }) }),
    getHandler: () => ({}), getClass: () => ({}),
  } as never;
}

describe('VendorStatusGuard', () => {
  let guard: VendorStatusGuard;
  let reflector: jest.Mocked<Reflector>;
  let repo: jest.Mocked<VendorRepository>;

  beforeEach(() => {
    reflector = { get: jest.fn(), getAllAndOverride: jest.fn() } as unknown as jest.Mocked<Reflector>;
    repo = { findById: jest.fn() } as unknown as jest.Mocked<VendorRepository>;
    guard = new VendorStatusGuard(reflector, repo);
  });

  it('returns true when no required statuses', async () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    expect(await guard.canActivate(makeContext({ vendorId: UUID }))).toBe(true);
  });

  it('throws when vendor not found', async () => {
    reflector.getAllAndOverride.mockReturnValue(['active']);
    repo.findById.mockResolvedValue(null);
    await expect(guard.canActivate(makeContext({ vendorId: UUID }))).rejects.toThrow(ForbiddenException);
  });

  it('returns true when status matches', async () => {
    reflector.getAllAndOverride.mockReturnValue(['approved', 'active']);
    repo.findById.mockResolvedValue(makeVendor());
    expect(await guard.canActivate(makeContext({ vendorId: UUID }))).toBe(true);
  });

  it('throws when status does not match', async () => {
    reflector.getAllAndOverride.mockReturnValue(['active']);
    repo.findById.mockResolvedValue(makeVendor());
    await expect(guard.canActivate(makeContext({ vendorId: UUID }))).rejects.toThrow(ForbiddenException);
  });

  it('returns true when vendorId param absent', async () => {
    reflector.getAllAndOverride.mockReturnValue(['active']);
    expect(await guard.canActivate(makeContext({}))).toBe(true);
  });
});
