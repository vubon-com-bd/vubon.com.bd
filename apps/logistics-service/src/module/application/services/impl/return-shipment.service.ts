/**
 * ReturnShipmentService — orchestrates return lifecycle + refund
 * @module logistics-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { IReturnShipmentService, ReturnShipmentListOptionsDTO } from '../interfaces/return-shipment.service.interface.js';
import { RETURN_SHIPMENT_REPOSITORY, type ReturnShipmentRepository } from '../../../domain/repositories/return-shipment.repository.interface.js';
import { ReturnShipmentEntity } from '../../../domain/entities/return-shipment.entity.js';
import { ReturnShipmentIdVO } from '../../../domain/value-objects/primitives/return-shipment-id.vo.js';
import { RmaNumberVO } from '../../../domain/value-objects/primitives/rma-number.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { ReturnShipmentTypeVO } from '../../../domain/value-objects/primitives/return-shipment-type.vo.js';
import { ReturnReasonVO } from '../../../domain/value-objects/primitives/return-reason.vo.js';
import { RefundAmountVO } from '../../../domain/value-objects/primitives/refund-amount.vo.js';
import { DescriptionTextVO } from '../../../domain/value-objects/primitives/description-text.vo.js';
import { AddressDetailsVO } from '../../../domain/value-objects/composites/address-details.vo.js';

import { ReturnShipmentMapper } from '../../mappers/return-shipment.mapper.js';
import { ReturnShipmentNotFoundApplicationError, ReturnShipmentOperationFailedApplicationError } from '../../errors/return-shipment.errors.js';

import type {
  RequestReturnRequestDTO, ApproveReturnRequestDTO, RejectReturnRequestDTO,
  ScheduleReturnPickupRequestDTO, PickupReturnRequestDTO, MarkReturnInTransitRequestDTO,
  ReceiveReturnRequestDTO, InspectReturnRequestDTO, CompleteReturnRequestDTO,
  IssueRefundRequestDTO, CancelReturnRequestDTO, MarkReturnLostRequestDTO,
} from '../../dtos/requests/return-shipment/return-shipment.dto.js';
import type { ReturnShipmentResponseDTO, ReturnShipmentListResponseDTO } from '../../dtos/responses/return-shipment/return-shipment-response.dto.js';

@Injectable()
export class ReturnShipmentService implements IReturnShipmentService {
  private readonly logger = new Logger(ReturnShipmentService.name);

  constructor(@Inject(RETURN_SHIPMENT_REPOSITORY) private readonly repo: ReturnShipmentRepository) {}

  async request(dto: RequestReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO> {
    const now = new Date().toISOString();
    // Generate RMA with uniqueness loop
    let rmaVO: RmaNumberVO;
    let seq = Date.now() % 1000000;
    let attempts = 0;
    do {
      rmaVO = RmaNumberVO.generate(seq);
      seq++;
      attempts++;
    } while (await this.repo.existsByRma(rmaVO) && attempts < 5);

    const id = randomUUID();
    let entity: ReturnShipmentEntity;
    try {
      entity = ReturnShipmentEntity.request({
        id, now,
        props: {
          rmaNumber: rmaVO,
          orderId: OrderIdVO.create(dto.orderId),
          originalShipmentId: dto.originalShipmentId ? ShipmentIdVO.create(dto.originalShipmentId) : undefined,
          userId: UserIdVO.create(dto.userId),
          type: ReturnShipmentTypeVO.create(dto.type),
          reason: ReturnReasonVO.create(dto.reason),
          itemIds: dto.itemIds,
          description: dto.description ? DescriptionTextVO.create(dto.description) : undefined,
          images: dto.images ?? [],
          pickupAddress: AddressDetailsVO.create({ address: dto.pickupAddress }),
        },
      });
    } catch (e) {
      throw new ReturnShipmentOperationFailedApplicationError('request', e instanceof Error ? e.message : 'unknown');
    }
    const saved = await this.repo.save(entity);
    this.logger.log(`Return ${saved.id} requested by ${actorId ?? 'system'} (RMA ${rmaVO.value})`);
    return ReturnShipmentMapper.toResponse(saved);
  }

  async approve(dto: ApproveReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO> {
    return this.transition(dto.returnId, 'approve', (e) => e.approve(), actorId);
  }
  async reject(dto: RejectReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO> {
    return this.transition(dto.returnId, 'reject', (e) => e.reject(dto.reason), actorId);
  }
  async schedulePickup(dto: ScheduleReturnPickupRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO> {
    return this.transition(dto.returnId, 'schedulePickup', (e) => e.schedulePickup(dto.pickupAt), actorId);
  }
  async pickup(dto: PickupReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO> {
    return this.transition(dto.returnId, 'pickup', (e) => e.markPickedUp(dto.trackingNumber), actorId);
  }
  async markInTransit(dto: MarkReturnInTransitRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO> {
    return this.transition(dto.returnId, 'markInTransit', (e) => e.markInTransit(), actorId);
  }
  async receive(dto: ReceiveReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO> {
    return this.transition(dto.returnId, 'receive', (e) => e.markReceived(), actorId);
  }
  async inspect(dto: InspectReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO> {
    return this.transition(
      dto.returnId, 'inspect',
      (e) => e.inspect(UserIdVO.create(dto.inspectedBy), dto.restockable),
      actorId,
    );
  }
  async complete(dto: CompleteReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO> {
    return this.transition(dto.returnId, 'complete', (e) => e.complete(), actorId);
  }

  async issueRefund(dto: IssueRefundRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO> {
    const entity = await this.load(dto.returnId);
    try {
      const amount = RefundAmountVO.create(dto.amount, dto.currency);
      entity.issueRefund(amount, dto.restockFeePercent);
    } catch (e) {
      throw new ReturnShipmentOperationFailedApplicationError('issueRefund', e instanceof Error ? e.message : 'unknown', dto.returnId);
    }
    const saved = await this.repo.save(entity);
    this.logger.log(`Return ${saved.id} refund issued by ${actorId ?? 'system'}`);
    return ReturnShipmentMapper.toResponse(saved);
  }

  async cancel(dto: CancelReturnRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO> {
    return this.transition(dto.returnId, 'cancel', (e) => e.cancel(dto.reason), actorId);
  }

  async markLost(dto: MarkReturnLostRequestDTO, actorId?: string): Promise<ReturnShipmentResponseDTO> {
    return this.transition(dto.returnId, 'markLost', (e) => e.markLost(dto.reason), actorId);
  }

  async getById(returnId: string): Promise<ReturnShipmentResponseDTO> {
    return ReturnShipmentMapper.toResponse(await this.load(returnId));
  }

  async getByRma(rmaNumber: string): Promise<ReturnShipmentResponseDTO> {
    const vo = RmaNumberVO.create(rmaNumber);
    const r = await this.repo.findByRma(vo);
    if (!r) throw new ReturnShipmentNotFoundApplicationError(rmaNumber);
    return ReturnShipmentMapper.toResponse(r);
  }

  async list(options: ReturnShipmentListOptionsDTO): Promise<ReturnShipmentListResponseDTO> {
    const r = await this.repo.findPaginated({
      page: options.page, limit: options.limit,
      sortBy: options.sortBy, sortDir: options.sortDir, filter: options.filter,
    });
    return ReturnShipmentMapper.toListResponse(r.items, r.total, r.page, r.limit);
  }

  private async load(id: string): Promise<ReturnShipmentEntity> {
    const vo = ReturnShipmentIdVO.create(id);
    const e = await this.repo.findByIdVO(vo);
    if (!e) throw new ReturnShipmentNotFoundApplicationError(id);
    return e;
  }

  private async transition(
    id: string, op: string,
    mutate: (e: ReturnShipmentEntity) => void, actorId?: string,
  ): Promise<ReturnShipmentResponseDTO> {
    const e = await this.load(id);
    try { mutate(e); } catch (err) {
      throw new ReturnShipmentOperationFailedApplicationError(op, err instanceof Error ? err.message : 'unknown', id);
    }
    const saved = await this.repo.save(e);
    this.logger.log(`Return ${saved.id} ${op} by ${actorId ?? 'system'}`);
    return ReturnShipmentMapper.toResponse(saved);
  }
}
