import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AttachmentEntity } from '../entities/attachment.entity';
import { AttachmentIdVO } from '../value-objects/primitives/attachment-id.vo';
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';

export interface AttachmentRepository extends BaseRepository<AttachmentEntity, AttachmentIdVO> {
  findByMessage(messageId: MessageIdVO): Promise<readonly AttachmentEntity[]>;
}
