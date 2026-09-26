/**
 * UpdateSlaRequestDTO
 * @module support-service/application/dtos/requests/sla
 */
export interface UpdateSlaRequestDTO {
  readonly slaId: string;
  readonly targetMinutes?: number;
  readonly warningThresholdPercent?: number;
}
