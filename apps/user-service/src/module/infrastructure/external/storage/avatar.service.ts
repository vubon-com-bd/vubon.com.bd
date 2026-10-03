/**
 * Avatar Service — user avatar upload helper
 */
import { Injectable } from '@nestjs/common';
import { UserStorageService } from './storage.service.js';
import { USER_PROFILE } from '@vubon/shared-constants/user';

export interface AvatarUploadResult {
  readonly url: string;
  readonly key: string;
  readonly sizeMB: number;
}

@Injectable()
export class AvatarService {
  constructor(private readonly storage: UserStorageService) {}

  async uploadAvatar(
    userId: string,
    content: Buffer,
    mimeType: string
  ): Promise<AvatarUploadResult> {
    const sizeMB = content.byteLength / (1024 * 1024);
    if (sizeMB > USER_PROFILE.AVATAR_MAX_SIZE_MB) {
      throw new Error(
        `Avatar too large: ${sizeMB.toFixed(2)}MB (max ${USER_PROFILE.AVATAR_MAX_SIZE_MB}MB)`
      );
    }

    if (!mimeType.startsWith('image/')) {
      throw new Error(`Invalid avatar mime type: ${mimeType}`);
    }

    const ext = mimeType.split('/')[1] ?? 'png';
    const uploaded = await this.storage.upload(content, {
      folder: `users/${userId}/avatar`,
      fileName: `avatar.${ext}`,
      contentType: mimeType,
    });

    return {
      url: uploaded.url,
      key: uploaded.key,
      sizeMB,
    };
  }

  async deleteAvatar(key: string): Promise<void> {
    await this.storage.delete(key);
  }
}
