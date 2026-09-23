import { Injectable } from '@nestjs/common';

export interface Segment {
  readonly name: string;
  readonly criteria: Readonly<Record<string, unknown>>;
}

@Injectable()
export class AudienceSegmenterService {
  buildSegment(name: string, criteria: Readonly<Record<string, unknown>>): Segment {
    return { name, criteria };
  }
}
