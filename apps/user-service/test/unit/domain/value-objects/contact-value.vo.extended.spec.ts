import { ContactValueVO } from '@domain/value-objects/primitives/contact-value.vo';

describe('ContactValueVO — extended', () => {
  it('asEmail normalizes lowercase', () => {
    expect(ContactValueVO.asEmail('USER@EXAMPLE.COM').value).toBe('user@example.com');
  });

  it('asEmail throws invalid', () => {
    expect(() => ContactValueVO.asEmail('bad')).toThrow();
  });

  it('asPhone normalizes spaces', () => {
    expect(ContactValueVO.asPhone('+880 1712 345678').value).toBe('+8801712345678');
  });

  it('asPhone throws invalid', () => {
    expect(() => ContactValueVO.asPhone('123')).toThrow();
  });

  it('asUrl passes https', () => {
    expect(ContactValueVO.asUrl('https://x.com').value).toBe('https://x.com');
  });

  it('asUrl throws invalid', () => {
    expect(() => ContactValueVO.asUrl('bad')).toThrow();
  });

  it('looksLikeEmail', () => {
    expect(ContactValueVO.create('u@e.com').looksLikeEmail()).toBe(true);
    expect(ContactValueVO.create('not').looksLikeEmail()).toBe(false);
  });

  it('looksLikePhone', () => {
    expect(ContactValueVO.create('+8801712345678').looksLikePhone()).toBe(true);
  });

  it('looksLikeUrl', () => {
    expect(ContactValueVO.create('https://x.com').looksLikeUrl()).toBe(true);
  });

  it('throws on empty', () => {
    expect(() => ContactValueVO.create('')).toThrow();
  });

  it('throws on non-string', () => {
    expect(() => ContactValueVO.create(123 as never)).toThrow();
  });

  it('throws on too long', () => {
    expect(() => ContactValueVO.create('a'.repeat(600))).toThrow();
  });
});
