import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileRequestDto {
  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  bio?: string;

  @ApiPropertyOptional()
  avatarUrl?: string;
}

export class UpdateAvatarRequestDto {
  @ApiProperty({ nullable: true })
  avatarUrl!: string | null;
}

export class UpdateBioRequestDto {
  @ApiProperty({ nullable: true })
  bio!: string | null;
}

export class UpdateVisibilityRequestDto {
  @ApiProperty({ enum: ['public', 'private', 'friends'] })
  visibility!: 'public' | 'private' | 'friends';
}
