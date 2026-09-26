/**
 * IdGeneratorService — Unit Tests
 * @module auth-service/infrastructure/services/internal
 */
import { IdGeneratorService } from './id-generator.service';

describe('IdGeneratorService', () => {
  let service: IdGeneratorService;

  beforeEach(() => {
    service = new IdGeneratorService();
  });

  it('should have name', () => {
    expect(service.name).toBe('IdGeneratorService');
  });

  describe('generate()', () => {
    it('should produce a URL-safe string', () => {
      const id = service.generate();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(20);
      expect(id).toMatch(/^[A-Za-z0-9_-]+$/);
    });

    it('should produce unique IDs', () => {
      const ids = new Set<string>();
      for (let i = 0; i < 100; i += 1) {
        ids.add(service.generate());
      }
      expect(ids.size).toBe(100);
    });
  });

  describe('generateUuid()', () => {
    it('should produce valid UUID v4 format', () => {
      const uuid = service.generateUuid();
      expect(uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      );
    });

    it('should produce unique UUIDs', () => {
      const ids = new Set<string>();
      for (let i = 0; i < 100; i += 1) {
        ids.add(service.generateUuid());
      }
      expect(ids.size).toBe(100);
    });
  });
});
