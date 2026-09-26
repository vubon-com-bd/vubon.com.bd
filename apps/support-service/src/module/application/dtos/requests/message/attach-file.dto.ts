/**
 * AttachFileRequestDTO
 * @module support-service/application/dtos/requests/message
 */
export interface AttachFileRequestDTO {
  readonly messageId: string;
  readonly attachments: readonly string[];
}
