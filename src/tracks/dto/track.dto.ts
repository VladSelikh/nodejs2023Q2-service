import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';
import { IsUUIDorNull } from '../../core/validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUIDorNull()
  artistId: string | null = null;

  @IsOptional()
  @IsUUIDorNull()
  albumId: string | null = null;

  @IsNotEmpty()
  @IsInt()
  duration: number;
}

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
