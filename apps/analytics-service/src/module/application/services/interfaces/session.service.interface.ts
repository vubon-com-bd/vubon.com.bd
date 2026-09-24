import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SessionEntity } from '../../../domain/entities/session.entity';
import type { SessionIdVO } from '../../../domain/value-objects/primitives/session-id.vo';
import type { GetSessionDTO, AnalyzeSessionDTO } from '../../dtos/requests/session';
import type { SessionResponseDTO } from '../../dtos/responses';

export interface SessionServiceInterface
  extends BaseServiceInterface<SessionEntity, SessionIdVO> {
  getSession(input: GetSessionDTO): Promise<SessionResponseDTO>;
  analyze(input: AnalyzeSessionDTO): Promise<{
    readonly totalSessions: number;
    readonly bounceRate: number;
    readonly avgDurationSeconds: number;
    readonly avgPagesPerSession: number;
  }>;
}
