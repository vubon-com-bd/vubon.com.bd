/**
 * PreferenceService
 * @module notification-service/application/services/impl
 *
 * Real business logic:
 *  - Preference entity ops (opt-out/in, quiet hours, lock)
 *  - CanUnsubscribeSpecification for validation
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  PREFERENCE_REPOSITORY,
  type PreferenceRepository,
  type PreferenceListOptions,
} from '@domain/repositories/preference.repository.interface.js';
import { PreferenceEntity } from '@domain/entities/preference.entity.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { PreferenceVO } from '@domain/value-objects/composites/preference.vo.js';
import { CanUnsubscribeSpecification } from '@domain/specifications/can-unsubscribe.specification.js';
import { NOTIFICATION_PREFERENCE_DEFAULT } from '@vubon/shared-constants/platform';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { PreferenceMapper } from '@application/mappers/preference.mapper.js';
import {
  PreferenceNotFoundApplicationError,
  PreferenceValidationError,
  PreferenceUpdateError,
} from '@application/errors/preference.errors.js';

import type {
  IPreferenceService,
  PreferenceListOptionsDTO,
  PreferenceListResponseDTO,
} from '@application/services/interfaces/preference.service.interface.js';
import type {
  UpdatePreferenceRequestDTO,
  BulkUpdatePreferenceRequestDTO,
  UnsubscribeRequestDTO,
} from '@application/dtos/requests/preference/index.js';
import type {
  PreferenceResponseDTO,
  PreferenceMatrixResponseDTO,
  PreferenceDefaultsResponseDTO,
} from '@application/dtos/responses/preference-response.dto.js';

@Injectable()
export class PreferenceService implements IPreferenceService {
  private readonly logger = new Logger(PreferenceService.name);

  constructor(
    @Inject(PREFERENCE_REPOSITORY)
    private readonly repo: PreferenceRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async update(
    dto: UpdatePreferenceRequestDTO,
    actorId?: string,
  ): Promise<PreferenceResponseDTO> {
    const entity = await this.loadOrCreate(dto.userId);
    const now = new Date().toISOString();

    try {
      if (dto.quietHoursEnabled !== undefined) {
        entity.changeQuietHours(
          dto.quietHoursEnabled,
          dto.quietHoursStart,
          dto.quietHoursEnd,
          now,
        );
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new PreferenceUpdateError(dto.userId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Preference ${saved.id} updated for user=${dto.userId} by=${actorId ?? 'system'}`);
    return PreferenceMapper.toResponse(saved);
  }

  async bulkUpdate(
    dto: BulkUpdatePreferenceRequestDTO,
    actorId?: string,
  ): Promise<{ readonly updated: number; readonly failed: number }> {
    let updated = 0;
    let failed = 0;

    for (const userId of dto.userIds) {
      try {
        await this.update(
          {
            userId,
            ...dto.updates,
          } as UpdatePreferenceRequestDTO,
          actorId,
        );
        updated++;
      } catch (e) {
        failed++;
        const msg = e instanceof Error ? e.message : 'Unknown';
        this.logger.warn(`Bulk preference update failed for user=${userId}: ${msg}`);
      }
    }

    this.logger.log(
      `Bulk preference update: requested=${dto.userIds.length} updated=${updated} failed=${failed}`,
    );
    return { updated, failed };
  }

  async unsubscribe(
    dto: UnsubscribeRequestDTO,
    actorId?: string,
  ): Promise<PreferenceResponseDTO> {
    if (!dto.userId) {
      throw new PreferenceValidationError('userId required for unsubscribe', 'userId');
    }

    const entity = await this.loadOrCreate(dto.userId);

    // Check spec
    const spec = new CanUnsubscribeSpecification();
    const check = spec.explain({
      preference: entity,
      ctx: { channel: dto.channel, category: dto.category },
    });
    if (check) {
      throw new PreferenceValidationError(check, 'channel');
    }

    const now = new Date().toISOString();
    entity.optOut(dto.channel, dto.category, now);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`User ${dto.userId} unsubscribed from ${dto.channel} by ${actorId ?? 'system'}`);
    return PreferenceMapper.toResponse(saved);
  }

  async getByUser(userId: string): Promise<PreferenceResponseDTO> {
    const entity = await this.loadOrCreate(userId);
    return PreferenceMapper.toResponse(entity);
  }

  async getMatrix(userId: string): Promise<PreferenceMatrixResponseDTO> {
    const entity = await this.loadOrCreate(userId);
    return PreferenceMapper.toMatrixResponse(entity);
  }

  async getDefaults(): Promise<PreferenceDefaultsResponseDTO> {
    return {
      email: NOTIFICATION_PREFERENCE_DEFAULT.EMAIL,
      sms: NOTIFICATION_PREFERENCE_DEFAULT.SMS,
      push: NOTIFICATION_PREFERENCE_DEFAULT.PUSH,
      inApp: NOTIFICATION_PREFERENCE_DEFAULT.IN_APP,
      webhook: NOTIFICATION_PREFERENCE_DEFAULT.WEBHOOK,
      whatsapp: NOTIFICATION_PREFERENCE_DEFAULT.WHATSAPP,
      frequency: 'instant' as never,
    };
  }

  async list(options: PreferenceListOptionsDTO): Promise<PreferenceListResponseDTO> {
    const result = await this.repo.findPaginated(options as PreferenceListOptions);
    return {
      items: result.items.map((e) => PreferenceMapper.toResponse(e)),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: Math.ceil(result.total / result.limit),
    };
  }

  private async loadOrCreate(userId: string): Promise<PreferenceEntity> {
    const existing = await this.repo.findByUser(userId);
    if (existing) return existing;

    // ─── Auto-create default preference ───
    const now = new Date().toISOString();
    const id = randomUUID();

    const idVO = PreferenceIdVO.create(id);
    const userVO = UserIdVO.create(userId);
    const typeVO = PreferenceTypeVO.create('opt_in');

    // Default channel-level options
    const channels = ['email', 'sms', 'push', 'in_app', 'webhook', 'whatsapp'] as const;
    const defaultEnabled: Record<string, boolean> = {
      email: NOTIFICATION_PREFERENCE_DEFAULT.EMAIL,
      sms: NOTIFICATION_PREFERENCE_DEFAULT.SMS,
      push: NOTIFICATION_PREFERENCE_DEFAULT.PUSH,
      in_app: NOTIFICATION_PREFERENCE_DEFAULT.IN_APP,
      webhook: NOTIFICATION_PREFERENCE_DEFAULT.WEBHOOK,
      whatsapp: NOTIFICATION_PREFERENCE_DEFAULT.WHATSAPP,
    };

    const options = channels.map((ch) =>
      PreferenceOptionVO.create({
        channel: ch as never,
        enabled: defaultEnabled[ch] ?? false,
      }),
    );

    const vo = PreferenceVO.create({
      id: idVO,
      userId: userVO,
      type: typeVO,
      options,
      quietHoursEnabled: false,
      timezone: 'Asia/Dhaka',
      locale: 'en',
      locked: false,
    });

    const entity = PreferenceEntity.create({ id: idVO, vo, now });
    const saved = await this.repo.save(entity);
    this.logger.log(`Preference auto-created for user=${userId}`);
    return saved;
  }
}
