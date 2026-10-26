import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('WebhookIdVO', () => {
  it('accepts valid UUID', () => {
    expect(WebhookIdVO.create(IDS.webhookId).value).toBe(IDS.webhookId);
  });
  it('rejects empty', () => {
    expect(() => WebhookIdVO.create('')).toThrow(ValidationError);
  });
  it('rejects non-UUID', () => {
    expect(() => WebhookIdVO.create('not-a-uuid')).toThrow(ValidationError);
  });
});
