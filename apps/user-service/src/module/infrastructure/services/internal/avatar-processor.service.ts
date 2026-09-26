import { Injectable } from '@nestjs/common';
import { AVATAR_CONFIG } from '../../config/avatar.config';

@Injectable()
export class AvatarProcessorService {
  async process(url: string): Promise<string> {
    void AVATAR_CONFIG;
    return url;
  }

  validate(url: string): boolean {
    if (!url) return false;
    const ext = url.split('.').pop()?.toLowerCase() ?? '';
    return (AVATAR_CONFIG.allowedFormats as readonly string[]).includes(ext);
  }
}
