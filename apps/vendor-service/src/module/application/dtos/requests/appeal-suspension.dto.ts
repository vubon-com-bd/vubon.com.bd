/**
 * AppealSuspensionRequestDto — vendor files an appeal
 * @module vendor-service/application/dtos/requests
 */
export class AppealSuspensionRequestDto {
  vendorId!: string;
  suspensionId!: string;
  appealReason!: string;
  evidenceUrls?: readonly string[];
  idempotencyKey?: string;
}
