/**
 * MediaService — unit tests
 */
import { jest } from '@jest/globals';
import { MediaService } from '../../../src/module/application/services/impl/media.service.js';
import { MediaNotFoundApplicationError } from '../../../src/module/application/errors/media.errors.js';
import { createMockMediaRepository, type MockedMediaRepository } from '../../mocks/repositories.js';
import { buildMedia } from '../../fixtures.js';
import { PRODUCT_ID, USER_ID } from '../../helpers.js';

describe('MediaService', () => {
  let service: MediaService;
  let repo: MockedMediaRepository;

  beforeEach(() => {
    repo = createMockMediaRepository();
    repo.save.mockImplementation(async (e) => e);
    service = new MediaService(repo);
  });

  describe('add()', () => {
    it('should add media', async () => {
      const result = await service.add({
        productId: PRODUCT_ID,
        type: 'image',
        url: 'https://cdn.example.com/img.jpg',
      }, USER_ID);
      expect(result.url).toBe('https://cdn.example.com/img.jpg');
      expect(repo.save).toHaveBeenCalled();
    });

    it('should clear primary before setting new primary', async () => {
      await service.add({
        productId: PRODUCT_ID,
        type: 'image',
        url: 'https://cdn.example.com/img.jpg',
        isPrimary: true,
      }, USER_ID);
      expect(repo.clearPrimaryForProduct).toHaveBeenCalledWith(PRODUCT_ID);
    });
  });

  describe('remove()', () => {
    it('should delete media', async () => {
      const media = buildMedia();
      repo.findById.mockResolvedValueOnce(media);
      await service.remove(media.id, USER_ID);
      expect(repo.delete).toHaveBeenCalledWith(media.id);
    });

    it('should throw for missing', async () => {
      repo.findById.mockResolvedValueOnce(null);
      await expect(service.remove('missing', USER_ID)).rejects.toThrow(MediaNotFoundApplicationError);
    });
  });

  describe('setPrimary()', () => {
    it('should set media as primary', async () => {
      const media = buildMedia();
      repo.findById.mockResolvedValueOnce(media);
      const result = await service.setPrimary(media.id, USER_ID);
      expect(result.isPrimary).toBe(true);
      expect(repo.clearPrimaryForProduct).toHaveBeenCalled();
    });

    it('should throw for missing', async () => {
      repo.findById.mockResolvedValueOnce(null);
      await expect(service.setPrimary('missing', USER_ID)).rejects.toThrow(MediaNotFoundApplicationError);
    });
  });

  describe('reorder()', () => {
    it('should call repo reorder', async () => {
      await service.reorder(PRODUCT_ID, ['m1', 'm2', 'm3'], USER_ID);
      expect(repo.reorder).toHaveBeenCalledWith(PRODUCT_ID, ['m1', 'm2', 'm3']);
    });
  });

  describe('listByProduct()', () => {
    it('should return list', async () => {
      repo.findByProductId.mockResolvedValueOnce([buildMedia()]);
      const result = await service.listByProduct(PRODUCT_ID);
      expect(result.length).toBe(1);
    });
  });
});
