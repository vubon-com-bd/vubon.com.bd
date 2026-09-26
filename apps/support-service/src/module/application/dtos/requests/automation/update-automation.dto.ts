/**
 * UpdateAutomationRequestDTO
 * @module support-service/application/dtos/requests/automation
 */
export interface UpdateAutomationRequestDTO {
  readonly automationId: string;
  readonly name?: string;
  readonly description?: string;
  readonly steps?: readonly Readonly<Record<string, unknown>>[];
}
