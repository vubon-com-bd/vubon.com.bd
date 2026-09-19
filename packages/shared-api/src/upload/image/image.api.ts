import { httpClient } from '../../common/client/client.factory';
import { IMAGE_UPLOAD_ENDPOINTS } from './image.endpoints';
import type { ImageUploadOptions, ImageUploadResult } from './image.types';

export const imageUploadApi = {
  upload: async (
    file: Blob | File,
    options: ImageUploadOptions = {},
    signal?: AbortSignal
  ): Promise<ImageUploadResult> => {
    const form = new FormData();
    form.append('file', file, (file as File).name ?? 'image');
    if (options.maxWidth) form.append('maxWidth', String(options.maxWidth));
    if (options.maxHeight) form.append('maxHeight', String(options.maxHeight));
    if (options.quality) form.append('quality', String(options.quality));
    if (options.format) form.append('format', options.format);
    if (options.generateThumbnail) form.append('generateThumbnail', 'true');

    const res = await httpClient.post<ImageUploadResult>(IMAGE_UPLOAD_ENDPOINTS.upload, form, {
      signal,
      timeout: 60_000,
      headers: {},
    });
    return res.data;
  },
} as const;
