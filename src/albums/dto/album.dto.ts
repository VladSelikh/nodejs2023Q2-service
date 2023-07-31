import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { IsUUIDorNull } from '../../core/validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsUUIDorNull()
  artistId: string | null; // refers to Artist
}

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}
