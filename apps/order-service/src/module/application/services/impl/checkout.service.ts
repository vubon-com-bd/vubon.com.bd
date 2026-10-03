/**
 * CheckoutService — orchestrates checkout flow
 * @module order-service/application/services/impl
 */
import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { ICheckoutService } from '../interfaces/checkout.service.interface.js';
import {
  CHECKOUT_REPOSITORY,
  type CheckoutRepository,
} from '../../../domain/repositories/checkout.repository.interface.js';
import { CheckoutEntity } from '../../../domain/entities/checkout.entity.js';
import { CheckoutStatusVO } from '../../../domain/value-objects/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '../../../domain/value-objects/primitives/checkout-step.vo.js';
import { CustomerIdVO } from '../../../domain/value-objects/primitives/customer-id.vo.js';
import { ShippingAddressLineVO } from '../../../domain/value-objects/primitives/shipping-address-line.vo.js';
import { BillingAddressLineVO } from '../../../domain/value-objects/primitives/billing-address-line.vo.js';
import {
  CHECKOUT_LIMIT,
  CHECKOUT_STEP,
} from '@vubon/shared-constants/business/checkout';
import { CheckoutMapper } from '../../mappers/checkout.mapper.js';
import {
  CheckoutNotFoundApplicationError,
  CheckoutStartError,
} from '../../errors/checkout.errors.js';
import type { StartCheckoutRequestDTO } from '../../dtos/requests/checkout/start-checkout.dto.js';
import type { SelectAddressRequestDTO } from '../../dtos/requests/checkout/select-address.dto.js';
import type { SelectShippingRequestDTO } from '../../dtos/requests/checkout/select-shipping.dto.js';
import type { SelectPaymentRequestDTO } from '../../dtos/requests/checkout/select-payment.dto.js';
import type { ConfirmCheckoutRequestDTO } from '../../dtos/requests/checkout/confirm-checkout.dto.js';
import type { AbandonCheckoutRequestDTO } from '../../dtos/requests/checkout/abandon-checkout.dto.js';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto.js';

interface AddressInput {
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly country: string;
  readonly state?: string;
  readonly postalCode?: string;
}

@Injectable()
export class CheckoutService implements ICheckoutService {
  constructor(
    @Inject(CHECKOUT_REPOSITORY) private readonly repo: CheckoutRepository,
  ) {}

  async start(dto: StartCheckoutRequestDTO, actorId?: string): Promise<CheckoutResponseDTO> {
    const customerId = actorId;
    if (!customerId) {
      throw new CheckoutStartError('Authentication required (actorId missing)');
    }

    const now = new Date().toISOString();
    const id = randomUUID();
    const expiresAt = new Date(
      Date.now() + CHECKOUT_LIMIT.SESSION_TTL_SECONDS * 1000,
    ).toISOString();

    const entity = CheckoutEntity.create({
      id,
      now,
      props: {
        customerId: CustomerIdVO.create(customerId),
        cartId: dto.cartId,
        status: CheckoutStatusVO.pending(),
        currentStep: CheckoutStepVO.create(CHECKOUT_STEP.CART_REVIEW),
        type: dto.type ?? 'registered',
        currency: 'BDT',
        subtotal: 0,
        discountAmount: 0,
        taxAmount: 0,
        shippingAmount: 0,
        total: 0,
        expiresAt,
      },
    });
    const saved = await this.repo.save(entity);
    return CheckoutMapper.toResponse(saved);
  }

  async selectAddress(dto: SelectAddressRequestDTO, _actorId?: string): Promise<CheckoutResponseDTO> {
    const entity = await this.load(dto.checkoutId);
    const now = new Date().toISOString();

    const shipping = this.buildShippingLine(dto.shippingAddress);
    const billing = dto.billingAddress
      ? this.buildBillingLine(dto.billingAddress)
      : undefined;

    entity.selectAddress(shipping, billing, now);
    const saved = await this.repo.save(entity);
    return CheckoutMapper.toResponse(saved);
  }

  async selectShipping(dto: SelectShippingRequestDTO, _actorId?: string): Promise<CheckoutResponseDTO> {
    const entity = await this.load(dto.checkoutId);
    // Schema does not provide shippingCost — resolve later / default to 0
    entity.selectShippingMethod(dto.shippingMethodId, 0, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return CheckoutMapper.toResponse(saved);
  }

  async selectPayment(dto: SelectPaymentRequestDTO, _actorId?: string): Promise<CheckoutResponseDTO> {
    const entity = await this.load(dto.checkoutId);
    entity.selectPaymentMethod(dto.paymentMethod, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return CheckoutMapper.toResponse(saved);
  }

  async confirm(dto: ConfirmCheckoutRequestDTO, _actorId?: string): Promise<CheckoutResponseDTO> {
    const entity = await this.load(dto.checkoutId);
    const orderId = randomUUID();
    entity.complete(orderId, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return CheckoutMapper.toResponse(saved);
  }

  async abandon(dto: AbandonCheckoutRequestDTO, _actorId?: string): Promise<CheckoutResponseDTO> {
    const entity = await this.load(dto.checkoutId);
    entity.abandon(new Date().toISOString());
    const saved = await this.repo.save(entity);
    return CheckoutMapper.toResponse(saved);
  }

  async getById(checkoutId: string): Promise<CheckoutResponseDTO> {
    const entity = await this.load(checkoutId);
    return CheckoutMapper.toResponse(entity);
  }

  async getActiveByCustomer(customerId: string): Promise<CheckoutResponseDTO | null> {
    const entity = await this.repo.findActiveByCustomer(CustomerIdVO.create(customerId));
    return entity ? CheckoutMapper.toResponse(entity) : null;
  }

  // ─── Private helpers ───
  private async load(checkoutId: string): Promise<CheckoutEntity> {
    const entity = await this.repo.findById(checkoutId);
    if (!entity) throw new CheckoutNotFoundApplicationError(checkoutId);
    return entity;
  }

  private buildShippingLine(addr: AddressInput | undefined): ShippingAddressLineVO {
    if (!addr) {
      throw new CheckoutStartError('Shipping address is required');
    }
    return ShippingAddressLineVO.create({
      fullName: 'Customer',
      phone: '0000000000',
      line1: addr.line1,
      line2: addr.line2,
      city: addr.city,
      state: addr.state,
      postalCode: addr.postalCode,
      country: addr.country.toUpperCase().slice(0, 3),
    });
  }

  private buildBillingLine(addr: AddressInput): BillingAddressLineVO {
    return BillingAddressLineVO.create({
      fullName: 'Customer',
      phone: '0000000000',
      line1: addr.line1,
      line2: addr.line2,
      city: addr.city,
      state: addr.state,
      postalCode: addr.postalCode,
      country: addr.country.toUpperCase().slice(0, 3),
    });
  }
}
