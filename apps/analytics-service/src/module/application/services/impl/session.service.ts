/**
 * Session Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import type { SessionEntity } from '../../../domain/entities/session.entity.js';
import { SessionEntity as SessionEntityClass } from '../../../domain/entities/session.entity.js';
import type { SessionRepository } from '../../../domain/repositories/session.repository.interface.js';
import { SessionIdVO } from '../../../domain/value-objects/primitives/session-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { EventTimestampVO } from '../../../domain/value-objects/primitives/event-timestamp.vo.js';
import type { ISessionService } from '../interfaces/session.service.interface.js';
import type { SessionResponseData } from '../../dtos/responses/session-response.dto.js';

export class SessionService extends BaseService<SessionEntity, string> implements ISessionService {
  readonly name = 'SessionService';

  constructor(private readonly repository: SessionRepository) {
    super();
  }

  async findById(id: string): Promise<SessionResponseData | null> {
    const entity = await this.repository.findById(id);
    return entity ? this.toResponse(entity) : null;
  }

  async findByUser(userId: string): Promise<readonly SessionResponseData[]> {
    const entities = await this.repository.findByUser(UserIdVO.create(userId));
    return entities.map((e) => this.toResponse(e));
  }

  async end(id: string): Promise<SessionResponseData> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new ApplicationNotFoundError('Session', id);
    if (entity.isCompleted()) return this.toResponse(entity);

    entity.end(EventTimestampVO.now(), new Date().toISOString());
    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  async buildFromEvents(eventIds: readonly string[]): Promise<SessionResponseData> {
    const now = new Date().toISOString();
    const entity = SessionEntityClass.start({
      id: SessionIdVO.create(`sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`),
      startedAt: EventTimestampVO.now(),
      now,
    });

    for (let i = 0; i < eventIds.length; i++) {
      entity.trackEvent(i % 3 === 0);
    }

    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  private toResponse(entity: SessionEntity): SessionResponseData {
    return {
      id: entity.id,
      userId: entity.userId?.value,
      device: entity.device?.value,
      startedAt: entity.startedAt.toISOString(),
      endedAt: entity.endedAt?.toISOString(),
      durationSeconds: entity.durationSeconds(),
      eventCount: entity.eventCount,
      pageViewCount: entity.pageViewCount,
      isBounce: entity.isBounce(),
      isEngaged: entity.isEngaged(),
      isAnonymous: entity.isAnonymous(),
    };
  }
}
