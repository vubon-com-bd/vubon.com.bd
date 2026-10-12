/**
 * User List Response DTO (paginated)
 * @module identity-service/interfaces/dtos/responses/user
 */
import { ApiProperty } from '@nestjs/swagger';
import { UserSummaryHttpResponseDTO } from './user-summary.response.dto.js';

export class UserListHttpResponseDTO {
  @ApiProperty({ example: true }) readonly success!: true;
  @ApiProperty({ type: [UserSummaryHttpResponseDTO] })
  readonly items!: readonly UserSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}
