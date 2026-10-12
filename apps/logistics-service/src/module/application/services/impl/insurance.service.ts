/**
 * InsuranceService — orchestrates policy lifecycle + claim handling
 * @module logistics-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { IInsuranceService, InsuranceListOptionsDTO } from '../interfaces/insurance.service.interface.js';
import { INSURANCE_REPOSITORY, type InsuranceRepository } from '../../../domain/repositories/insurance.repository.interface.js';
import { InsuranceEntity } from '../../../domain/entities/insurance.entity.js';
import { InsuranceIdVO } from '../../../domain/value-objects/primitives/insurance-id.vo.js';
import { PolicyNumberVO } from '../../../domain/value-objects/primitives/policy-number.vo.js';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { InsuranceTypeVO } from '../../../domain/value-objects/primitives/insurance-type.vo.js';
import { InsuranceCoverageVO } from '../../../domain/value-objects/primitives/insurance-coverage.vo.js';
import { DeclaredValueVO } from '../../../domain/value-objects/primitives/declared-value.vo.js';
import { ReasonTextVO } from '../../../domain/value-objects/primitives/reason-text.vo.js';
import { DescriptionTextVO } from '../../../domain/value-objects/primitives/description-text.vo.js';

import { InsuranceMapper } from '../../mappers/insurance.mapper.js';
import {
  InsuranceNotFoundApplicationError,
  InsuranceOperationFailedApplicationError,
} from '../../errors/insurance.errors.js';

import type {
  PurchaseInsuranceRequestDTO, FileClaimRequestDTO, StartClaimReviewRequestDTO,
  ApproveClaimRequestDTO, RejectClaimRequestDTO, PayClaimRequestDTO, AppealClaimRequestDTO,
  ActivateInsuranceRequestDTO, ExpireInsuranceRequestDTO, CancelInsuranceRequestDTO,
} from '../../dtos/requests/insurance/insurance.dto.js';
import type { InsuranceResponseDTO, InsuranceListResponseDTO } from '../../dtos/responses/insurance/insurance-response.dto.js';

@Injectable()
export class InsuranceService implements IInsuranceService {
  private readonly logger = new Logger(InsuranceService.name);

  constructor(@Inject(INSURANCE_REPOSITORY) private readonly repo: InsuranceRepository) {}

  async purchase(dto: PurchaseInsuranceRequestDTO, actorId?: string): Promise<InsuranceResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();
    let entity: InsuranceEntity;
    try {
      entity = InsuranceEntity.create({
        id, now,
        props: {
          shipmentId: dto.shipmentId ? ShipmentIdVO.create(dto.shipmentId) : undefined,
          orderId: dto.orderId ? OrderIdVO.create(dto.orderId) : undefined,
          userId: dto.userId ? UserIdVO.create(dto.userId) : undefined,
          type: InsuranceTypeVO.create(dto.type),
          coverages: dto.coverages.map((c) => InsuranceCoverageVO.create(c)),
          declaredValue: DeclaredValueVO.create(dto.declaredValue, dto.currency),
          startsAt: dto.startsAt,
          expiresAt: dto.expiresAt,
        },
      });
    } catch (e) {
      throw new InsuranceOperationFailedApplicationError('purchase', e instanceof Error ? e.message : 'unknown');
    }
    const saved = await this.repo.save(entity);
    this.logger.log(`Insurance ${saved.id} issued by ${actorId ?? 'system'} (policy ${saved.policyNumber.value})`);
    return InsuranceMapper.toResponse(saved);
  }

  async activate(dto: ActivateInsuranceRequestDTO, actorId?: string): Promise<InsuranceResponseDTO> {
    return this.transition(dto.insuranceId, 'activate', (e) => e.activate(), actorId);
  }

  async expire(dto: ExpireInsuranceRequestDTO, actorId?: string): Promise<InsuranceResponseDTO> {
    return this.transition(dto.insuranceId, 'expire', (e) => e.expire(), actorId);
  }

  async cancel(dto: CancelInsuranceRequestDTO, actorId?: string): Promise<InsuranceResponseDTO> {
    return this.transition(dto.insuranceId, 'cancel', (e) => e.cancel(dto.reason), actorId);
  }

  async fileClaim(dto: FileClaimRequestDTO, actorId?: string): Promise<InsuranceResponseDTO> {
    const entity = await this.load(dto.insuranceId);
    try {
      entity.fileClaim({
        id: randomUUID(),
        claimNumber: `CLM-${Date.now()}`,
        reason: ReasonTextVO.create(dto.reason),
        amount: dto.amount,
        currency: dto.currency,
        description: dto.description ? DescriptionTextVO.create(dto.description) : undefined,
        images: (dto.images ?? []) as never,
      });
    } catch (e) {
      throw new InsuranceOperationFailedApplicationError('fileClaim', e instanceof Error ? e.message : 'unknown', dto.insuranceId);
    }
    const saved = await this.repo.save(entity);
    this.logger.log(`Insurance ${saved.id} claim filed by ${actorId ?? 'system'}`);
    return InsuranceMapper.toResponse(saved);
  }

  async startClaimReview(dto: StartClaimReviewRequestDTO, actorId?: string): Promise<InsuranceResponseDTO> {
    return this.transition(dto.insuranceId, 'startClaimReview', (e) => e.startClaimReview(), actorId);
  }

  async approveClaim(dto: ApproveClaimRequestDTO, actorId?: string): Promise<InsuranceResponseDTO> {
    return this.transition(dto.insuranceId, 'approveClaim', (e) => e.approveClaim(dto.approvedAmount), actorId);
  }

  async rejectClaim(dto: RejectClaimRequestDTO, actorId?: string): Promise<InsuranceResponseDTO> {
    return this.transition(dto.insuranceId, 'rejectClaim', (e) => e.rejectClaim(dto.reason), actorId);
  }

  async payClaim(dto: PayClaimRequestDTO, actorId?: string): Promise<InsuranceResponseDTO> {
    return this.transition(dto.insuranceId, 'payClaim', (e) => e.payClaim(), actorId);
  }

  async appealClaim(dto: AppealClaimRequestDTO, actorId?: string): Promise<InsuranceResponseDTO> {
    return this.transition(dto.insuranceId, 'appealClaim', (e) => e.appealClaim(dto.reason), actorId);
  }

  async getById(insuranceId: string): Promise<InsuranceResponseDTO> {
    return InsuranceMapper.toResponse(await this.load(insuranceId));
  }

  async getByPolicyNumber(policyNumber: string): Promise<InsuranceResponseDTO> {
    const vo = PolicyNumberVO.create(policyNumber);
    const i = await this.repo.findByPolicyNumber(vo);
    if (!i) throw new InsuranceNotFoundApplicationError(policyNumber);
    return InsuranceMapper.toResponse(i);
  }

  async getByShipmentId(shipmentId: string): Promise<InsuranceResponseDTO | null> {
    const vo = ShipmentIdVO.create(shipmentId);
    const i = await this.repo.findByShipmentId(vo);
    return i ? InsuranceMapper.toResponse(i) : null;
  }

  async list(options: InsuranceListOptionsDTO): Promise<InsuranceListResponseDTO> {
    const r = await this.repo.findPaginated({
      page: options.page, limit: options.limit,
      sortBy: options.sortBy, sortDir: options.sortDir, filter: options.filter,
    });
    return InsuranceMapper.toListResponse(r.items, r.total, r.page, r.limit);
  }

  private async load(id: string): Promise<InsuranceEntity> {
    const vo = InsuranceIdVO.create(id);
    const e = await this.repo.findByIdVO(vo);
    if (!e) throw new InsuranceNotFoundApplicationError(id);
    return e;
  }

  private async transition(
    id: string, op: string,
    mutate: (e: InsuranceEntity) => void, actorId?: string,
  ): Promise<InsuranceResponseDTO> {
    const e = await this.load(id);
    try { mutate(e); } catch (err) {
      throw new InsuranceOperationFailedApplicationError(op, err instanceof Error ? err.message : 'unknown', id);
    }
    const saved = await this.repo.save(e);
    this.logger.log(`Insurance ${saved.id} ${op} by ${actorId ?? 'system'}`);
    return InsuranceMapper.toResponse(saved);
  }
}
