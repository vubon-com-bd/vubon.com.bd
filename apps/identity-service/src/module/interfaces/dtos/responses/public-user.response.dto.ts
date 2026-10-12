import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PublicUserHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiPropertyOptional() readonly displayName?: string;
  @ApiPropertyOptional() readonly username?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty({ type: [String] }) readonly roles!: readonly string[];
  @ApiProperty() readonly emailVerified!: boolean;
  @ApiProperty() readonly createdAt!: string;
}
