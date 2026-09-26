import { Injectable, Logger } from '@nestjs/common';
import type { SocialProvider, SocialPostOptions, SocialPostResult } from './social.interface';

@Injectable()
export class StubSocialProvider implements SocialProvider {
  private readonly logger = new Logger(StubSocialProvider.name);

  async publish(options: SocialPostOptions): Promise<SocialPostResult> {
    this.logger.log(`[STUB] Publish to ${options.platform}`);
    return { success: true, postId: `stub-${Date.now()}` };
  }
}
