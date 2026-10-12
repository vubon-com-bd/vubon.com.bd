/**
 * DispatchService — orchestrates dispatch batches
 * @module logistics-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { IDispatchService, DispatchListOptionsDTO } from '../interfaces/dispatch.service.interface.js';
import { DISPATCH_REPOSITORY, type DispatchRepository } from '../../../domain/repositories/dispatch.repository.interface.js';
import { DispatchEntity } from '../../../domain/entities/dispatch.entity.js';
import { DispatchIdVO } from '../../../domain/value-objects/primitives/dispatch-id.vo.js';
import { DispatchNumberVO } from '../../../domain/value-objects/primitives/dispatch-number.vo.js';
import { DispatchTypeVO } from '../../../domain/value-objects/primitives/dispatch-type.vo.js';
import { CourierIdVO } from '../../../domain/value-objects/primitives/courier-id.vo.js';
import { VehicleIdVO } from '../../../domain/value-objects/primitives/vehicle-id.vo.js';
import { DriverIdVO } from '../../../domain/value-objects/primitives/driver-id.vo.js';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { NotesVO } from '../../../domain/value-objects/primitives/notes.vo.js';

import { DispatchMapper } from '../../mappers/dispatch.mapper.js';
import { DispatchNotFoundApplicationError, DispatchOperationFailedApplicationError } from '../../errors/dispatch.errors.js';

import type {
  CreateDispatchRequestDTO, AddDispatchShipmentRequestDTO, RemoveDispatchShipmentRequestDTO,
  AssignDispatchRequestDTO, GenerateDispatchManifestRequestDTO, UpdateDispatchEtaRequestDTO,
  StartDispatchRequestDTO, MarkDispatchInTransitRequestDTO, CompleteDispatchRequestDTO,
  FailDispatchRequestDTO, ReturnDispatchRequestDTO, CancelDispatchRequestDTO,
} from '../../dtos/requests/dispatch/dispatch.dto.js';
import type { DispatchResponseDTO, DispatchListResponseDTO } from '../../dtos/responses/dispatch/dispatch-response.dto.js';

@Injectable()
export class DispatchService implements IDispatchService {
  private readonly logger = new Logger(DispatchService.name);

  constructor(@Inject(DISPATCH_REPOSITORY) private readonly repo: DispatchRepository) {}

  async create(dto: CreateDispatchRequestDTO, actorId?: string): Promise<DispatchResponseDTO> {
    const now = new Date().toISOString();
    // Generate unique dispatch number
    let dispatchNumberVO: DispatchNumberVO;
    let attempt = 0;
    do {
      dispatchNumberVO = DispatchNumberVO.generate(attempt + 1);
      attempt++;
    } while (await this.repo.existsByNumber(dispatchNumberVO) && attempt < 5);

    const id = randomUUID();
    let entity: DispatchEntity;
    try {
      entity = DispatchEntity.create({
        id, now,
        props: {
          dispatchNumber: dispatchNumberVO,
          type: DispatchTypeVO.create(dto.type),
          shipmentIds: dto.shipmentIds,
          courierId: dto.courierId ? CourierIdVO.create(dto.courierId) : undefined,
          vehicleId: dto.vehicleId ? VehicleIdVO.create(dto.vehicleId) : undefined,
          driverId: dto.driverId ? DriverIdVO.create(dto.driverId) : undefined,
          warehouseId: dto.warehouseId ? WarehouseIdVO.create(dto.warehouseId) : undefined,
          estimatedArrivalAt: dto.estimatedArrivalAt,
          notes: dto.notes ? NotesVO.create(dto.notes) : undefined,
        },
      });
    } catch (e) {
      throw new DispatchOperationFailedApplicationError('create', e instanceof Error ? e.message : 'unknown');
    }
    const saved = await this.repo.save(entity);
    this.logger.log(`Dispatch ${saved.id} created by ${actorId ?? 'system'}`);
    return DispatchMapper.toResponse(saved);
  }

  async addShipment(dto: AddDispatchShipmentRequestDTO, actorId?: string): Promise<DispatchResponseDTO> {
    const e = await this.load(dto.dispatchId);
    e.addShipment(dto.shipmentId, dto.items ?? 1, dto.weightKg);
    const saved = await this.repo.save(e);
    this.logger.log(`Dispatch ${saved.id} shipment added by ${actorId ?? 'system'}`);
    return DispatchMapper.toResponse(saved);
  }

  async removeShipment(dto: RemoveDispatchShipmentRequestDTO, actorId?: string): Promise<DispatchResponseDTO> {
    const e = await this.load(dto.dispatchId);
    e.removeShipment(dto.shipmentId, dto.items ?? 1);
    const saved = await this.repo.save(e);
    this.logger.log(`Dispatch ${saved.id} shipment removed by ${actorId ?? 'system'}`);
    return DispatchMapper.toResponse(saved);
  }

  async assign(dto: AssignDispatchRequestDTO, actorId?: string): Promise<DispatchResponseDTO> {
    const e = await this.load(dto.dispatchId);
    e.assign(
      CourierIdVO.create(dto.courierId),
      dto.vehicleId ? VehicleIdVO.create(dto.vehicleId) : undefined,
      dto.driverId ? DriverIdVO.create(dto.driverId) : undefined,
      dto.warehouseId ? WarehouseIdVO.create(dto.warehouseId) : undefined,
    );
    const saved = await this.repo.save(e);
    this.logger.log(`Dispatch ${saved.id} assigned by ${actorId ?? 'system'}`);
    return DispatchMapper.toResponse(saved);
  }

  async generateManifest(dto: GenerateDispatchManifestRequestDTO, actorId?: string): Promise<DispatchResponseDTO> {
    const e = await this.load(dto.dispatchId);
    e.generateManifest(dto.manifestUrl);
    const saved = await this.repo.save(e);
    this.logger.log(`Dispatch ${saved.id} manifest generated by ${actorId ?? 'system'}`);
    return DispatchMapper.toResponse(saved);
  }

  async updateEta(dto: UpdateDispatchEtaRequestDTO, actorId?: string): Promise<DispatchResponseDTO> {
    const e = await this.load(dto.dispatchId);
    e.updateEta(dto.newEta);
    const saved = await this.repo.save(e);
    this.logger.log(`Dispatch ${saved.id} ETA updated by ${actorId ?? 'system'}`);
    return DispatchMapper.toResponse(saved);
  }

  async start(dto: StartDispatchRequestDTO, actorId?: string): Promise<DispatchResponseDTO> {
    return this.transition(dto.dispatchId, 'start', (e) => e.start(), actorId);
  }
  async markInTransit(dto: MarkDispatchInTransitRequestDTO, actorId?: string): Promise<DispatchResponseDTO> {
    return this.transition(dto.dispatchId, 'markInTransit', (e) => e.markInTransit(), actorId);
  }
  async complete(dto: CompleteDispatchRequestDTO, actorId?: string): Promise<DispatchResponseDTO> {
    return this.transition(dto.dispatchId, 'complete', (e) => e.markDelivered(), actorId);
  }
  async fail(dto: FailDispatchRequestDTO, actorId?: string): Promise<DispatchResponseDTO> {
    return this.transition(dto.dispatchId, 'fail', (e) => e.fail(dto.reason), actorId);
  }
  async markReturned(dto: ReturnDispatchRequestDTO, actorId?: string): Promise<DispatchResponseDTO> {
    return this.transition(dto.dispatchId, 'markReturned', (e) => e.markReturned(dto.reason), actorId);
  }
  async cancel(dto: CancelDispatchRequestDTO, actorId?: string): Promise<DispatchResponseDTO> {
    return this.transition(dto.dispatchId, 'cancel', (e) => e.cancel(dto.reason), actorId);
  }

  async getById(dispatchId: string): Promise<DispatchResponseDTO> {
    return DispatchMapper.toResponse(await this.load(dispatchId));
  }

  async getByNumber(dispatchNumber: string): Promise<DispatchResponseDTO> {
    const vo = DispatchNumberVO.create(dispatchNumber);
    const d = await this.repo.findByNumber(vo);
    if (!d) throw new DispatchNotFoundApplicationError(dispatchNumber);
    return DispatchMapper.toResponse(d);
  }

  async list(options: DispatchListOptionsDTO): Promise<DispatchListResponseDTO> {
    const r = await this.repo.findPaginated({
      page: options.page, limit: options.limit,
      sortBy: options.sortBy, sortDir: options.sortDir, filter: options.filter,
    });
    return DispatchMapper.toListResponse(r.items, r.total, r.page, r.limit);
  }

  private async load(id: string): Promise<DispatchEntity> {
    const vo = DispatchIdVO.create(id);
    const e = await this.repo.findByIdVO(vo);
    if (!e) throw new DispatchNotFoundApplicationError(id);
    return e;
  }

  private async transition(
    id: string, op: string,
    mutate: (e: DispatchEntity) => void, actorId?: string,
  ): Promise<DispatchResponseDTO> {
    const e = await this.load(id);
    try { mutate(e); } catch (err) {
      throw new DispatchOperationFailedApplicationError(op, err instanceof Error ? err.message : 'unknown', id);
    }
    const saved = await this.repo.save(e);
    this.logger.log(`Dispatch ${saved.id} ${op} by ${actorId ?? 'system'}`);
    return DispatchMapper.toResponse(saved);
  }
}
