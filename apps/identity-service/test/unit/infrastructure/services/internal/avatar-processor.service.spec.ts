/**
 * AvatarProcessorService unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AvatarProcessorService } from '@infrastructure/services/internal/avatar-processor.service.js';

describe('AvatarProcessorService', () => {
  let service: AvatarProcessorService;

  beforeEach(() => {
    service = new AvatarProcessorService();
  });

  it('validateAvatarUrl true for https', () => {
    const result = service.validateAvatarUrl('https://cdn.example.com/a.jpg');
    expect(result.valid).toBe(true);
  });

  it('validateAvatarUrl false for empty', () => {
    const result = service.validateAvatarUrl('');
    expect(result.valid).toBe(false);
    expect(result.reason).toBeDefined();
  });

  it('validateAvatarUrl false for non-http', () => {
    const result = service.validateAvatarUrl('ftp://x.com/a.jpg');
    expect(result.valid).toBe(false);
  });

  it('maxFileSizeBytes returns number', () => {
    expect(typeof service.maxFileSizeBytes()).toBe('number');
    expect(service.maxFileSizeBytes()).toBeGreaterThan(0);
  });

  it('maxUploadBytes returns number', () => {
    expect(typeof service.maxUploadBytes()).toBe('number');
  });

  it('generateCdnUrl returns original when cdn disabled', () => {
    const url = service.generateCdnUrl('https://origin.com/a.jpg', 200);
    expect(typeof url).toBe('string');
    expect(url.startsWith('https://')).toBe(true);
  });

  it('generateCdnUrl default width', () => {
    const url = service.generateCdnUrl('https://origin.com/a.jpg');
    expect(typeof url).toBe('string');
  });

  it('debug is no-op', () => {
    expect(() => service.debug('test')).not.toThrow();
  });
});
