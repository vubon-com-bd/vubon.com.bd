import { AvatarProcessorService } from '@infrastructure/services/internal/avatar-processor.service';

describe('AvatarProcessorService', () => {
  let service: AvatarProcessorService;

  beforeEach(() => {
    service = new AvatarProcessorService();
  });

  const PNG_HEADER = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  it('validates valid PNG', () => {
    const buf = Buffer.concat([PNG_HEADER, Buffer.alloc(100)]);
    const r = service.validate('image/png', buf);
    expect(r.valid).toBe(true);
    expect(r.detectedFormat).toBe('png');
  });

  it('rejects unsupported mime', () => {
    const r = service.validate('text/plain', Buffer.from('hi'));
    expect(r.valid).toBe(false);
  });

  it('rejects empty buffer', () => {
    const r = service.validate('image/png', Buffer.alloc(0));
    expect(r.valid).toBe(false);
  });

  it('detects JPEG magic bytes', () => {
    const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
    const r = service.validate('image/jpeg', jpeg);
    expect(r.detectedFormat).toBe('jpeg');
  });

  it('isImageMime returns true for jpeg', () => {
    expect(service.isImageMime('image/jpeg')).toBe(true);
  });

  it('isImageMime returns false for txt', () => {
    expect(service.isImageMime('text/plain')).toBe(false);
  });
});
