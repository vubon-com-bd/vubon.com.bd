import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  INSURANCE_REPOSITORY,
  type InsuranceRepository,
} from '@domain/repositories/insurance.repository.interface';
import { InsuranceEntity } from '@domain/entities/insurance.entity';
import { InsuranceIdVO } from '@domain/primitives/insurance-id.vo';
import { InsuranceTypeVO } from '@domain/primitives/insurance-type.vo';
import { InsuranceCoverageVO } from '@domain/primitives/insurance-coverage.vo';

import { InsuranceMapper } from '@application/mappers/insurance/insurance.mapper';
import { InsuranceValidator } from '@application/validators/insurance/insurance.validator';

import {
  INSURANCE_SERVICE,
  type IInsuranceService,
  type InsuranceListOptionsDTO,
} from '@application/services/interfaces/insurance.service.interface';

import type {
  InsuranceResponseDTO,
  InsuranceListResponseDTO,
  InsuranceStatsResponseDTO,
} from '@application/dtos/responses/insurance/index.js';

import type {
  CreateInsuranceRequestDTO,
  InsuranceActionRequestDTO,
  CancelInsuranceRequestDTO,
  SubmitClaimRequestDTO,
  ReviewClaimRequestDTO,
  ApproveClaimRequestDTO,
  RejectClaimRequestDTO,
  PayClaimRequestDTO,
} from '@application/dtos/requests/insurance/index.js';

import {
  InsuranceNotFoundApplicationError,
  InsuranceByPolicyNotFoundError,
  CreateInsuranceError,
  InsuranceAlreadyExistsError,
  InsuranceOperationError,
} from '@application/errors/insurance.errors';

export interface IInsuranceEventBridge {
  publishFromEntity(entity: InsuranceEntity): Promise<void>;
}
export const INSURANCE_EVENT_BRIDGE = Symbol('INSURANCE_EVENT_BRIDGE');

@Injectable()
export class InsuranceService implements IInsuranceService {
  private readonly logger = new Logger(InsuranceService.name);

  constructor(
    @Inject(INSURANCE_REPOSITORY)
    private readonly repo: InsuranceRepository,
    @Inject(INSURANCE_EVENT_BRIDGE)
    private readonly eventBridge: IInsuranceEventBridge,
  ) {}

