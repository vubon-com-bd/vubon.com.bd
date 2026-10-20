/**
 * CheckoutService
 * @module order-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import type { ICheckoutService } from '../interfaces/checkout.service.interface.js';
import {
  CHECKOUT_REPOSITORY,
  type CheckoutRepository,
} from '../../../domain/repositories/checkout.repository.interface.js';
import type { CheckoutEntity } from '../../../domain/entities/checkout.entity.js';
import { CheckoutIdVO } from '../../../domain/value-objects/primitives/checkout-id.vo.js';
import { CheckoutMapper } from '../../mappers/checkout.mapper.js';
import { CheckoutNotFoundApplicationError } from '../../errors/checkout.errors.js';
import type {
  StartCheckoutCommandDTO,
  SelectAddressCommandDTO,
  SelectShippingCommandDTO,
  SelectPaymentCommandDTO,
  ConfirmCheckoutCommandDTO,
  AbandonCheckoutCommandDTO,
} from '../../dtos/requests/checkout/index.js';
import type {
  CheckoutResponseDTO,
  CheckoutPublicResponseDTO,
  CheckoutConfirmResponseDTO,
} from '../../dtos/responses/checkout-response.dto.js';

@Injectable()
export class CheckoutService implements ICheckoutService {
  private readonly logger = new Logger(CheckoutService.name);

  constructor(
    @Inject(CHECKOUT_REPOSITORY)
    private readonly repo: CheckoutRepository,
  ) {}

  async start(
    dto: StartCheckoutCommandDTO,
    userId: string,
  ): Promise<CheckoutResponseDTO> {
    const customer = (dto as { customerId?: string }).customerId ?? userId;
    this.logger.log(`Starting checkout for customer=${customer} user=${userId}`);
    throw new CheckoutNotFoundApplicationError('new-checkout');
  }

  async selectAddress(
    dto: SelectAddressCommandDTO,
    _actorId?: string,
  ): Promise<CheckoutResponseDTO> {
    const entity = await this.loadById(dto.checkoutId);
    const saved = await this.repo.save(entity);
    return CheckoutMapper.toResponse(saved);
  }

  async selectShipping(
    dto: SelectShippingCommandDTO,
    _actorId?: string,
  ): Promise<CheckoutResponseDTO> {
    const entity = await this.loadById(dto.checkoutId);
    const saved = await this.repo.save(entity);
    return CheckoutMapper.toResponse(saved);
  }

  async selectPayment(
    dto: SelectPaymentCommandDTO,
    _actorId?: string,
  ): Promise<CheckoutResponseDTO> {
    const entity = await this.loadById(dto.checkoutId);
    const saved = await this.repo.save(entity);
    return CheckoutMapper.toResponse(saved);
  }

  async confirm(
    dto: ConfirmCheckoutCommandDTO,
    _actorId?: string,
  ): Promise<CheckoutConfirmResponseDTO> {
    const entity = await this.loadById(dto.checkoutId);
    const saved = await this.repo.save(entity);
    return {
      success: true,
      checkoutId: saved.id,
      orderId: '',
      orderNumber: '',
    };
  }

  async abandon(
    dto: AbandonCheckoutCommandDTO,
    _actorId?: string,
  ): Promise<CheckoutResponseDTO> {
    const entity = await this.loadById(dto.checkoutId);
    entity.abandon(dto.reason);
    const saved = await this.repo.save(entity);
    return CheckoutMapper.toResponse(saved);
  }

  async getById(id: string): Promise<CheckoutResponseDTO> {
    const entity = await this.loadById(id);
    return CheckoutMapper.toResponse(entity);
  }

  async getPublic(id: string): Promise<CheckoutPublicResponseDTO> {
    const entity = await this.loadById(id);
    return CheckoutMapper.toPublicResponse(entity);
  }

  private async loadById(id: string): Promise<CheckoutEntity> {
    const vo = CheckoutIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new CheckoutNotFoundApplicationError(id);
    return entity;
  }
}
