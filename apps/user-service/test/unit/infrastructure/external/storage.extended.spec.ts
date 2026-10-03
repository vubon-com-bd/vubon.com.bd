import { UserStorageService } from '@infrastructure/external/storage/storage.service';

describe('UserStorageService — extended', () => {
  let service: UserStorageService;

  beforeEach(() => {
    service = new UserStorageService();
  });

  it('upload with custom filename', async () => {
    const r = await service.upload(Buffer.from('a'), {
      folder: 'x',
      fileName: 'custom.png',
      contentType: 'image/png',
    });
    expect(r.key).toContain('custom.png');
    expect(r.mimeType).toBe('image/png');
  });

  it('upload with default filename', async () => {
    const r = await service.upload(Buffer.from('a'), { folder: 'y' });
    expect(r.key).toContain('y/');
    expect(r.mimeType).toBe('application/octet-stream');
  });

  it('getSignedUrl default expires', async () => {
    const url = await service.getSignedUrl('key');
    expect(url).toContain('expires=');
  });

  it('getSignedUrl custom expires', async () => {
    const url = await service.getSignedUrl('key', 60);
    expect(url).toContain('expires=');
  });
});
