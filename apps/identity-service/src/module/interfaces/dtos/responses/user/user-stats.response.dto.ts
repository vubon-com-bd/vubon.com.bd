/**
 * User Stats Response DTO
 * @module identity-service/interfaces/dtos/responses/user
 */
import { ApiProperty } from '@nestjs/swagger';

export class UserStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: Object }) readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: Object }) readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty({ type: Object }) readonly byRole!: Readonly<Record<string, number>>;
  @ApiProperty() readonly activeCount!: number;
  @ApiProperty() readonly suspendedCount!: number;
  @ApiProperty() readonly verifiedCount!: number;
}
