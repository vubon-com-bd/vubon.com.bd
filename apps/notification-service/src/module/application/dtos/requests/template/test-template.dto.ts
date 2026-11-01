/**
 * Test Notification Template Request DTO
 * @module notification-service/application/dtos/requests/template
 */
import type { TestNotificationTemplateRequestSchemaType } from '@vubon/shared-schemas/platform';

export type TestTemplateRequestDTO = TestNotificationTemplateRequestSchemaType;

export interface TestTemplateCommandDTO extends TestTemplateRequestDTO {
  readonly actorId?: string;
}
