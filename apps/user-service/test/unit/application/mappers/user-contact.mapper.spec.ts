/**
 * UserContactMapper Unit Test
 */
import { UserContactMapper } from '@application/mappers/user-contact.mapper';
import { UserContactEntity } from '@domain/entities/user-contact.entity';
import { ContactIdVO } from '@domain/value-objects/primitives/contact-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ContactTypeVO } from '@domain/value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '@domain/value-objects/primitives/contact-value.vo';

describe('UserContactMapper', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildContact = () =>
    UserContactEntity.create({
      contactId: ContactIdVO.create('contact-1'),
      userId: UserIdVO.create('user-1'),
      type: ContactTypeVO.create('email'),
      contactValue: ContactValueVO.create('user@example.com'),
      isPrimary: true,
      now,
    });

  describe('toResponse', () => {
    it('should map to ContactResponseDTO', () => {
      const dto = UserContactMapper.toResponse(buildContact());
      expect(dto.id).toBe('contact-1');
      expect(dto.type).toBe('email');
      expect(dto.value).toBe('user@example.com');
      expect(dto.isPrimary).toBe(true);
      expect(dto.isVerified).toBe(false);
    });
  });

  describe('toResponseList', () => {
    it('should map a list', () => {
      expect(UserContactMapper.toResponseList([buildContact()]).length).toBe(1);
    });
  });
});
