/**
 * CartVoucherService
 * @module cart-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import type { ICartVoucherService } from '../interfaces/cart-voucher.service.interface.js';

import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import {
  CART_VOUCHER_REPOSITORY,
  type CartVoucherRepository,
} from '../../../domain/repositories/cart-voucher.repository.interface.js';

import { CartVoucherEntity } from '../../../domain/entities/cart-voucher.entity.js';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo.js';
import { VoucherCodeVO } from '../../../domain/value-objects/primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '../../../domain/value-objects/primitives/voucher-status.vo.js';

import { CartNotFoundApplicationError } from '../../errors/cart.errors.js';
import {
  VoucherNotFoundApplicationError,
  VoucherAlreadyAppliedApplicationError,
  ApplyVoucherError,
  RemoveVoucherError,
  VoucherNotApplicableApplicationError,
} from '../../errors/voucher.errors.js';

import type {
  ApplyVoucherRequestDTO,
  RemoveVoucherRequestDTO,
} from '../../dtos/requests/voucher/index.js';
import type {
  VoucherResponseDTO,
  VoucherPublicResponseDTO,
  VoucherValidationResponseDTO,
} from '../../dtos/responses/voucher-response.dto.js';
import type { CartActionResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@Injectable()
export class CartVoucherService implements ICartVoucherService {
  private readonly logger = new Logger(CartVoucherService.name);

  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepo: CartRepository,
    @Inject(CART_VOUCHER_REPOSITORY)
    private readonly voucherRepo: CartVoucherRepository,
  ) {}

  async apply(
    dto: ApplyVoucherRequestDTO,
    actorId?: string,
  ): Promise<VoucherResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const code = VoucherCodeVO.create(dto.code);

    const exists = await this.voucherRepo.existsByCartAndCode(cart.id, code.value);
    if (exists) {
      throw new VoucherAlreadyAppliedApplicationError(cart.id, code.value);
    }

    if (!cart.canBeModified()) {
      throw new VoucherNotApplicableApplicationError(
        code.value,
        `Cart status "${cart.status.value}" is not modifiable`,
      );
    }

    const now = new Date().toISOString();
    const id = randomUUID();

    let entity: CartVoucherEntity;
    try {
      entity = CartVoucherEntity.create({
        id,
        now,
        props: {
          cartId: CartIdVO.create(cart.id),
          code,
          status: VoucherStatusVO.active(),
          remainingAmount: 0,
          appliedAmount: 0,
          currency: cart.currency,
          expiresAt: this.defaultExpiry(now),
        },
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new ApplyVoucherError(code.value, msg);
    }

    const saved = await this.voucherRepo.save(entity);
    this.logger.log(`Voucher ${code.value} applied to cart ${cart.id} by ${actorId ?? 'system'}`);
    return this.toResponse(saved);
  }

  async remove(
    dto: RemoveVoucherRequestDTO,
    actorId?: string,
  ): Promise<CartActionResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const existing = await this.voucherRepo.findByCartAndCode(cart.id, dto.code);

    if (!existing) {
      throw new VoucherNotFoundApplicationError(dto.code);
    }

    const now = new Date().toISOString();
    try {
      existing.redeem(now);
      await this.voucherRepo.save(existing);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new RemoveVoucherError(dto.code, msg);
    }

    this.logger.log(`Voucher ${dto.code} removed from cart ${cart.id} by ${actorId ?? 'system'}`);
    return {
      success: true,
      cartId: cart.id,
      message: 'Voucher removed',
      at: now,
    };
  }

  async validate(
    cartId: string,
    code: string,
  ): Promise<VoucherValidationResponseDTO> {
    const cart = await this.loadCart(cartId);
    const codeVO = VoucherCodeVO.create(code);

    const existing = await this.voucherRepo.findByCartAndCode(cart.id, codeVO.value);

    if (!existing) {
      return {
        valid: false,
        code: codeVO.value,
        appliedAmount: 0,
        remainingAmount: 0,
        reason: 'Voucher not found or not applied',
      };
    }

    if (!existing.canBeApplied()) {
      return {
        valid: false,
        code: codeVO.value,
        appliedAmount: 0,
        remainingAmount: existing.remainingAmount,
        reason: 'Voucher not applicable',
      };
    }

    const appliedAmount = Math.min(existing.remainingAmount, cart.subtotal);

    return {
      valid: true,
      code: codeVO.value,
      appliedAmount,
      remainingAmount: existing.remainingAmount - appliedAmount,
    };
  }

  async getByCartId(cartId: string): Promise<readonly VoucherResponseDTO[]> {
    const items = await this.voucherRepo.findByCartId(cartId);
    return items.map((i) => this.toResponse(i));
  }

  async getPublicByCartId(cartId: string): Promise<VoucherPublicResponseDTO | null> {
    const item = await this.voucherRepo.findUsableByCartId(cartId);
    return item ? this.toPublicResponse(item) : null;
  }

  // ═══════════════ Helpers ═══════════════

  private async loadCart(id: string) {
    const vo = CartIdVO.create(id);
    const cart = await this.cartRepo.findByIdVO(vo);
    if (!cart) throw new CartNotFoundApplicationError(id);
    return cart;
  }

  private toResponse(entity: CartVoucherEntity): VoucherResponseDTO {
    return {
      id: entity.id,
      cartId: entity.cartId.value,
      code: entity.code.value,
      status: entity.status.value,
      remainingAmount: entity.remainingAmount,
      appliedAmount: entity.appliedAmount,
      currency: entity.currency,
      expiresAt: entity.expiresAt,
      updatedAt: entity.updatedAtInternal,
    };
  }

  private toPublicResponse(entity: CartVoucherEntity): VoucherPublicResponseDTO {
    return {
      id: entity.id,
      code: entity.code.value,
      remainingAmount: entity.remainingAmount,
      appliedAmount: entity.appliedAmount,
      currency: entity.currency,
      expiresAt: entity.expiresAt,
    };
  }

  private defaultExpiry(now: string): string {
    const d = new Date(now);
    d.setDate(d.getDate() + 365);
    return d.toISOString();
  }
}
