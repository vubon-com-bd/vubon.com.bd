/**
 * FeedbackRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { FeedbackEntity } from '../entities/feedback.entity';
import { FeedbackIdVO } from '../value-objects/primitives/feedback-id.vo';
import { FeedbackStatusVO } from '../value-objects/primitives/feedback-status.vo';
import { FeedbackTypeVO } from '../value-objects/primitives/feedback-type.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { TicketIdVO } from '../value-objects/primitives/ticket-id.vo';

export interface FeedbackRepository
  extends BaseRepository<FeedbackEntity, FeedbackIdVO> {
  findByUser(userId: UserIdVO): Promise<readonly FeedbackEntity[]>;
  findByTicket(ticketId: TicketIdVO): Promise<readonly FeedbackEntity[]>;
  findByStatus(status: FeedbackStatusVO): Promise<readonly FeedbackEntity[]>;
  findByType(type: FeedbackTypeVO): Promise<readonly FeedbackEntity[]>;
  findPending(): Promise<readonly FeedbackEntity[]>;
  findNeedingFollowup(): Promise<readonly FeedbackEntity[]>;
  averageRating(): Promise<number>;
}
