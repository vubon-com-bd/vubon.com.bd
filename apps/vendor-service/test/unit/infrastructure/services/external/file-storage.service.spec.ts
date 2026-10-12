import { FileStorageService } from '../../../../../src/module/infrastructure/services/external/file-storage.service.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('FileStorageService', () => {
  let service: FileStorageService;

  beforeEach(() => {
    service = new FileStorageService();
  });

  describe('upload()', () => {
    it('uploads a valid PNG logo', async () => {
      const r = await service.upload({
        bucket: 'vendor-logos',
        fileName: 'logo.png',
        mimeType: 'image/png',
        size: 1024,
        ownerId: 'vendor-1',
      });
      expect(r.url).toContain('vendor-logos');
      expect(r.key).toContain('logo');
      expect(r.size).toBe(1024);
    });

    it('uploads a PDF document', async () => {
      const r = await service.upload({
        bucket: 'vendor-documents',
        fileName: 'license.pdf',
        mimeType: 'application/pdf',
        size: 500 * 1024,
        ownerId: 'vendor-1',
      });
      expect(r.url).toContain('vendor-documents');
    });

    it('rejects disallowed MIME type', async () => {
      await expect(
        service.upload({
          bucket: 'vendor-logos',
          fileName: 'malware.exe',
          mimeType: 'application/x-msdownload',
          size: 1024,
          ownerId: 'vendor-1',
        }),
      ).rejects.toThrow(ValidationError);
    });

    it('rejects oversized file', async () => {
      await expect(
        service.upload({
          bucket: 'vendor-logos',
          fileName: 'huge.png',
          mimeType: 'image/png',
          size: 10 * 1024 * 1024, // 10 MB > 2 MB limit
          ownerId: 'vendor-1',
        }),
      ).rejects.toThrow(ValidationError);
    });

    it('rejects zero-byte file', async () => {
      await expect(
        service.upload({
          bucket: 'vendor-logos',
          fileName: 'empty.png',
          mimeType: 'image/png',
          size: 0,
          ownerId: 'vendor-1',
        }),
      ).rejects.toThrow(ValidationError);
    });

    it('includes ownerId in key path', async () => {
      const r = await service.upload({
        bucket: 'vendor-logos',
        fileName: 'logo.png',
        mimeType: 'image/png',
        size: 1024,
        ownerId: 'vendor-xyz',
      });
      expect(r.key).toContain('vendor-xyz');
    });

    it('generates unique keys', async () => {
      const a = await service.upload({
        bucket: 'vendor-logos', fileName: 'a.png', mimeType: 'image/png', size: 1024, ownerId: 'v',
      });
      const b = await service.upload({
        bucket: 'vendor-logos', fileName: 'b.png', mimeType: 'image/png', size: 1024, ownerId: 'v',
      });
      expect(a.key).not.toBe(b.key);
    });

    it('allows SVG for logos only', async () => {
      await expect(
        service.upload({
          bucket: 'vendor-logos',
          fileName: 'logo.svg',
          mimeType: 'image/svg+xml',
          size: 1024,
          ownerId: 'v',
        }),
      ).resolves.toBeDefined();

      await expect(
        service.upload({
          bucket: 'vendor-banners',
          fileName: 'banner.svg',
          mimeType: 'image/svg+xml',
          size: 1024,
          ownerId: 'v',
        }),
      ).rejects.toThrow(ValidationError);
    });

    it('handles missing extension', async () => {
      const r = await service.upload({
        bucket: 'vendor-logos',
        fileName: 'noext',
        mimeType: 'image/png',
        size: 1024,
        ownerId: 'v',
      });
      expect(r.key).toContain('.bin');
    });
  });

  describe('delete()', () => {
    it('deletes without throwing', async () => {
      await expect(service.delete('some-key')).resolves.not.toThrow();
    });
  });

  describe('publicUrl()', () => {
    it('returns URL with base', () => {
      expect(service.publicUrl('logo.png')).toContain('logo.png');
    });
  });
});
