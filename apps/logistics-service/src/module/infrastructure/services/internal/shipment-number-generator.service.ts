import { Injectable } from '@nestjs/common';
import { SHIPMENT } from '@vubon/shared-constants/logistics';
import { generateCode } from '@vubon/shared-utils/common';

@Injectable()
export class ShipmentNumberGeneratorService {
  generate(): string {
    const length = SHIPMENT.TRACKING_NUMBER_LENGTH - SHIPMENT.TRACKING_NUMBER_PREFIX.length;
    return generateCode(SHIPMENT.TRACKING_NUMBER_PREFIX, length);
  }
}
