import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsUUIDorNull } from '../../core/validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsOptional()
  @IsUUIDorNull()
  artistId: string | null = null;
}

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}
