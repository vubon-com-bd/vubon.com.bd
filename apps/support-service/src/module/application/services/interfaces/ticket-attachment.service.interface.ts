import type { TicketAttachmentEntity } from '../../../domain/entities/ticket-attachment.entity';
import type { AttachmentIdVO } from '../../../domain/value-objects/primitives/attachment-id.vo';
import type { UploadAttachmentRequestDTO } from '../../dtos/requests/attachment';

export interface TicketAttachmentServiceInterface {
  upload(input: UploadAttachmentRequestDTO): Promise<{ id: string; url: string }>;
  findById(id: AttachmentIdVO): Promise<TicketAttachmentEntity | null>;
  delete(id: AttachmentIdVO): Promise<void>;
}
