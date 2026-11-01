import { WebhookTypeVO } from '@domain/primitives/webhook-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('WebhookTypeVO', () => {
  it('accepts incoming', () => {
    expect(WebhookTypeVO.create('incoming').value).toBe('incoming');
  });

  it('accepts outgoing', () => {
    expect(WebhookTypeVO.create('outgoing').value).toBe('outgoing');
  });

  it('normalizes case', () => {
    expect(WebhookTypeVO.create('INCOMING').value).toBe('incoming');
  });

  it('rejects invalid', () => {
    expect(() => WebhookTypeVO.create('bidirectional')).toThrow(ValidationError);
  });

  it('rejects non-string', () => {
    expect(() => WebhookTypeVO.create(1 as any)).toThrow(ValidationError);
  });

  it('isIncoming / isOutgoing', () => {
    expect(WebhookTypeVO.create('incoming').isIncoming()).toBe(true);
    expect(WebhookTypeVO.create('incoming').isOutgoing()).toBe(false);
    expect(WebhookTypeVO.create('outgoing').isOutgoing()).toBe(true);
  });
});
