import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';

describe('UserNameVO — extended', () => {
  it('getFirstName returns first word', () => {
    expect(UserNameVO.create('John Doe Smith').getFirstName()).toBe('John');
  });

  it('getLastName returns last word', () => {
    expect(UserNameVO.create('John Doe Smith').getLastName()).toBe('Smith');
  });

  it('getLastName empty for single word', () => {
    expect(UserNameVO.create('John').getLastName()).toBe('');
  });

  it('hasMiddleName true for 3+ words', () => {
    expect(UserNameVO.create('John Middle Doe').hasMiddleName()).toBe(true);
  });

  it('hasMiddleName false for 2 words', () => {
    expect(UserNameVO.create('John Doe').hasMiddleName()).toBe(false);
  });

  it('isSingleWord', () => {
    expect(UserNameVO.create('John').isSingleWord()).toBe(true);
    expect(UserNameVO.create('John Doe').isSingleWord()).toBe(false);
  });

  it('wordCount accurate', () => {
    expect(UserNameVO.create('John Middle Doe').wordCount).toBe(3);
  });

  it('initials from full name', () => {
    expect(UserNameVO.create('John Doe').initials).toBe('JD');
  });

  it('throws on non-string', () => {
    expect(() => UserNameVO.create(123 as never)).toThrow();
  });

  it('throws on empty', () => {
    expect(() => UserNameVO.create('')).toThrow();
  });

  it('throws on invalid characters', () => {
    expect(() => UserNameVO.create('John123')).toThrow();
  });

  it('normalizes multiple spaces', () => {
    expect(UserNameVO.create('John    Doe').value).toBe('John Doe');
  });
});
