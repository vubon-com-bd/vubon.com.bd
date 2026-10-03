/**
 * CheckoutSessionService
 */
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID, randomBytes } from 'node:crypto';
import type { ICheckoutSessionService } from '../interfaces/checkout-session.service.interface.js';
import {
  CHECKOUT_SESSION_REPOSITORY,
  type CheckoutSessionRepository,
} from '../../../domain/repositories/checkout-session.repository.interface.js';
import { CheckoutSessionEntity } from '../../../domain/entities/checkout-session.entity.js';
import { CheckoutIdVO } from '../../../domain/value-objects/primitives/checkout-id.vo.js';
import { CustomerIdVO } from '../../../domain/value-objects/primitives/customer-id.vo.js';
import { CHECKOUT_LIMIT } from '@vubon/shared-constants/business/checkout';
import { CheckoutMapper } from '../../mappers/checkout.mapper.js';
import { CheckoutSessionNotFoundApplicationError } from '../../errors/checkout.errors.js';
import type { CheckoutSessionResponseDTO } from '../../dtos/responses/checkout-response.dto.js';

@Injectable()
export class CheckoutSessionService implements ICheckoutSessionService {
  constructor(
    @Inject(CHECKOUT_SESSION_REPOSITORY) private readonly repo: CheckoutSessionRepository,
  ) {}

  async create(checkoutId: string, customerId: string): Promise<CheckoutSessionResponseDTO> {
    const now = new Date().toISOString();
    const expiresAt = new Date(
      Date.now() + CHECKOUT_LIMIT.SESSION_TTL_SECONDS * 1000,
    ).toISOString();

    const entity = CheckoutSessionEntity.create({
      id: randomUUID(),
      now,
      props: {
        checkoutId: CheckoutIdVO.create(checkoutId),
        customerId: CustomerIdVO.create(customerId),
        token: randomBytes(24).toString('hex'),
        expiresAt,
      },
    });
    const saved = await this.repo.save(entity);
    return CheckoutMapper.toSessionResponse(saved);
  }

  async getById(sessionId: string): Promise<CheckoutSessionResponseDTO> {
    const entity = await this.repo.findById(sessionId);
    if (!entity) throw new CheckoutSessionNotFoundApplicationError(sessionId);
    return CheckoutMapper.toSessionResponse(entity);
  }

  async getByToken(token: string): Promise<CheckoutSessionResponseDTO> {
    const entity = await this.repo.findByToken(token);
    if (!entity) throw new CheckoutSessionNotFoundApplicationError(token);
    return CheckoutMapper.toSessionResponse(entity);
  }

  async getByCheckoutId(checkoutId: string): Promise<CheckoutSessionResponseDTO | null> {
    const entity = await this.repo.findByCheckoutId(CheckoutIdVO.create(checkoutId));
    return entity ? CheckoutMapper.toSessionResponse(entity) : null;
  }

  async deleteByCheckoutId(checkoutId: string): Promise<void> {
    await this.repo.deleteByCheckoutId(CheckoutIdVO.create(checkoutId));
  }
}
