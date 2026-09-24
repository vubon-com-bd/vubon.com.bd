import { Injectable } from '@nestjs/common';

export interface SmsSegment {
  readonly body: string;
  readonly index: number;
}

@Injectable()
export class SmsSplitterService {
  split(body: string, maxLength: number = 160): readonly SmsSegment[] {
    if (body.length <= maxLength) {
      return [{ body, index: 0 }];
    }
    const segments: SmsSegment[] = [];
    let start = 0;
    let index = 0;
    while (start < body.length) {
      segments.push({ body: body.slice(start, start + maxLength), index });
      start += maxLength;
      index += 1;
    }
    return Object.freeze(segments);
  }
}
