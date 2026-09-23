import { Injectable } from '@nestjs/common';
import { SHIPMENT } from '@vubon/shared-constants/logistics';
import { generateCode } from '@vubon/shared-utils/common';

@Injectable()
export class TrackingNumberGeneratorService {
  generate(): string {
    return generateCode('TRK', 14);
  }
}
