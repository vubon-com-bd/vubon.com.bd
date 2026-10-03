/**
 * UserContactEntity Unit Test
 */
import { UserContactEntity } from '@domain/entities/user-contact.entity';
import { ContactIdVO } from '@domain/value-objects/primitives/contact-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ContactTypeVO } from '@domain/value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '@domain/value-objects/primitives/contact-value.vo';

describe('UserContactEntity', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildContact = () =>
    UserContactEntity.create({
      contactId: ContactIdVO.create('c-1'),
      userId: UserIdVO.create('user-1'),
      type: ContactTypeVO.create('email'),
      contactValue: ContactValueVO.create('user@example.com'),
      isPrimary: false,
      now,
    });

  describe('create', () => {
    it('should create contact with unverified state', () => {
      const c = buildContact();
      expect(c.id).toBe('c-1');
      expect(c.type.value).toBe('email');
      expect(c.contactValue.value).toBe('user@example.com');
      expect(c.isVerified).toBe(false);
      expect(c.isPrimary).toBe(false);
    });
  });

  describe('verify / unverify', () => {
    it('should mark as verified', () => {
      const c = buildContact();
      c.verify();
      expect(c.isVerified).toBe(true);
    });

    it('should unverify', () => {
      const c = buildContact();
      c.verify();
      c.unverify();
      expect(c.isVerified).toBe(false);
    });
  });

  describe('makePrimary / unmarkPrimary', () => {
    it('should make primary', () => {
      const c = buildContact();
      c.makePrimary();
      expect(c.isPrimary).toBe(true);
    });

    it('should unmark primary', () => {
      const c = buildContact();
      c.makePrimary();
      c.unmarkPrimary();
      expect(c.isPrimary).toBe(false);
    });
  });

  describe('updateValue', () => {
    it('should update value and reset verification', () => {
      const c = buildContact();
      c.verify();
      c.updateValue(ContactValueVO.create('new@example.com'));
      expect(c.contactValue.value).toBe('new@example.com');
      expect(c.isVerified).toBe(false);
    });
  });

  describe('toContactVO', () => {
    it('should return UserContactVO', () => {
      const vo = buildContact().toContactVO();
      expect(vo.id.value).toBe('c-1');
      expect(vo.userId.value).toBe('user-1');
    });
  });
});
