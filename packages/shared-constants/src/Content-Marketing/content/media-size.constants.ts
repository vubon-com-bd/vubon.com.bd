/**
 * মিডিয়া সাইজ সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * মিডিয়া সাইজ ইউনিটসমূহ
 */
export const MEDIA_SIZE_UNITS = ['B', 'KB', 'MB', 'GB'] as const;

/**
 * সর্বোচ্চ ইমেজ প্রস্থ
 */
export const MAX_IMAGE_WIDTH = 4096;

/**
 * সর্বোচ্চ ইমেজ উচ্চতা
 */
export const MAX_IMAGE_HEIGHT = 4096;

/**
 * সর্বোচ্চ ভিডিও ডিউরেশন (1 hour in seconds)
 */
export const MAX_VIDEO_DURATION = 3600;

/**
 * মিডিয়া সাইজ ইউনিট টাইপ
 */
export type MediaSizeUnit = (typeof MEDIA_SIZE_UNITS)[number];

/**
 * ফাইল সাইজ ফরম্যাট করার ফাংশন
 */
export function formatFileSize(bytes: number, unit?: MediaSizeUnit): string {
  if (bytes === 0) return '0 B';

  const units = MEDIA_SIZE_UNITS;
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = bytes / Math.pow(k, i);

  if (unit) {
    const unitIndex = units.indexOf(unit);
    if (unitIndex >= 0 && unitIndex <= i) {
      const adjustedSize = bytes / Math.pow(k, unitIndex);
      return `${adjustedSize.toFixed(2)} ${unit}`;
    }
  }

  return `${size.toFixed(2)} ${units[i]}`;
}

/**
 * ফাইল সাইজ পার্স করার ফাংশন
 */
export function parseFileSize(sizeString: string): number {
  const match = sizeString.match(/^([\d.]+)\s*([BKMGT]?B?)$/i);
  if (!match) {
    throw new Error('Invalid file size format');
  }

  const size = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  const units: Record<string, number> = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
  };

  const multiplier = units[unit] || units['B'];
  return size * multiplier;
}

/**
 * মিডিয়া সাইজ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidMediaSize(bytes: number): boolean {
  return bytes > 0 && Number.isFinite(bytes);
}

/**
 * ইমেজ ডাইমেনশন বৈধ কিনা চেক করার ফাংশন
 */
export function isValidImageDimensions(width: number, height: number): boolean {
  return (
    width > 0 &&
    height > 0 &&
    width <= MAX_IMAGE_WIDTH &&
    height <= MAX_IMAGE_HEIGHT &&
    Number.isFinite(width) &&
    Number.isFinite(height)
  );
}

/**
 * ভিডিও ডিউরেশন বৈধ কিনা চেক করার ফাংশন
 */
export function isValidVideoDuration(durationInSeconds: number): boolean {
  return (
    durationInSeconds > 0 &&
    durationInSeconds <= MAX_VIDEO_DURATION &&
    Number.isFinite(durationInSeconds)
  );
}

/**
 * ফাইল সাইজ ইউনিটে কনভার্ট করার ফাংশন
 */
export function convertFileSize(bytes: number, targetUnit: MediaSizeUnit): number {
  const unitIndex = MEDIA_SIZE_UNITS.indexOf(targetUnit);
  if (unitIndex === -1) {
    throw new Error(`Invalid unit: ${targetUnit}`);
  }
  return bytes / Math.pow(1024, unitIndex);
}

/**
 * সব মিডিয়া সাইজ ইউনিটের তালিকা পাওয়ার ফাংশন
 */
export function getAllMediaSizeUnits(): readonly MediaSizeUnit[] {
  return MEDIA_SIZE_UNITS;
}

/**
 * ইমেজ রেজোলিউশন চেক করার ফাংশন
 */
export function isHighResolutionImage(width: number, height: number): boolean {
  return width > 1920 || height > 1080;
}

/**
 * ইমেজ স্কোয়ার কিনা চেক করার ফাংশন
 */
export function isSquareImage(width: number, height: number): boolean {
  return width === height;
}

/**
 * ইমেজ পোর্ট্রেট কিনা চেক করার ফাংশন
 */
export function isPortraitImage(width: number, height: number): boolean {
  return height > width;
}

/**
 * ইমেজ ল্যান্ডস্কেপ কিনা চেক করার ফাংশন
 */
export function isLandscapeImage(width: number, height: number): boolean {
  return width > height;
}

/**
 * ভিডিও ডিউরেশন ফরম্যাট করার ফাংশন
 */
export function formatVideoDuration(durationInSeconds: number): string {
  if (durationInSeconds < 60) {
    return `${durationInSeconds}s`;
  }

  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return `${minutes}m ${seconds}s`;
}
