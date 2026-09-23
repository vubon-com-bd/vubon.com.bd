export interface SocialPostOptions {
  readonly platform: string;
  readonly content: string;
}

export interface SocialPostResult {
  readonly success: boolean;
  readonly postId?: string;
  readonly error?: string;
}

export interface SocialProvider {
  publish(options: SocialPostOptions): Promise<SocialPostResult>;
}
