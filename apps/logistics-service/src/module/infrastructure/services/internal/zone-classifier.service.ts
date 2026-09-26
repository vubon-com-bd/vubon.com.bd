import { Injectable } from '@nestjs/common';
import type { ZoneEntity } from '../../../domain/entities/zone.entity';

@Injectable()
export class ZoneClassifierService {
  findZone(
    zones: readonly ZoneEntity[],
    division: string,
    district: string,
  ): ZoneEntity | null {
    return zones.find((z) => z.covers(division, district)) ?? null;
  }
}
