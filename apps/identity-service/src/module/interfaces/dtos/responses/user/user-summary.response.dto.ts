/**
 * User Summary Response DTO (list item)
 * @module identity-service/interfaces/dtos/responses/user
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly email!: string;
  @ApiPropertyOptional() readonly firstName?: string;
  @ApiPropertyOptional() readonly lastName?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly createdAt!: string;
}
