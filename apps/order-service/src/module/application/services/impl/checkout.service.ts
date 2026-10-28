/**
 * CheckoutService
 * @module order-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import type { ICheckoutService } from '../interfaces/checkout.service.interface.js';
import {
  CHECKOUT_REPOSITORY,
  type CheckoutRepository,
} from '../../../domain/repositories/checkout.repository.interface.js';
import { CheckoutEntity } from '../../../domain/entities/checkout.entity.js';
import { CheckoutVO } from '../../../domain/value-objects/composites/checkout.vo.js';
import { CheckoutIdVO } from '../../../domain/value-objects/primitives/checkout-id.vo.js';
import { CheckoutStatusVO } from '../../../domain/value-objects/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '../../../domain/value-objects/primitives/checkout-step.vo.js';
import { CustomerIdVO } from '../../../domain/value-objects/primitives/customer-id.vo.js';
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
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async start(
    dto: StartCheckoutCommandDTO,
    userId: string,
  ): Promise<CheckoutResponseDTO> {
    const customer = (dto as { customerId?: string }).customerId ?? userId;
    this.logger.log(`Starting checkout for customer=${customer} user=${userId}`);

    const now = new Date().toISOString();
    const id = randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 min

    const vo = CheckoutVO.create({
      id: CheckoutIdVO.create(id),
      customerId: CustomerIdVO.create(customer),
      status: CheckoutStatusVO.create('started'),
      currentStep: CheckoutStepVO.create('address'),
      expiresAt,
    });

    const entity = CheckoutEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);

    this.logger.log(`✅ Checkout ${saved.id} started for customer ${customer}`);
    return CheckoutMapper.toResponse(saved);
  }

  async selectAddress(
    dto: SelectAddressCommandDTO,
    actorId?: string,
  ): Promise<CheckoutResponseDTO> {
    const entity = await this.loadById(dto.checkoutId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return CheckoutMapper.toResponse(saved);
  }

  async selectShipping(
    dto: SelectShippingCommandDTO,
    actorId?: string,
  ): Promise<CheckoutResponseDTO> {
    const entity = await this.loadById(dto.checkoutId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return CheckoutMapper.toResponse(saved);
  }

  async selectPayment(
    dto: SelectPaymentCommandDTO,
    actorId?: string,
  ): Promise<CheckoutResponseDTO> {
    const entity = await this.loadById(dto.checkoutId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return CheckoutMapper.toResponse(saved);
  }

  async confirm(
    dto: ConfirmCheckoutCommandDTO,
    actorId?: string,
  ): Promise<CheckoutConfirmResponseDTO> {
    const entity = await this.loadById(dto.checkoutId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return {
      checkoutId: saved.id,
      orderId: '',
      status: saved.status.value,
    } as never;
  }

  async abandon(
    dto: AbandonCheckoutCommandDTO,
    actorId?: string,
  ): Promise<CheckoutResponseDTO> {
    const entity = await this.loadById(dto.checkoutId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
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
