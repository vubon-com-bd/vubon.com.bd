import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { FeedbackEntity } from '../entities/feedback.entity';
import { FeedbackIdVO } from '../value-objects/primitives/feedback-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface FeedbackRepository extends BaseRepository<FeedbackEntity, FeedbackIdVO> {
  findByUser(userId: UserIdVO): Promise<readonly FeedbackEntity[]>;
  findPending(): Promise<readonly FeedbackEntity[]>;
}
