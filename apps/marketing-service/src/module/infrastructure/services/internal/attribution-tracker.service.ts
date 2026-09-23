import { Injectable } from '@nestjs/common';

export interface Touchpoint {
  readonly channel: string;
  readonly timestamp: Date;
  readonly source: string;
}

export interface AttributionResult {
  readonly channel: string;
  readonly weight: number;
}

@Injectable()
export class AttributionTrackerService {
  track(touchpoints: readonly Touchpoint[]): readonly AttributionResult[] {
    if (touchpoints.length === 0) return [];
    const weight = 1 / touchpoints.length;
    return touchpoints.map((t) => ({ channel: t.channel, weight }));
  }

  lastClick(touchpoints: readonly Touchpoint[]): AttributionResult | null {
    if (touchpoints.length === 0) return null;
    const last = touchpoints[touchpoints.length - 1];
    return { channel: last.channel, weight: 1 };
  }
}
