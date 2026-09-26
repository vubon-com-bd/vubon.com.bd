import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { SessionEntity } from '../../../domain/entities/session.entity';
import { SessionIdVO } from '../../../domain/value-objects/primitives/session-id.vo';
import { SessionAnalyzerService } from '../../../domain/services/session-analyzer.service';
import type { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import type { SessionServiceInterface } from '../interfaces/session.service.interface';
import type { GetSessionDTO, AnalyzeSessionDTO } from '../../dtos/requests/session';
import {
  type SessionResponseDTO,
  toSessionResponse,
} from '../../dtos/responses';

@Injectable()
export class SessionService
  extends BaseService<SessionEntity, SessionIdVO>
  implements SessionServiceInterface
{
  readonly name = 'SessionService';

  constructor(
    private readonly sessionRepo: SessionRepository,
    private readonly analyzer: SessionAnalyzerService,
  ) {
    super();
  }

  async getSession(input: GetSessionDTO): Promise<SessionResponseDTO> {
    const entity = await this.sessionRepo.findById(SessionIdVO.create(input.sessionId));
    if (!entity) throw new Error(`Session not found: ${input.sessionId}`);
    return toSessionResponse(entity);
  }

  async analyze(input: AnalyzeSessionDTO): Promise<{
    readonly totalSessions: number;
    readonly bounceRate: number;
    readonly avgDurationSeconds: number;
    readonly avgPagesPerSession: number;
  }> {
    const sessions = await this.sessionRepo.findInWindow(
      new Date(input.fromDate).getTime(),
      new Date(input.toDate).getTime(),
    );
    return this.analyzer.analyze(sessions);
  }
}
