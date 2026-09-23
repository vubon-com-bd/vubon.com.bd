import { TrackingNumberVO } from '../value-objects/primitives/tracking-number.vo';

export class TrackingNumberService {
  generate(prefix: string, sequence: number): TrackingNumberVO {
    const padded = String(sequence).padStart(12, '0');
    return TrackingNumberVO.create(`${prefix}${padded}`);
  }
}
