/**
 * Test Webhook Request DTO
 * @module notification-service/application/dtos/requests/webhook
 */
import type { TestWebhookRequestSchemaType } from '@vubon/shared-schemas/platform';

export type TestWebhookRequestDTO = TestWebhookRequestSchemaType;

export interface TestWebhookCommandDTO extends TestWebhookRequestDTO {
  readonly actorId?: string;
}
