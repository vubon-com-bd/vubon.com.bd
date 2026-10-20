/**
 * CheckoutSessionService
 * @module order-service/application/services/impl
 */
import { Inject, Injectable } from '@nestjs/common';
import type { ICheckoutSessionService } from '../interfaces/checkout-session.service.interface.js';
import {
  CHECKOUT_SESSION_REPOSITORY,
  type CheckoutSessionRepository,
} from '../../../domain/repositories/checkout-session.repository.interface.js';
import type { CheckoutSessionEntity } from '../../../domain/entities/checkout-session.entity.js';
import { CheckoutSessionMapper } from '../../mappers/checkout.mapper.js';
import { CheckoutSessionNotFoundApplicationError } from '../../errors/checkout.errors.js';
import type { CheckoutSessionResponseDTO } from '../../dtos/responses/checkout-response.dto.js';

@Injectable()
export class CheckoutSessionService implements ICheckoutSessionService {
  constructor(
    @Inject(CHECKOUT_SESSION_REPOSITORY)
    private readonly repo: CheckoutSessionRepository,
  ) {}

  async getById(id: string): Promise<CheckoutSessionResponseDTO> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new CheckoutSessionNotFoundApplicationError(id);
    return CheckoutSessionMapper.toResponse(entity);
  }

  async getLatestByCheckout(
    checkoutId: string,
  ): Promise<CheckoutSessionResponseDTO | null> {
    const entity = await this.repo.findLatestByCheckout(checkoutId);
    return entity ? CheckoutSessionMapper.toResponse(entity) : null;
  }

  async listByCheckout(
    checkoutId: string,
  ): Promise<readonly CheckoutSessionResponseDTO[]> {
    const entities = await this.repo.findByCheckout(checkoutId);
    return entities.map((e: CheckoutSessionEntity) =>
      CheckoutSessionMapper.toResponse(e),
    );
  }
}
