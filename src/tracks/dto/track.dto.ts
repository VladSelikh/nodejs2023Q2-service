import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { IsUUIDorNull } from '../../core/validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUIDorNull()
  artistId: string | null;

  @IsUUIDorNull()
  albumId: string | null;

  @IsNotEmpty()
  @IsInt()
  duration: number;
}

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
