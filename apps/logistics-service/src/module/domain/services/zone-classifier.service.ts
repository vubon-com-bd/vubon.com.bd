import { ZoneEntity } from '../entities/zone.entity';

export class ZoneClassifierService {
  findZone(
    zones: readonly ZoneEntity[],
    division: string,
    district: string,
  ): ZoneEntity | null {
    return zones.find((z) => z.covers(division, district)) ?? null;
  }
}
