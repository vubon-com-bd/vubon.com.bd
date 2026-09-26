import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class EarnPointsRequestDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  userId!: string;

  @ApiProperty({ example: 100 })
  @IsInt()
  @Min(1)
  points!: number;

  @ApiPropertyOptional({ example: 'Order completed' })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsUUID()
  orderId?: string;
}

export class RedeemPointsRequestDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  userId!: string;

  @ApiProperty({ example: 500 })
  @IsInt()
  @Min(1)
  points!: number;

  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsUUID()
  rewardId?: string;
}

export class UpgradeTierRequestDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  userId!: string;

  @ApiProperty({ example: 'gold' })
  @IsString()
  targetTier!: string;
}

export class ClaimRewardRequestDTO {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  userId!: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  rewardId!: string;
}
