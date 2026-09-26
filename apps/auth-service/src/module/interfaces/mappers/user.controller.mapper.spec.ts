/**
 * UserControllerMapper — Unit Tests
 * @module auth-service/interfaces/mappers
 */
import { UserControllerMapper } from './user.controller.mapper';

const buildAppDto = () => ({
  id: 'user-1',
  email: 'john@example.com',
  phone: '+8801712345678',
  name: 'John Doe',
  status: 'active' as const,
  type: 'customer',
  roles: ['customer'],
  emailVerified: true,
  phoneVerified: false,
  mfaEnabled: false,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
});

describe('UserControllerMapper', () => {
  let mapper: UserControllerMapper;

  beforeEach(() => {
    mapper = new UserControllerMapper();
  });

  describe('toResponse()', () => {
    it('should map all fields', () => {
      const result = mapper.toResponse(buildAppDto() as never);
      expect(result.id).toBe('user-1');
      expect(result.email).toBe('john@example.com');
      expect(result.phone).toBe('+8801712345678');
      expect(result.name).toBe('John Doe');
      expect(result.status).toBe('active');
      expect(result.type).toBe('customer');
    });

    it('should copy roles array (immutable)', () => {
      const dto = buildAppDto();
      const result = mapper.toResponse(dto as never);
      expect(result.roles).toEqual(['customer']);
      expect(result.roles).not.toBe(dto.roles);
    });

    it('should preserve verification flags', () => {
      const result = mapper.toResponse(buildAppDto() as never);
      expect(result.emailVerified).toBe(true);
      expect(result.phoneVerified).toBe(false);
    });

    it('should handle undefined phone', () => {
      const dto = { ...buildAppDto(), phone: undefined };
      const result = mapper.toResponse(dto as never);
      expect(result.phone).toBeUndefined();
    });
  });

  describe('toResponseList()', () => {
    it('should map list', () => {
      const list = [buildAppDto(), { ...buildAppDto(), id: 'user-2' }];
      const result = mapper.toResponseList(list as never);
      expect(result).toHaveLength(2);
      expect(result[0]?.id).toBe('user-1');
      expect(result[1]?.id).toBe('user-2');
    });

    it('should return empty array for empty input', () => {
      expect(mapper.toResponseList([])).toEqual([]);
    });
  });
});
