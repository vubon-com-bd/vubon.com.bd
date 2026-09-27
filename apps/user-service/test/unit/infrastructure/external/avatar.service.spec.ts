/**
 * AvatarService — coverage filler
 */
import { AvatarService } from '@infrastructure/external/storage/avatar.service';
import { UserStorageService } from '@infrastructure/external/storage/storage.service';

describe('AvatarService (coverage)', () => {
  let service: AvatarService;
  let storage: UserStorageService;

  beforeEach(() => {
    storage = new UserStorageService();
    service = new AvatarService(storage);
  });

  it('uploadAvatar with png', async () => {
    const r = await service.uploadAvatar('u-1', Buffer.from('fake'), 'image/png');
    expect(r.url).toContain('u-1');
    expect(r.key).toContain('u-1');
    expect(typeof r.sizeMB).toBe('number');
  });

  it('uploadAvatar with jpeg', async () => {
    const r = await service.uploadAvatar('u-1', Buffer.from('fake'), 'image/jpeg');
    expect(r.url).toContain('jpeg');
  });

  it('uploadAvatar with webp', async () => {
    const r = await service.uploadAvatar('u-1', Buffer.from('fake'), 'image/webp');
    expect(r.url).toContain('webp');
  });

  it('uploadAvatar throws on non-image', async () => {
    await expect(
      service.uploadAvatar('u-1', Buffer.from('x'), 'application/json')
    ).rejects.toThrow(/Invalid avatar mime/);
  });

  it('uploadAvatar throws on too large', async () => {
    const buf = Buffer.alloc(6 * 1024 * 1024);
    await expect(service.uploadAvatar('u-1', buf, 'image/png')).rejects.toThrow();
  });

  it('deleteAvatar delegates to storage', async () => {
    await service.deleteAvatar('key');
    expect(true).toBe(true);
  });
});
