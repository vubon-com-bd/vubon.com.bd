import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CheckoutServiceInterface } from '../interfaces/checkout.service.interface';
import type { CheckoutRepository } from '../../../domain/repositories/checkout.repository.interface';
import { CheckoutEntity } from '../../../domain/entities/checkout.entity';
import { CheckoutIdVO } from '../../../domain/value-objects/primitives/checkout-id.vo';
import { CheckoutOperationFailedError } from '../../errors/checkout.errors';
import type { StartCheckoutRequestDTO } from '../../dtos/requests/checkout/start-checkout.dto';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto';

@Injectable()
export class CheckoutService
  extends BaseService<CheckoutEntity, string>
  implements CheckoutServiceInterface
{
  readonly name = 'CheckoutService';

  constructor(
    private readonly checkoutRepo: CheckoutRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async start(input: StartCheckoutRequestDTO): Promise<CheckoutResponseDTO> {
    void input;
    throw new CheckoutOperationFailedError('start not yet wired');
  }

  async selectAddress(checkoutId: string, addressId: string): Promise<CheckoutResponseDTO> {
    const entity = await this.checkoutRepo.findById(CheckoutIdVO.create(checkoutId));
    if (!entity) throw new CheckoutOperationFailedError('checkout not found');
    const updated = entity.selectAddress(addressId);
    await this.checkoutRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async selectShipping(checkoutId: string, methodId: string): Promise<CheckoutResponseDTO> {
    const entity = await this.checkoutRepo.findById(CheckoutIdVO.create(checkoutId));
    if (!entity) throw new CheckoutOperationFailedError('checkout not found');
    const updated = entity.selectShipping(methodId);
    await this.checkoutRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async selectPayment(checkoutId: string, paymentMethod: string): Promise<CheckoutResponseDTO> {
    const entity = await this.checkoutRepo.findById(CheckoutIdVO.create(checkoutId));
    if (!entity) throw new CheckoutOperationFailedError('checkout not found');
    const updated = entity.selectPayment(paymentMethod);
    await this.checkoutRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async confirm(checkoutId: string): Promise<CheckoutResponseDTO> {
    const entity = await this.checkoutRepo.findById(CheckoutIdVO.create(checkoutId));
    if (!entity) throw new CheckoutOperationFailedError('checkout not found');
    const updated = entity.complete('');
    await this.checkoutRepo.save(updated);
    await this.publishEvents(updated);
    return this.toDTO(updated);
  }

  async abandon(checkoutId: string, reason?: string): Promise<void> {
    const entity = await this.checkoutRepo.findById(CheckoutIdVO.create(checkoutId));
    if (!entity) throw new CheckoutOperationFailedError('checkout not found');
    const updated = entity.abandon(reason ?? 'user_abandoned');
    await this.checkoutRepo.save(updated);
    await this.publishEvents(updated);
  }

  async findById(checkoutId: string): Promise<CheckoutResponseDTO | null> {
    const entity = await this.checkoutRepo.findById(CheckoutIdVO.create(checkoutId));
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: CheckoutEntity): CheckoutResponseDTO {
    return {
      id: entity.id.value,
      customerId: entity.customerId.value,
      status: entity.status.value,
      step: entity.step.value,
      addressId: entity.addressId,
      shippingId: entity.shippingId,
      paymentId: entity.paymentId,
      expiresAt: entity.expiresAt?.toISOString() ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private async publishEvents(entity: CheckoutEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