  async create(dto: CreateInsuranceRequestDTO, actorId: string): Promise<InsuranceResponseDTO> {
    this.logger.log(`create insurance`);
    try {
      const v = InsuranceValidator.validateCreate(dto);
      const now = new Date().toISOString();
      const typeVO = InsuranceTypeVO.create(v.type);
      const premium = typeVO.calculatePremium(v.declaredValue);
      const policyNumber = await this.generatePolicyNumber();

      const entity = InsuranceEntity.create({
        id: InsuranceIdVO.create(randomUUID()),
        now,
        props: {
          policyNumber,
          shipmentId: v.shipmentId,
          orderId: v.orderId,
          userId: v.userId,
          type: typeVO,
          coverages: InsuranceCoverageVO.create(v.coverages),
          declaredValue: v.declaredValue,
          premium,
          currency: v.currency,
          startsAt: v.startsAt,
          expiresAt: v.expiresAt,
          provider: v.provider,
          notes: v.notes,
        },
      });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return InsuranceMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async activate(dto: InsuranceActionRequestDTO, actorId: string): Promise<InsuranceResponseDTO> {
    const v = InsuranceValidator.validateAction(dto);
    const entity = await this.loadEntity(v.insuranceId);
    entity.activate();
    return this.persistAndPublish(entity);
  }
  async expire(dto: InsuranceActionRequestDTO, actorId: string): Promise<InsuranceResponseDTO> {
    const v = InsuranceValidator.validateAction(dto);
    const entity = await this.loadEntity(v.insuranceId);
    entity.expire();
    return this.persistAndPublish(entity);
  }
  async cancel(dto: CancelInsuranceRequestDTO, actorId: string): Promise<InsuranceResponseDTO> {
    const v = InsuranceValidator.validateCancel(dto);
    const entity = await this.loadEntity(v.insuranceId);
    entity.cancel(v.reason);
    return this.persistAndPublish(entity);
  }

  async submitClaim(dto: SubmitClaimRequestDTO, actorId: string): Promise<InsuranceResponseDTO> {
    const v = InsuranceValidator.validateSubmitClaim(dto);
    const entity = await this.loadEntity(v.insuranceId);
    entity.submitClaim({
      claimId: v.claimId,
      claimNumber: v.claimNumber,
      reason: v.reason,
      description: v.description,
      images: v.images,
      amount: v.amount,
    });
    return this.persistAndPublish(entity);
  }
  async reviewClaim(dto: ReviewClaimRequestDTO, actorId: string): Promise<InsuranceResponseDTO> {
    const v = InsuranceValidator.validateReviewClaim(dto);
    const entity = await this.loadEntity(v.insuranceId);
    entity.reviewClaim(v.claimId);
    return this.persistAndPublish(entity);
  }
  async approveClaim(dto: ApproveClaimRequestDTO, actorId: string): Promise<InsuranceResponseDTO> {
    const v = InsuranceValidator.validateApproveClaim(dto);
    const entity = await this.loadEntity(v.insuranceId);
    entity.approveClaim(v.claimId, v.approvedAmount);
    return this.persistAndPublish(entity);
  }
  async rejectClaim(dto: RejectClaimRequestDTO, actorId: string): Promise<InsuranceResponseDTO> {
    const v = InsuranceValidator.validateRejectClaim(dto);
    const entity = await this.loadEntity(v.insuranceId);
    entity.rejectClaim(v.claimId, v.reason);
    return this.persistAndPublish(entity);
  }
  async payClaim(dto: PayClaimRequestDTO, actorId: string): Promise<InsuranceResponseDTO> {
    const v = InsuranceValidator.validatePayClaim(dto);
    const entity = await this.loadEntity(v.insuranceId);
    entity.payClaim(v.claimId);
    return this.persistAndPublish(entity);
  }

  async getById(id: string): Promise<InsuranceResponseDTO> {
    const entity = await this.loadEntity(id);
    return InsuranceMapper.toResponse(entity);
  }
  async getByPolicyNumber(policy: string): Promise<InsuranceResponseDTO> {
    const entity = await this.repo.findByPolicyNumber(policy);
    if (!entity) throw new InsuranceByPolicyNotFoundError(policy);
    return InsuranceMapper.toResponse(entity);
  }
  async getByShipmentId(shipmentId: string): Promise<InsuranceResponseDTO> {
    const entity = await this.repo.findByShipmentId(shipmentId);
    if (!entity) throw new InsuranceNotFoundApplicationError(`shipment:${shipmentId}`);
    return InsuranceMapper.toResponse(entity);
  }
  async list(options: InsuranceListOptionsDTO): Promise<InsuranceListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return InsuranceMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }
  async listByOrder(orderId: string): Promise<InsuranceListResponseDTO> {
    const items = await this.repo.findByOrderId(orderId);
    return InsuranceMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByUser(userId: string): Promise<InsuranceListResponseDTO> {
    const items = await this.repo.findByUserId(userId);
    return InsuranceMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listClaimable(): Promise<InsuranceListResponseDTO> {
    const items = await this.repo.findClaimable();
    return InsuranceMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listExpiringWithinDays(days: number): Promise<InsuranceListResponseDTO> {
    const items = await this.repo.findExpiringWithinDays(days);
    return InsuranceMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async getStats(): Promise<InsuranceStatsResponseDTO> {
    const stats = await this.repo.getStats();
    return InsuranceMapper.toStatsResponse(stats);
  }

  private async generatePolicyNumber(): Promise<string> {
    for (let i = 0; i < 5; i++) {
      const candidate = `INS${Date.now().toString().slice(-10)}${Math.random().toString(36).slice(2, 4).toUpperCase()}`;
      if (!(await this.repo.existsByPolicyNumber(candidate))) return candidate;
    }
    throw new InsuranceOperationError('generatePolicyNumber', '5 attempts failed');
  }
  private async loadEntity(id: string): Promise<InsuranceEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new InsuranceNotFoundApplicationError(id);
    return entity;
  }
  private async persistAndPublish(entity: InsuranceEntity): Promise<InsuranceResponseDTO> {
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return InsuranceMapper.toResponse(saved);
  }
  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreateInsuranceError(err.message);
      return new InsuranceOperationError(op, err.message);
    }
    return new InsuranceOperationError(op, String(err));
  }
}
