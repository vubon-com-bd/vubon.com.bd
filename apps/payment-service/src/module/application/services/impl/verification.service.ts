/**
 * VerificationService
 * @module payment-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type {
  IVerificationService,
  InitiateVerificationInputDTO,
  VerifyCodeInputDTO,
} from '@application/services/interfaces/verification.service.interface.js';
import {
  VERIFICATION_REPOSITORY,
  type VerificationRepository,
} from '@domain/repositories/verification.repository.interface.js';
import { VerificationEntity } from '@domain/entities/verification.entity.js';
import { VerificationIdVO } from '@domain/primitives/verification-id.vo';
import { VerificationMethodVO } from '@domain/primitives/verification-method.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';

import type {
  VerificationResponseDTO,
  VerificationInitiateResponseDTO,
} from '@application/dtos/responses/verification-response.dto.js';

@Injectable()
export class VerificationService implements IVerificationService {
  private readonly logger = new Logger(VerificationService.name);

  constructor(
    @Inject(VERIFICATION_REPOSITORY)
    private readonly repo: VerificationRepository,
  ) {}

  async initiate(
    dto: InitiateVerificationInputDTO,
    actorId?: string,
  ): Promise<VerificationInitiateResponseDTO> {
    const now = new Date();
    const ttl = dto.ttlSeconds ?? 600;
    const expiresAt = new Date(now.getTime() + ttl * 1000).toISOString();
    const id = randomUUID();
    const entity = VerificationEntity.create({
      id: VerificationIdVO.create(id),
      now: now.toISOString(),
      props: {
        paymentId: PaymentIdVO.create(dto.paymentId),
        method: VerificationMethodVO.create(dto.method),
        expiresAt,
      },
    });
    const saved = await this.repo.save(entity);
    this.logger.log(`Verification ${saved.id} initiated by ${actorId ?? 'system'}`);
    return {
      success: true,
      verificationId: saved.id,
      status: saved.status.value,
      expiresAt: saved.expiresAt,
    };
  }

  async verify(
    dto: VerifyCodeInputDTO,
    actorId?: string,
  ): Promise<VerificationResponseDTO> {
    const entity = await this.load(dto.verificationId);
    entity.recordAttempt();
    entity.verify();
    const saved = await this.repo.save(entity);
    this.logger.log(`Verification ${saved.id} completed by ${actorId ?? 'system'}`);
    return this.toResponse(saved);
  }

  async getById(id: string): Promise<VerificationResponseDTO> {
    return this.toResponse(await this.load(id));
  }

  async listByPayment(paymentId: string): Promise<readonly VerificationResponseDTO[]> {
    const entities = await this.repo.findByPayment(paymentId);
    return entities.map((e) => this.toResponse(e));
  }

  private async load(id: string): Promise<VerificationEntity> {
    const vo = VerificationIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new Error(`Verification "${id}" not found`);
    return entity;
  }

  private toResponse(e: VerificationEntity): VerificationResponseDTO {
    return {
      id: e.id,
      paymentId: e.paymentId.value,
      status: e.status.value,
      method: e.method.value,
      attempts: e.attempts,
      expiresAt: e.expiresAt,
      verifiedAt: e.verifiedAt,
      failureReason: e.failureReason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
}
