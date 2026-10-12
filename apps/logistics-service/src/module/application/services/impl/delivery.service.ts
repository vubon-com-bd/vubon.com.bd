/**
 * DeliveryService — orchestrates delivery lifecycle with attempts
 * @module logistics-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { IDeliveryService, DeliveryListOptionsDTO } from '../interfaces/delivery.service.interface.js';
import { DELIVERY_REPOSITORY, type DeliveryRepository } from '../../../domain/repositories/delivery.repository.interface.js';
import { DeliveryEntity } from '../../../domain/entities/delivery.entity.js';
import { DeliveryIdVO } from '../../../domain/value-objects/primitives/delivery-id.vo.js';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { DriverIdVO } from '../../../domain/value-objects/primitives/driver-id.vo.js';
import { VehicleIdVO } from '../../../domain/value-objects/primitives/vehicle-id.vo.js';
import { RouteIdVO } from '../../../domain/value-objects/primitives/route-id.vo.js';
import { DeliveryTypeVO } from '../../../domain/value-objects/primitives/delivery-type.vo.js';
import { DeliveryAttemptStatusVO } from '../../../domain/value-objects/primitives/delivery-attempt-status.vo.js';
import { AddressDetailsVO } from '../../../domain/value-objects/composites/address-details.vo.js';
import { ProofOfDeliveryVO } from '../../../domain/value-objects/composites/proof-of-delivery.vo.js';

import { DeliveryMapper } from '../../mappers/delivery.mapper.js';
import {
  DeliveryNotFoundApplicationError,
  DeliveryOperationFailedApplicationError,
} from '../../errors/delivery.errors.js';

import type {
  ScheduleDeliveryRequestDTO, AssignDeliveryDriverRequestDTO, AddDeliveryAttemptRequestDTO,
  CompleteDeliveryRequestDTO, FailDeliveryRequestDTO, RescheduleDeliveryRequestDTO,
  CancelDeliveryRequestDTO,
} from '../../dtos/requests/delivery/delivery.dto.js';
import type { DeliveryResponseDTO, DeliveryListResponseDTO } from '../../dtos/responses/delivery/delivery-response.dto.js';

@Injectable()
export class DeliveryService implements IDeliveryService {
  private readonly logger = new Logger(DeliveryService.name);

  constructor(@Inject(DELIVERY_REPOSITORY) private readonly repo: DeliveryRepository) {}

  async schedule(dto: ScheduleDeliveryRequestDTO, actorId?: string): Promise<DeliveryResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();
    let entity: DeliveryEntity;
    try {
      entity = DeliveryEntity.create({
        id, now,
        props: {
          shipmentId: ShipmentIdVO.create(dto.shipmentId),
          orderId: OrderIdVO.create(dto.orderId),
          userId: dto.userId ? UserIdVO.create(dto.userId) : undefined,
          type: DeliveryTypeVO.create(dto.type),
          deliveryAddress: AddressDetailsVO.create({
            address: dto.deliveryAddress,
            contactName: dto.recipientName,
            contactPhone: dto.recipientPhone,
          }),
          recipientName: dto.recipientName,
          recipientPhone: dto.recipientPhone as never,
          scheduledAt: dto.scheduledAt,
        },
      });
    } catch (e) {
      throw new DeliveryOperationFailedApplicationError('schedule', e instanceof Error ? e.message : 'unknown');
    }
    const saved = await this.repo.save(entity);
    this.logger.log(`Delivery ${saved.id} scheduled by ${actorId ?? 'system'}`);
    return DeliveryMapper.toResponse(saved);
  }

  async assignDriver(dto: AssignDeliveryDriverRequestDTO, actorId?: string): Promise<DeliveryResponseDTO> {
    const entity = await this.load(dto.deliveryId);
    entity.assignDriver(
      DriverIdVO.create(dto.driverId),
      dto.vehicleId ? VehicleIdVO.create(dto.vehicleId) : undefined,
      dto.routeId ? RouteIdVO.create(dto.routeId) : undefined,
    );
    const saved = await this.repo.save(entity);
    this.logger.log(`Delivery ${saved.id} driver-assigned by ${actorId ?? 'system'}`);
    return DeliveryMapper.toResponse(saved);
  }

  async addAttempt(dto: AddDeliveryAttemptRequestDTO, actorId?: string): Promise<DeliveryResponseDTO> {
    const entity = await this.load(dto.deliveryId);
    entity.addAttempt({
      id: randomUUID(),
      status: dto.status,
      reason: dto.reason,
      driverId: dto.driverId,
      location: dto.location,
      latitude: dto.latitude,
      longitude: dto.longitude,
      images: dto.images,
      notes: dto.notes,
    });
    const saved = await this.repo.save(entity);
    this.logger.log(`Delivery ${saved.id} attempt added by ${actorId ?? 'system'}`);
    return DeliveryMapper.toResponse(saved);
  }

  async complete(dto: CompleteDeliveryRequestDTO, actorId?: string): Promise<DeliveryResponseDTO> {
    const entity = await this.load(dto.deliveryId);
    const proof = ProofOfDeliveryVO.create({
      type: dto.proofType,
      signatureUrl: dto.signatureUrl,
      photoUrl: dto.photoUrl,
      otp: dto.otp,
      idNumber: dto.idNumber,
      recipientName: dto.recipientName,
      capturedAt: new Date().toISOString(),
    });
    entity.markDelivered(proof, dto.receivedBy);
    const saved = await this.repo.save(entity);
    this.logger.log(`Delivery ${saved.id} completed by ${actorId ?? 'system'}`);
    return DeliveryMapper.toResponse(saved);
  }

  async fail(dto: FailDeliveryRequestDTO, actorId?: string): Promise<DeliveryResponseDTO> {
    const entity = await this.load(dto.deliveryId);
    entity.markFailed(dto.reason);
    const saved = await this.repo.save(entity);
    this.logger.warn(`Delivery ${saved.id} failed by ${actorId ?? 'system'}: ${dto.reason}`);
    return DeliveryMapper.toResponse(saved);
  }

  async reschedule(dto: RescheduleDeliveryRequestDTO, actorId?: string): Promise<DeliveryResponseDTO> {
    const entity = await this.load(dto.deliveryId);
    entity.reschedule(dto.reason);
    const saved = await this.repo.save(entity);
    this.logger.log(`Delivery ${saved.id} rescheduled by ${actorId ?? 'system'}`);
    return DeliveryMapper.toResponse(saved);
  }

  async cancel(dto: CancelDeliveryRequestDTO, actorId?: string): Promise<DeliveryResponseDTO> {
    const entity = await this.load(dto.deliveryId);
    entity.cancel(dto.reason);
    const saved = await this.repo.save(entity);
    this.logger.log(`Delivery ${saved.id} cancelled by ${actorId ?? 'system'}`);
    return DeliveryMapper.toResponse(saved);
  }

  async getById(deliveryId: string): Promise<DeliveryResponseDTO> {
    return DeliveryMapper.toResponse(await this.load(deliveryId));
  }

  async getByShipmentId(shipmentId: string): Promise<DeliveryResponseDTO | null> {
    const vo = ShipmentIdVO.create(shipmentId);
    const d = await this.repo.findByShipmentId(vo);
    return d ? DeliveryMapper.toResponse(d) : null;
  }

  async list(options: DeliveryListOptionsDTO): Promise<DeliveryListResponseDTO> {
    const r = await this.repo.findPaginated({
      page: options.page, limit: options.limit,
      sortBy: options.sortBy, sortDir: options.sortDir, filter: options.filter,
    });
    return DeliveryMapper.toListResponse(r.items, r.total, r.page, r.limit);
  }

  private async load(id: string): Promise<DeliveryEntity> {
    const vo = DeliveryIdVO.create(id);
    const e = await this.repo.findByIdVO(vo);
    if (!e) throw new DeliveryNotFoundApplicationError(id);
    return e;
  }
}
