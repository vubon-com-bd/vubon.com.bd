import { Injectable } from '@nestjs/common';
import { TrackingNumberVO } from '../../../domain/value-objects/primitives/tracking-number.vo';

@Injectable()
export class TrackingNumberGeneratorService {
  generate(sequence: number): TrackingNumberVO {
    const seq = String(sequence).padStart(12, '0');
    return TrackingNumberVO.create(`VN${seq}`);
  }
}
