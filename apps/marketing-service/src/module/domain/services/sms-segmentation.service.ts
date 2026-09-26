export class SmsSegmentationService {
  calculateSegments(content: string): number {
    return Math.ceil(content.length / 160);
  }
}
