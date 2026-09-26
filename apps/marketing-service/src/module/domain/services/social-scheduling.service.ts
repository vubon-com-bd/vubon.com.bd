export class SocialSchedulingService {
  getBestPostingHour(platform: string): number {
    const bestHours: Record<string, number> = {
      facebook: 15,
      instagram: 11,
      twitter: 9,
      linkedin: 8,
      tiktok: 18,
    };
    return bestHours[platform] ?? 12;
  }
}
