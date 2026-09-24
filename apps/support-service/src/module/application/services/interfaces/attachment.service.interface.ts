import type { AttachmentEntity } from '../../../domain/entities/attachment.entity';
import type { AttachmentIdVO } from '../../../domain/value-objects/primitives/attachment-id.vo';
import type { UploadAttachmentRequestDTO } from '../../dtos/requests/attachment';

export interface AttachmentServiceInterface {
  upload(input: UploadAttachmentRequestDTO): Promise<{ id: string; url: string }>;
  findById(id: AttachmentIdVO): Promise<AttachmentEntity | null>;
  delete(id: AttachmentIdVO): Promise<void>;
}
