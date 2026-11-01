export interface ZoneActionRequestDTO {
  readonly zoneId: string;
}
export interface DeactivateZoneRequestDTO {
  readonly zoneId: string;
  readonly reason?: string;
}
export interface RestrictZoneRequestDTO {
  readonly zoneId: string;
  readonly reason: string;
}
export interface SuspendZoneRequestDTO {
  readonly zoneId: string;
  readonly reason?: string;
}
export interface ClassifyPostalCodeRequestDTO {
  readonly postalCode?: string;
  readonly district?: string;
  readonly division?: string;
}
