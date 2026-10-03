import { httpClient } from '../../common/client/client.factory';
import { VIDEO_UPLOAD_ENDPOINTS } from './video.endpoints';
import type { VideoUploadOptions, VideoUploadResult } from './video.types';

export const videoUploadApi = {
  upload: async (
    file: Blob | File,
    options: VideoUploadOptions = {},
    signal?: AbortSignal
  ): Promise<VideoUploadResult> => {
    const form = new FormData();
    form.append('file', file, (file as File).name ?? 'video');
    if (options.quality) form.append('quality', options.quality);
    if (options.transcode) form.append('transcode', 'true');
    if (options.generateThumbnail) form.append('generateThumbnail', 'true');

    const res = await httpClient.post<VideoUploadResult>(VIDEO_UPLOAD_ENDPOINTS.upload, form, {
      signal,
      timeout: 300_000,
      headers: {},
    });
    return res.data;
  },
} as const;
