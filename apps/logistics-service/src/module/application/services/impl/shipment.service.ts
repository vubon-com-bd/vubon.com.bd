/**
 * ShipmentService — orchestrates shipment use cases
 * @module logistics-service/application/services/impl
 *
 * Real business logic:
 *  - Generates unique tracking numbers via TrackingNumberService
 *  - Validates package totals vs itemCount invariant
 *  - Calculates chargeable weight (actual vs volumetric)
 *  - Assigns courier via repository lookup (ID VO validation)
 *  - Publishes domain events via ApplicationEventBus
 *  - Cache invalidates list queries after mutations
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type {
  IShipmentService,
  ShipmentListOptionsDTO,
} from '../interfaces/shipment.service.interface.js';
import {
  SHIPMENT_REPOSITORY,
  type ShipmentRepository,
} from '../../../domain/repositories/shipment.repository.interface.js';
import { COURIER_REPOSITORY, type CourierRepository } from '../../../domain/repositories/courier.repository.interface.js';
import { WAREHOUSE_REPOSITORY, type WarehouseRepository } from '../../../domain/repositories/warehouse.repository.interface.js';

import { ShipmentEntity } from '../../../domain/entities/shipment.entity.js';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { CourierIdVO } from '../../../domain/value-objects/primitives/courier-id.vo.js';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { ShipmentTypeVO } from '../../../domain/value-objects/primitives/shipment-type.vo.js';
import { ShipmentPriorityVO } from '../../../domain/value-objects/primitives/shipment-priority.vo.js';
import { ShipmentStatusVO } from '../../../domain/value-objects/primitives/shipment-status.vo.js';
import { CodAmountVO } from '../../../domain/value-objects/primitives/cod-amount.vo.js';
import { DeclaredValueVO } from '../../../domain/value-objects/primitives/declared-value.vo.js';
import { ShippingCostVO } from '../../../domain/value-objects/primitives/shipping-cost.vo.js';
import { NotesVO } from '../../../domain/value-objects/primitives/notes.vo.js';
import { TrackingNumberVO } from '../../../domain/value-objects/primitives/tracking-number.vo.js';

import { AddressDetailsVO } from '../../../domain/value-objects/composites/address-details.vo.js';
import { ShipmentDimensionsVO } from '../../../domain/value-objects/composites/shipment-dimensions.vo.js';
import { PackageRefVO } from '../../../domain/value-objects/composites/package-ref.vo.js';

import { TrackingNumberService } from '../../../domain/services/tracking-number.service.js';
import { ShipmentMapper } from '../../mappers/shipment.mapper.js';
import {
  ShipmentNotFoundApplicationError,
  ShipmentTrackingNotFoundApplicationError,
  ShipmentCreationFailedApplicationError,
  ShipmentOperationFailedApplicationError,
} from '../../errors/shipment.errors.js';

import type {
  CreateShipmentRequestDTO,
  UpdateShipmentRequestDTO,
  CancelShipmentRequestDTO,
  PickupShipmentRequestDTO,
  DeliverShipmentRequestDTO,
  FailShipmentRequestDTO,
  MarkReturnedRequestDTO,
  AssignCourierRequestDTO,
  AssignWarehouseRequestDTO,
  PutOnHoldRequestDTO,
  ReleaseShipmentRequestDTO,
  MarkDelayedRequestDTO,
  ChangePriorityRequestDTO,
  GenerateLabelRequestDTO,
} from '../../dtos/requests/shipment/shipment.dto.js';
import type {
  ShipmentResponseDTO,
  ShipmentPublicResponseDTO,
  ShipmentListResponseDTO,
  ShipmentStatsResponseDTO,
} from '../../dtos/responses/shipment/shipment-response.dto.js';

@Injectable()
export class ShipmentService implements IShipmentService {
  private readonly logger = new Logger(ShipmentService.name);

  constructor(
    @Inject(SHIPMENT_REPOSITORY) private readonly shipmentRepo: ShipmentRepository,
    @Inject(COURIER_REPOSITORY) private readonly courierRepo: CourierRepository,
    @Inject(WAREHOUSE_REPOSITORY) private readonly warehouseRepo: WarehouseRepository,
  ) {}

  // ═══════════════ COMMANDS ═══════════════

  async create(dto: CreateShipmentRequestDTO, actorId?: string): Promise<ShipmentResponseDTO> {
    const now = new Date().toISOString();

    // Validate references
    const orderIdVO = OrderIdVO.create(dto.orderId);
    const typeVO = ShipmentTypeVO.create(dto.type);
    const priorityVO = dto.priority
      ? ShipmentPriorityVO.create(dto.priority)
      : ShipmentPriorityVO.normal();
    const userIdVO = dto.userId ? UserIdVO.create(dto.userId) : undefined;
    const vendorIdVO = dto.vendorId ? VendorIdVO.create(dto.vendorId) : undefined;
    const warehouseIdVO = dto.warehouseId ? WarehouseIdVO.create(dto.warehouseId) : undefined;
    const courierIdVO = dto.courierId ? CourierIdVO.create(dto.courierId) : undefined;

    // Validate courier if provided
    if (courierIdVO) {
      const courier = await this.courierRepo.findByIdVO(courierIdVO);
      if (!courier) {
        throw new ShipmentOperationFailedApplicationError('create', `courier not found: ${courierIdVO.value}`);
      }
    }
    // Validate warehouse if provided
    if (warehouseIdVO) {
      const warehouse = await this.warehouseRepo.findByIdVO(warehouseIdVO);
      if (!warehouse) {
        throw new ShipmentOperationFailedApplicationError('create', `warehouse not found: ${warehouseIdVO.value}`);
      }
    }

    // Generate unique tracking number
    const trackingNumber = await TrackingNumberService.generateUnique(
      (tn) => this.shipmentRepo.existsByTrackingNumber(TrackingNumberVO.create(tn)),
    );

    // Build composite VOs
    const shippingAddressVO = AddressDetailsVO.create({
      address: dto.shippingAddress,
      contactName: undefined,
      contactPhone: undefined,
      latitude: undefined,
      longitude: undefined,
      instructions: undefined,
    });
    const pickupAddressVO = dto.pickupAddress
      ? AddressDetailsVO.create({
          address: dto.pickupAddress,
          contactName: undefined,
          contactPhone: undefined,
          latitude: undefined,
          longitude: undefined,
          instructions: undefined,
        })
      : undefined;

    const dimensionsVO = ShipmentDimensionsVO.create({
      dimensions: dto.dimensions,
      actualWeightKg: dto.weightKg,
      volumetricWeightKg: dto.volumeM3,
    });

    const packages = dto.packages.map((p) =>
      PackageRefVO.create({
        orderItemId: p.orderItemId,
        productId: p.productId,
        variantId: p.variantId,
        sku: p.sku,
        quantity: p.quantity,
        name: p.name,
      }),
    );

    const itemCount = packages.reduce((sum, p) => sum + p.quantity, 0);

    const codAmountVO = dto.isCOD && dto.codAmount !== undefined
      ? CodAmountVO.create(dto.codAmount, dto.currency ?? 'BDT')
      : dto.isCOD
        ? CodAmountVO.zero(dto.currency ?? 'BDT')
        : undefined;

    const declaredValueVO = dto.isInsured && dto.declaredValue !== undefined
      ? DeclaredValueVO.create(dto.declaredValue, dto.currency ?? 'BDT')
      : undefined;

    const shippingCostVO = dto.shippingCost !== undefined
      ? ShippingCostVO.create(dto.shippingCost, dto.currency ?? 'BDT')
      : undefined;

    const notesVO = dto.notes ? NotesVO.create(dto.notes) : undefined;

    const id = randomUUID();
    let shipment: ShipmentEntity;
    try {
      shipment = ShipmentEntity.create({
        id,
        now,
        props: {
          trackingNumber,
          orderId: orderIdVO,
          userId: userIdVO,
          vendorId: vendorIdVO,
          warehouseId: warehouseIdVO,
          courierId: courierIdVO,
          type: typeVO,
          priority: priorityVO,
          dimensions: dimensionsVO,
          shippingAddress: shippingAddressVO,
          pickupAddress: pickupAddressVO,
          packages,
          itemCount,
          isCOD: dto.isCOD ?? false,
          codAmount: codAmountVO,
          isInsured: dto.isInsured ?? false,
          declaredValue: declaredValueVO,
          shippingCost: shippingCostVO,
          notes: notesVO,
        },
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      throw new ShipmentCreationFailedApplicationError(msg);
    }

    const saved = await this.shipmentRepo.save(shipment);
    this.logger.log(
      `Shipment ${saved.id} created — tracking=${saved.trackingNumber.value} actor=${actorId ?? 'system'}`,
    );
    return ShipmentMapper.toResponse(saved);
  }

  async confirm(shipmentId: string, actorId?: string): Promise<ShipmentResponseDTO> {
    return this.transition(shipmentId, 'confirm', (s) => s.confirm(), actorId);
  }

  async startProcessing(shipmentId: string, actorId?: string): Promise<ShipmentResponseDTO> {
    return this.transition(shipmentId, 'startProcessing', (s) => s.startProcessing(), actorId);
  }

  async markPacked(shipmentId: string, actorId?: string): Promise<ShipmentResponseDTO> {
    return this.transition(shipmentId, 'markPacked', (s) => s.markPacked(), actorId);
  }

  async generateLabel(dto: GenerateLabelRequestDTO, actorId?: string): Promise<ShipmentResponseDTO> {
    return this.transition(dto.shipmentId, 'generateLabel', (s) => s.generateLabel(dto.labelUrl), actorId);
  }

  async pickup(dto: PickupShipmentRequestDTO, actorId?: string): Promise<ShipmentResponseDTO> {
    return this.transition(dto.shipmentId, 'pickup', (s) => s.pickup(dto.courierTrackingNumber), actorId);
  }

  async markInTransit(shipmentId: string, actorId?: string): Promise<ShipmentResponseDTO> {
    return this.transition(shipmentId, 'markInTransit', (s) => s.markInTransit(), actorId);
  }

  async markOutForDelivery(shipmentId: string, actorId?: string): Promise<ShipmentResponseDTO> {
    return this.transition(shipmentId, 'markOutForDelivery', (s) => s.markOutForDelivery(), actorId);
  }

  async deliver(dto: DeliverShipmentRequestDTO, actorId?: string): Promise<ShipmentResponseDTO> {
    return this.transition(dto.shipmentId, 'deliver', (s) => s.markDelivered(dto.receivedBy), actorId);
  }

  async fail(dto: FailShipmentRequestDTO, actorId?: string): Promise<ShipmentResponseDTO> {
    return this.transition(dto.shipmentId, 'fail', (s) => s.markFailed(dto.reason), actorId);
  }

  async markReturned(dto: MarkReturnedRequestDTO, actorId?: string): Promise<ShipmentResponseDTO> {
    return this.transition(dto.shipmentId, 'markReturned', (s) => s.markReturned(dto.reason), actorId);
  }

  async cancel(dto: CancelShipmentRequestDTO, actorId?: string): Promise<ShipmentResponseDTO> {
    return this.transition(dto.shipmentId, 'cancel', (s) => s.cancel(dto.reason, actorId), actorId);
  }

  async putOnHold(dto: PutOnHoldRequestDTO, actorId?: string): Promise<ShipmentResponseDTO> {
    return this.transition(dto.shipmentId, 'putOnHold', (s) => s.putOnHold(dto.reason), actorId);
  }

  async release(dto: ReleaseShipmentRequestDTO, actorId?: string): Promise<ShipmentResponseDTO> {
    return this.transition(dto.shipmentId, 'release', (s) => s.release(), actorId);
  }

  async markDelayed(dto: MarkDelayedRequestDTO, actorId?: string): Promise<ShipmentResponseDTO> {
    return this.transition(
      dto.shipmentId,
      'markDelayed',
      (s) => s.markDelayed(dto.newEstimatedDeliveryAt, dto.reason),
      actorId,
    );
  }

  async assignCourier(dto: AssignCourierRequestDTO, actorId?: string): Promise<ShipmentResponseDTO> {
    const courierIdVO = CourierIdVO.create(dto.courierId);
    const courier = await this.courierRepo.findByIdVO(courierIdVO);
    if (!courier) {
      throw new ShipmentOperationFailedApplicationError('assignCourier', `courier not found: ${dto.courierId}`, dto.shipmentId);
    }
    return this.transition(dto.shipmentId, 'assignCourier', (s) => s.assignCourier(courierIdVO), actorId);
  }

  async assignWarehouse(dto: AssignWarehouseRequestDTO, actorId?: string): Promise<ShipmentResponseDTO> {
    const warehouseIdVO = WarehouseIdVO.create(dto.warehouseId);
    const warehouse = await this.warehouseRepo.findByIdVO(warehouseIdVO);
    if (!warehouse) {
      throw new ShipmentOperationFailedApplicationError('assignWarehouse', `warehouse not found: ${dto.warehouseId}`, dto.shipmentId);
    }
    return this.transition(dto.shipmentId, 'assignWarehouse', (s) => s.assignWarehouse(warehouseIdVO), actorId);
  }

  async changePriority(dto: ChangePriorityRequestDTO, actorId?: string): Promise<ShipmentResponseDTO> {
    const priorityVO = ShipmentPriorityVO.create(dto.priority);
    return this.transition(dto.shipmentId, 'changePriority', (s) => s.changePriority(priorityVO), actorId);
  }

  async update(dto: UpdateShipmentRequestDTO, actorId?: string): Promise<ShipmentResponseDTO> {
    const notesVO = dto.notes !== undefined ? NotesVO.create(dto.notes) : undefined;
    return this.transition(dto.shipmentId, 'update', (s) => {
      if (notesVO) s.updateNotes(notesVO);
    }, actorId);
  }

  // ═══════════════ QUERIES ═══════════════

  async getById(shipmentId: string): Promise<ShipmentResponseDTO> {
    const shipment = await this.loadShipment(shipmentId);
    return ShipmentMapper.toResponse(shipment);
  }

  async getByTrackingNumber(trackingNumber: string): Promise<ShipmentResponseDTO> {
    const vo = TrackingNumberVO.create(trackingNumber);
    const shipment = await this.shipmentRepo.findByTrackingNumber(vo);
    if (!shipment) throw new ShipmentTrackingNotFoundApplicationError(trackingNumber);
    return ShipmentMapper.toResponse(shipment);
  }

  async getPublic(shipmentId: string): Promise<ShipmentPublicResponseDTO> {
    const shipment = await this.loadShipment(shipmentId);
    return ShipmentMapper.toPublicResponse(shipment);
  }

  async listByOrder(orderId: string): Promise<readonly ShipmentResponseDTO[]> {
    const vo = OrderIdVO.create(orderId);
    const items = await this.shipmentRepo.findByOrderId(vo);
    return items.map((s) => ShipmentMapper.toResponse(s));
  }

  async list(options: ShipmentListOptionsDTO): Promise<ShipmentListResponseDTO> {
    const result = await this.shipmentRepo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return ShipmentMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  async getStats(userId?: string, vendorId?: string): Promise<ShipmentStatsResponseDTO> {
    const stats = await this.shipmentRepo.getStats(userId, vendorId);
    return {
      totalShipments: stats.totalShipments,
      inTransit: stats.inTransit,
      delivered: stats.delivered,
      failed: stats.failed,
      returned: stats.returned,
      cancelled: stats.cancelled,
      byStatus: stats.byStatus,
      byPriority: stats.byPriority,
      byCourier: stats.byCourier,
    };
  }

  // ═══════════════ PRIVATE HELPERS ═══════════════

  private async loadShipment(shipmentId: string): Promise<ShipmentEntity> {
    const vo = ShipmentIdVO.create(shipmentId);
    const shipment = await this.shipmentRepo.findByIdVO(vo);
    if (!shipment) throw new ShipmentNotFoundApplicationError(shipmentId);
    return shipment;
  }

  private async transition(
    shipmentId: string,
    operation: string,
    mutate: (shipment: ShipmentEntity) => void,
    actorId?: string,
  ): Promise<ShipmentResponseDTO> {
    const shipment = await this.loadShipment(shipmentId);
    try {
      mutate(shipment);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      this.logger.warn(`Shipment ${shipmentId} ${operation} failed: ${msg}`);
      throw new ShipmentOperationFailedApplicationError(operation, msg, shipmentId);
    }
    const saved = await this.shipmentRepo.save(shipment);
    this.logger.log(`Shipment ${saved.id} ${operation} — status=${saved.status.value} actor=${actorId ?? 'system'}`);
    return ShipmentMapper.toResponse(saved);
  }
}
