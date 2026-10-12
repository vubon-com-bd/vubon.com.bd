/**
 * FulfillmentService — orchestrates fulfillment lifecycle
 * @module logistics-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { IFulfillmentService, FulfillmentListOptionsDTO } from '../interfaces/fulfillment.service.interface.js';
import { FULFILLMENT_REPOSITORY, type FulfillmentRepository } from '../../../domain/repositories/fulfillment.repository.interface.js';
import { FulfillmentEntity } from '../../../domain/entities/fulfillment.entity.js';
import { FulfillmentIdVO } from '../../../domain/value-objects/primitives/fulfillment-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { FulfillmentTypeVO } from '../../../domain/value-objects/primitives/fulfillment-type.vo.js';
import { FulfillmentPriorityVO } from '../../../domain/value-objects/primitives/fulfillment-priority.vo.js';
import { NotesVO } from '../../../domain/value-objects/primitives/notes.vo.js';
import { SlaVO } from '../../../domain/value-objects/composites/sla.vo.js';

import { FulfillmentMapper } from '../../mappers/fulfillment.mapper.js';
import { FulfillmentNotFoundApplicationError, FulfillmentOperationFailedApplicationError } from '../../errors/fulfillment.errors.js';

import type {
  CreateFulfillmentRequestDTO, AssignFulfillmentRequestDTO, UpdateFulfillmentRequestDTO,
  StartProcessingRequestDTO, StartPickingRequestDTO, StartPackingRequestDTO,
  ReadyToShipRequestDTO, ShipFulfillmentRequestDTO, FulfillFulfillmentRequestDTO,
  PartialFulfillFulfillmentRequestDTO, HoldFulfillmentRequestDTO, ReleaseFulfillmentRequestDTO,
  FailFulfillmentRequestDTO, CancelFulfillmentRequestDTO,
} from '../../dtos/requests/fulfillment/fulfillment.dto.js';
import type { FulfillmentResponseDTO, FulfillmentListResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

@Injectable()
export class FulfillmentService implements IFulfillmentService {
  private readonly logger = new Logger(FulfillmentService.name);

  constructor(@Inject(FULFILLMENT_REPOSITORY) private readonly repo: FulfillmentRepository) {}

  async create(dto: CreateFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();
    let entity: FulfillmentEntity;
    try {
      entity = FulfillmentEntity.create({
        id, now,
        props: {
          orderId: OrderIdVO.create(dto.orderId),
          vendorId: dto.vendorId ? VendorIdVO.create(dto.vendorId) : undefined,
          warehouseId: dto.warehouseId ? WarehouseIdVO.create(dto.warehouseId) : undefined,
          type: FulfillmentTypeVO.create(dto.type),
          priority: dto.priority ? FulfillmentPriorityVO.create(dto.priority) : FulfillmentPriorityVO.normal(),
          itemIds: dto.itemIds,
          notes: dto.notes ? NotesVO.create(dto.notes) : undefined,
          sla: dto.slaHours !== undefined ? SlaVO.create(now, dto.slaHours) : undefined,
        },
      });
    } catch (e) {
      throw new FulfillmentOperationFailedApplicationError('create', e instanceof Error ? e.message : 'unknown');
    }
    const saved = await this.repo.save(entity);
    this.logger.log(`Fulfillment ${saved.id} created by ${actorId ?? 'system'}`);
    return FulfillmentMapper.toResponse(saved);
  }

  async assign(dto: AssignFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO> {
    const e = await this.load(dto.fulfillmentId);
    e.assign(UserIdVO.create(dto.assignedTo) as never);
    const saved = await this.repo.save(e);
    this.logger.log(`Fulfillment ${saved.id} assigned by ${actorId ?? 'system'}`);
    return FulfillmentMapper.toResponse(saved);
  }

  async update(dto: UpdateFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO> {
    const e = await this.load(dto.fulfillmentId);
    if (dto.notes !== undefined) e.updateNotes(NotesVO.create(dto.notes));
    const saved = await this.repo.save(e);
    this.logger.log(`Fulfillment ${saved.id} updated by ${actorId ?? 'system'}`);
    return FulfillmentMapper.toResponse(saved);
  }

  async startProcessing(dto: StartProcessingRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO> {
    return this.transition(dto.fulfillmentId, 'startProcessing', (e) => e.startProcessing(), actorId);
  }
  async startPicking(dto: StartPickingRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO> {
    return this.transition(dto.fulfillmentId, 'startPicking', (e) => e.startPicking(), actorId);
  }
  async startPacking(dto: StartPackingRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO> {
    return this.transition(dto.fulfillmentId, 'startPacking', (e) => e.startPacking(), actorId);
  }
  async readyToShip(dto: ReadyToShipRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO> {
    return this.transition(dto.fulfillmentId, 'readyToShip', (e) => e.markReadyToShip(), actorId);
  }
  async ship(dto: ShipFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO> {
    return this.transition(dto.fulfillmentId, 'ship', (e) => e.ship(), actorId);
  }
  async fulfill(dto: FulfillFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO> {
    return this.transition(dto.fulfillmentId, 'fulfill', (e) => e.markFulfilled(), actorId);
  }
  async markPartiallyFulfilled(dto: PartialFulfillFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO> {
    return this.transition(dto.fulfillmentId, 'markPartiallyFulfilled', (e) => e.markPartiallyFulfilled(), actorId);
  }
  async putOnHold(dto: HoldFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO> {
    return this.transition(dto.fulfillmentId, 'putOnHold', (e) => e.putOnHold(dto.reason), actorId);
  }
  async release(dto: ReleaseFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO> {
    return this.transition(dto.fulfillmentId, 'release', (e) => e.release(), actorId);
  }
  async fail(dto: FailFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO> {
    return this.transition(dto.fulfillmentId, 'fail', (e) => e.fail(dto.reason), actorId);
  }
  async cancel(dto: CancelFulfillmentRequestDTO, actorId?: string): Promise<FulfillmentResponseDTO> {
    return this.transition(dto.fulfillmentId, 'cancel', (e) => e.cancel(dto.reason), actorId);
  }

  async getById(fulfillmentId: string): Promise<FulfillmentResponseDTO> {
    return FulfillmentMapper.toResponse(await this.load(fulfillmentId));
  }

  async list(options: FulfillmentListOptionsDTO): Promise<FulfillmentListResponseDTO> {
    const r = await this.repo.findPaginated({
      page: options.page, limit: options.limit,
      sortBy: options.sortBy, sortDir: options.sortDir, filter: options.filter,
    });
    return FulfillmentMapper.toListResponse(r.items, r.total, r.page, r.limit);
  }

  private async load(id: string): Promise<FulfillmentEntity> {
    const vo = FulfillmentIdVO.create(id);
    const e = await this.repo.findByIdVO(vo);
    if (!e) throw new FulfillmentNotFoundApplicationError(id);
    return e;
  }

  private async transition(
    id: string, op: string,
    mutate: (e: FulfillmentEntity) => void, actorId?: string,
  ): Promise<FulfillmentResponseDTO> {
    const e = await this.load(id);
    try { mutate(e); } catch (err) {
      throw new FulfillmentOperationFailedApplicationError(op, err instanceof Error ? err.message : 'unknown', id);
    }
    const saved = await this.repo.save(e);
    this.logger.log(`Fulfillment ${saved.id} ${op} by ${actorId ?? 'system'}`);
    return FulfillmentMapper.toResponse(saved);
  }
}
