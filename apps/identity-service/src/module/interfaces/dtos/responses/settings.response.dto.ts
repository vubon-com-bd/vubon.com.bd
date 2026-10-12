import { ApiProperty } from '@nestjs/swagger';

export class UserSettingsHttpResponseDTO {
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly theme!: string;
  @ApiProperty() readonly language!: string;
  @ApiProperty() readonly locale!: string;
  @ApiProperty() readonly timezone!: string;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly dateFormat!: string;
  @ApiProperty() readonly timeFormat!: string;
  @ApiProperty() readonly itemsPerPage!: number;
  @ApiProperty() readonly notifications!: boolean;
  @ApiProperty() readonly twoFactor!: boolean;
  @ApiProperty() readonly updatedAt!: string;
}
