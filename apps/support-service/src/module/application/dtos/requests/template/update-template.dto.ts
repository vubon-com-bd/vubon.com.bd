/**
 * UpdateTemplateRequestDTO
 * @module support-service/application/dtos/requests/template
 */
export interface UpdateTemplateRequestDTO {
  readonly templateId: string;
  readonly name?: string;
  readonly subject?: string;
  readonly body?: string;
}
