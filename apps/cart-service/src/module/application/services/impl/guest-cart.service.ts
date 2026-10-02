/**
 * GuestCartService — implements IGuestCartService
 */
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IGuestCartService } from '../interfaces/guest-cart.service.interface.js';
import {
  GUEST_CART_REPOSITORY,
  type GuestCartRepository,
} from '../../../domain/repositories/guest-cart.repository.interface.js';
import { GuestCartEntity } from '../../../domain/entities/guest-cart.entity.js';
import { GuestCartStatusVO } from '../../../domain/value-objects/primitives/guest-cart-status.vo.js';
import { GuestTokenVO } from '../../../domain/value-objects/primitives/guest-token.vo.js';
import { GUEST_CART_STATUS, GUEST_TOKEN_LIMIT } from '@vubon/shared-constants/business/cart';
import type { CreateGuestCartRequestDTO } from '../../dtos/requests/guest/create-guest-cart.dto.js';
import type { GuestCartResponseDTO } from '../../dtos/responses/guest-cart-response.dto.js';

@Injectable()
export class GuestCartService implements IGuestCartService {
  constructor(
    @Inject(GUEST_CART_REPOSITORY) private readonly repo: GuestCartRepository,
  ) {}

  async create(dto: CreateGuestCartRequestDTO): Promise<GuestCartResponseDTO> {
    const now = new Date().toISOString();
    const expiresAt =
      dto.expiresAt ??
      new Date(Date.now() + GUEST_TOKEN_LIMIT.TTL_SECONDS * 1000).toISOString();
    const entity = GuestCartEntity.create({
      id: randomUUID(),
      now,
      props: {
        token: GuestTokenVO.create(dto.token),
        status: GuestCartStatusVO.create(GUEST_CART_STATUS.ACTIVE),
        itemCount: 0,
        expiresAt,
      },
    });
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async findByToken(token: string): Promise<GuestCartResponseDTO | null> {
    const entity = await this.repo.findByToken(GuestTokenVO.create(token));
    return entity ? this.toResponse(entity) : null;
  }

  async updateItemCount(id: string, count: number): Promise<void> {
    const entity = await this.repo.findById(id);
    if (!entity) return;
    entity.updateItemCount(count, new Date().toISOString());
    await this.repo.save(entity);
  }

  async expire(id: string): Promise<void> {
    const entity = await this.repo.findById(id);
    if (!entity) return;
    entity.expire();
    await this.repo.save(entity);
  }

  private toResponse(e: GuestCartEntity): GuestCartResponseDTO {
    return {
      id: e.id,
      token: e.token.value,
      status: e.status.value,
      itemCount: e.itemCount,
      expiresAt: e.expiresAt,
      createdAt: e.createdAt,
      mergedIntoCartId: e.mergedIntoCartId,
    };
  }
}
