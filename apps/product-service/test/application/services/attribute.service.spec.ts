/**
 * AttributeService — unit tests
 */
import { jest } from '@jest/globals';
import { AttributeService } from '../../../src/module/application/services/impl/attribute.service.js';
import { AttributeNotFoundApplicationError } from '../../../src/module/application/errors/attribute.errors.js';
import { createMockAttributeRepository, type MockedAttributeRepository } from '../../mocks/repositories.js';
import { buildAttribute } from '../../fixtures.js';
import { PRODUCT_ID, USER_ID } from '../../helpers.js';

describe('AttributeService', () => {
  let service: AttributeService;
  let repo: MockedAttributeRepository;

  beforeEach(() => {
    repo = createMockAttributeRepository();
    repo.save.mockImplementation(async (e) => e);
    service = new AttributeService(repo);
  });

  describe('add()', () => {
    it('should add attribute', async () => {
      const result = await service.add({
        productId: PRODUCT_ID,
        name: 'Color',
        slug: 'color',
        type: 'select',
        options: [{ value: 'red', label: 'Red', sortOrder: 1 }],
      }, USER_ID);

      expect(result.name).toBe('Color');
      expect(repo.save).toHaveBeenCalled();
    });

    it('should set default flags', async () => {
      const result = await service.add({
        productId: PRODUCT_ID,
        name: 'Size',
        slug: 'size',
        type: 'select',
        options: [{ value: 'S', label: 'Small', sortOrder: 1 }],
      }, USER_ID);
      expect(result.isSearchable).toBe(true);
      expect(result.isFilterable).toBe(true);
      expect(result.isRequired).toBe(false);
    });
  });

  describe('update()', () => {
    it('should rename and change flags', async () => {
      const attr = buildAttribute();
      repo.findById.mockResolvedValueOnce(attr);

      const result = await service.update({
        attributeId: attr.id,
        name: 'Colour',
        slug: 'colour',
        isRequired: true,
      });
      expect(result.name).toBe('Colour');
      expect(result.isRequired).toBe(true);
    });

    it('should throw for missing', async () => {
      repo.findById.mockResolvedValueOnce(null);
      await expect(
        service.update({ attributeId: 'missing' }),
      ).rejects.toThrow(AttributeNotFoundApplicationError);
    });
  });

  describe('remove()', () => {
    it('should delete attribute', async () => {
      const attr = buildAttribute();
      repo.findById.mockResolvedValueOnce(attr);
      await service.remove(attr.id, USER_ID);
      expect(repo.delete).toHaveBeenCalledWith(attr.id);
    });

    it('should throw for missing', async () => {
      repo.findById.mockResolvedValueOnce(null);
      await expect(service.remove('missing', USER_ID)).rejects.toThrow(AttributeNotFoundApplicationError);
    });
  });

  describe('listByProduct()', () => {
    it('should return mapped list', async () => {
      repo.findByProductId.mockResolvedValueOnce([buildAttribute()]);
      const result = await service.listByProduct(PRODUCT_ID);
      expect(result.length).toBe(1);
    });
  });
});
