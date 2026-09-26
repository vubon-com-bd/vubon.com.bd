/**
 * MarkMessageReadRequestDTO
 * @module support-service/application/dtos/requests/message
 */
export interface MarkMessageReadRequestDTO {
  readonly messageId: string;
  readonly readerId: string;
}
