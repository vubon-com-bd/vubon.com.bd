import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartVoucherService } from '../../../../src/module/application/services/impl/cart-voucher.service.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import type { CartVoucherRepository } from '../../../../src/module/domain/repositories/cart-voucher.repository.interface.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartVoucherEntity } from '../../../../src/module/domain/entities/cart-voucher.entity.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { VoucherCodeVO } from '../../../../src/module/domain/value-objects/primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '../../../../src/module/domain/value-objects/primitives/voucher-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { VoucherAlreadyAppliedApplicationError } from '../../../../src/module/application/errors/voucher.errors.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';
const VOUCHER_ID = '223e4567-e89b-12d3-a456-426614174000';
const NOW = '2024-01-15T10:00:00.000Z';

function makeCart(): CartEntity {
  return CartEntity.reconstitute({
    id: CART_ID, createdAt: NOW, updatedAt: NOW, status: 'active',
    props: {
      type: CartTypeVO.user(),
      currency: 'BDT', itemCount: 0, subtotal: 500, discountAmount: 0,
      taxAmount: 0, shippingAmount: 0, total: 500,
      expiresAt: '2099-12-31T23:59:59.000Z', lastActivityAt: NOW,
    },
  });
}

function makeVoucher(): CartVoucherEntity {
  return CartVoucherEntity.create({
    id: VOUCHER_ID, now: NOW,
    props: {
      cartId: CartIdVO.create(CART_ID),
      code: VoucherCodeVO.create('GIFT12345678'),
      status: VoucherStatusVO.active(),
      remainingAmount: 1000,
      appliedAmount: 0,
      currency: 'BDT',
      expiresAt: '2099-12-31T23:59:59.000Z',
    },
  });
}

function makeCartRepo(): jest.Mocked<CartRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(), delete: jest.fn(), exists: jest.fn(),
    findByUserId: jest.fn(), findActiveByUserId: jest.fn(),
    findBySessionId: jest.fn(), findActiveBySessionId: jest.fn(),
    findByStatus: jest.fn(), findByIdempotencyKey: jest.fn(),
    findPaginated: jest.fn(), getStats: jest.fn(),
    findStale: jest.fn(), findExpired: jest.fn(), findAbandonable: jest.fn(),
    findRetryable: jest.fn(),
    countByUserId: jest.fn(), countByStatus: jest.fn(), countActiveByUserId: jest.fn(),
    softDelete: jest.fn(), restore: jest.fn(), bulkUpdateStatus: jest.fn(),
  } as unknown as jest.Mocked<CartRepository>;
}

function makeVoucherRepo(): jest.Mocked<CartVoucherRepository> {
  return {
    findById: jest.fn(), findAll: jest.fn(), save: jest.fn(),
    delete: jest.fn(), exists: jest.fn(),
    findByCartId: jest.fn(), findUsableByCartId: jest.fn(),
    existsByCartAndCode: jest.fn(), findByCartAndCode: jest.fn(),
    findByCode: jest.fn(), findByStatus: jest.fn(), findExpired: jest.fn(),
    findPaginated: jest.fn(), getStats: jest.fn(),
    deleteByCartId: jest.fn(), bulkUpdateStatus: jest.fn(),
    softDelete: jest.fn(), restore: jest.fn(),
  } as unknown as jest.Mocked<CartVoucherRepository>;
}

describe('CartVoucherService', () => {
  let service: CartVoucherService;
  let cartRepo: jest.Mocked<CartRepository>;
  let voucherRepo: jest.Mocked<CartVoucherRepository>;

  beforeEach(() => {
    cartRepo = makeCartRepo();
    voucherRepo = makeVoucherRepo();
    service = new CartVoucherService(cartRepo, voucherRepo);
  });

  describe('apply', () => {
    it('should apply voucher to cart', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());
      voucherRepo.existsByCartAndCode.mockResolvedValue(false);
      voucherRepo.save.mockImplementation(async (e) => e);

      const result = await service.apply({ cartId: CART_ID, code: 'GIFT12345678' });

      expect(result.code).toBe('GIFT12345678');
      expect(result.status).toBe('active');
    });

    it('should throw when voucher already applied', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());
      voucherRepo.existsByCartAndCode.mockResolvedValue(true);

      await expect(
        service.apply({ cartId: CART_ID, code: 'GIFT12345678' }),
      ).rejects.toThrow(VoucherAlreadyAppliedApplicationError);
    });
  });

  describe('validate', () => {
    it('should return valid with applied amount', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());
      voucherRepo.findByCartAndCode.mockResolvedValue(makeVoucher());

      const result = await service.validate(CART_ID, 'GIFT12345678');

      expect(result.valid).toBe(true);
      expect(result.appliedAmount).toBe(500);
      expect(result.remainingAmount).toBe(500);
    });
  });

  describe('getByCartId', () => {
    it('should return all vouchers for cart', async () => {
      voucherRepo.findByCartId.mockResolvedValue([makeVoucher()]);

      const result = await service.getByCartId(CART_ID);

      expect(result).toHaveLength(1);
    });
  });
});
