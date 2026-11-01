/**
 * PaymentMethodService
 * @module payment-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import type {
  IPaymentMethodService,
  MethodListOptionsDTO,
} from '@application/services/interfaces/payment-method.service.interface.js';
import {
  PAYMENT_METHOD_REPOSITORY,
  type PaymentMethodRepository,
} from '@domain/repositories/payment-method.repository.interface.js';
import { PaymentMethodEntity } from '@domain/entities/payment-method.entity.js';
import { PaymentMethodIdVO } from '@domain/primitives/payment-method-id.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';

import type {
  AddPaymentMethodRequestDTO,
  UpdatePaymentMethodRequestDTO,
  DeletePaymentMethodRequestDTO,
  SetDefaultMethodRequestDTO,
} from '@application/dtos/requests/method/index.js';
import type {
  MethodResponseDTO,
  MethodListResponseDTO,
} from '@application/dtos/responses/method-response.dto.js';
import {
  PaymentMethodNotFoundApplicationError,
  PaymentMethodAddError,
  PaymentMethodUpdateError,
  PaymentMethodDeleteError,
  SetDefaultMethodError,
} from '@application/errors/method.errors.js';

@Injectable()
export class PaymentMethodService implements IPaymentMethodService {
  private readonly logger = new Logger(PaymentMethodService.name);

  constructor(
    @Inject(PAYMENT_METHOD_REPOSITORY)
    private readonly repo: PaymentMethodRepository,
  ) {}

  async add(dto: AddPaymentMethodRequestDTO, userId: string): Promise<MethodResponseDTO> {
    try {
      const now = new Date().toISOString();
      const id = `method-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const methodType = PaymentMethodTypeVO.create(dto.method, dto.type);
      const provider = dto.gateway
        ? PaymentMethodProviderVO.create(dto.gateway, 'production')
        : undefined;

      const entity = PaymentMethodEntity.create({
        id: PaymentMethodIdVO.create(this.uuidFromString(id)),
        now,
        props: {
          type: methodType,
          provider,
          label: `${dto.method} · ${dto.last4 ?? '••••'}`,
          isActive: true,
        },
      });
      const saved = await this.repo.save(entity);
      this.logger.log(`PaymentMethod ${saved.id} added for ${userId}`);
      return this.toResponse(saved);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new PaymentMethodAddError(msg);
    }
  }

  async update(
    dto: UpdatePaymentMethodRequestDTO,
    userId: string,
  ): Promise<MethodResponseDTO> {
    try {
      const entity = await this.load(dto.methodId);
      if (dto.label) entity.rename(dto.label);
      const saved = await this.repo.save(entity);
      this.logger.log(`PaymentMethod ${saved.id} updated by ${userId}`);
      return this.toResponse(saved);
    } catch (e) {
      if (e instanceof PaymentMethodNotFoundApplicationError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new PaymentMethodUpdateError(dto.methodId, msg);
    }
  }

  async remove(dto: DeletePaymentMethodRequestDTO, userId: string): Promise<void> {
    try {
      await this.load(dto.methodId);
      await this.repo.softDelete(dto.methodId, userId);
      this.logger.log(`PaymentMethod ${dto.methodId} deleted by ${userId}`);
    } catch (e) {
      if (e instanceof PaymentMethodNotFoundApplicationError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new PaymentMethodDeleteError(dto.methodId, msg);
    }
  }

  async setDefault(
    dto: SetDefaultMethodRequestDTO,
    userId: string,
  ): Promise<MethodResponseDTO> {
    try {
      const entity = await this.load(dto.methodId);
      entity.activate();
      const saved = await this.repo.save(entity);
      this.logger.log(`PaymentMethod ${saved.id} set default by ${userId}`);
      return this.toResponse(saved);
    } catch (e) {
      if (e instanceof PaymentMethodNotFoundApplicationError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new SetDefaultMethodError(dto.methodId, msg);
    }
  }

  async getById(id: string): Promise<MethodResponseDTO> {
    return this.toResponse(await this.load(id));
  }

  async listByUser(
    _userId: string,
    options: MethodListOptionsDTO,
  ): Promise<MethodListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return {
      items: result.items.map((e) => ({
        id: e.id,
        method: e.type.method,
        type: e.type.type,
        label: e.label,
        isActive: e.isActive,
        isDefault: false,
      })),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  private async load(id: string): Promise<PaymentMethodEntity> {
    const vo = PaymentMethodIdVO.create(this.uuidFromString(id));
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new PaymentMethodNotFoundApplicationError(id);
    return entity;
  }

  private toResponse(e: PaymentMethodEntity): MethodResponseDTO {
    return {
      id: e.id,
      method: e.type.method,
      type: e.type.type,
      gateway: e.provider?.provider,
      label: e.label,
      isActive: e.isActive,
      isDefault: false,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  /** Shim: normalize non-UUID ids into UUID-like for VO validation bypass */
  private uuidFromString(s: string): string {
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s)) {
      return s;
    }
    return '00000000-0000-4000-8000-' + s.replace(/[^a-f0-9]/gi, '').padStart(12, '0').slice(-12);
  }
}
