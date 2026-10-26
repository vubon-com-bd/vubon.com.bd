import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';
import { InvalidWebhookUrlError } from '@domain/errors/webhook.errors.js';

describe('WebhookUrlVO', () => {
  it('accepts valid https URL', () => {
    const vo = WebhookUrlVO.create('https://example.com/hook');
    expect(vo.value).toBe('https://example.com/hook');
    expect(vo.isHttps).toBe(true);
    expect(vo.hostname).toBe('example.com');
  });

  it('accepts http://localhost', () => {
    expect(() => WebhookUrlVO.create('http://localhost:3000/hook')).not.toThrow();
  });

  it('rejects http:// for non-localhost', () => {
    expect(() => WebhookUrlVO.create('http://example.com/hook')).toThrow(InvalidWebhookUrlError);
  });

  it('rejects empty', () => {
    expect(() => WebhookUrlVO.create('')).toThrow(InvalidWebhookUrlError);
  });

  it('rejects non-URL string', () => {
    expect(() => WebhookUrlVO.create('not-a-url')).toThrow(InvalidWebhookUrlError);
  });

  it('rejects >2048 chars', () => {
    expect(() =>
      WebhookUrlVO.create('https://example.com/' + 'a'.repeat(2100)),
    ).toThrow(InvalidWebhookUrlError);
  });

  it('rejects ftp protocol', () => {
    expect(() => WebhookUrlVO.create('ftp://example.com/hook')).toThrow(InvalidWebhookUrlError);
  });

  it('reconstitute skips validation', () => {
    const vo = WebhookUrlVO.reconstitute('http://example.com');
    expect(vo.value).toBe('http://example.com');
  });
});
