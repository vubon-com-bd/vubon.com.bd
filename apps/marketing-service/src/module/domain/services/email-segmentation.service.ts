export interface Segment {
  readonly name: string;
  readonly criteria: Readonly<Record<string, unknown>>;
}

export class EmailSegmentationService {
  buildSegment(name: string, criteria: Readonly<Record<string, unknown>>): Segment {
    return { name, criteria };
  }
}
