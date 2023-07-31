import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { validate } from 'uuid';
import { ArtistService } from './artist.service';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import {
  ARTIST_NOT_FOUND,
  INVALID_BODY,
  NOT_VALID_UUID,
} from 'src/core/constants';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  public async findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  public async findById(@Param() params): Promise<Artist> {
    if (!validate(params.id)) {
      throw new HttpException(NOT_VALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const artist = this.artistService.findById(params.id);
    if (!artist) {
      throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    if (
      typeof createArtistDto.name !== 'string' ||
      typeof createArtistDto.grammy !== 'boolean'
    ) {
      throw new HttpException(INVALID_BODY, HttpStatus.BAD_REQUEST);
    }

    const newArtist = this.artistService.create(createArtistDto);
    return newArtist;
  }

  @Put(':id')
  async updateById(
    @Param() params,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    if (!validate(params.id)) {
      throw new HttpException(NOT_VALID_UUID, HttpStatus.BAD_REQUEST);
    }

    if (typeof updateArtistDto.grammy !== 'boolean') {
      throw new HttpException(INVALID_BODY, HttpStatus.BAD_REQUEST);
    }

    const artist = this.artistService.findById(params.id);
    if (!artist) {
      throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const newArtist = this.artistService.updateById(params.id, updateArtistDto);
    return newArtist;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteById(@Param() params) {
    if (!validate(params.id)) {
      throw new HttpException(NOT_VALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const artist = this.artistService.findById(params.id);
    if (!artist) {
      throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    this.artistService.deleteById(params.id);
    return;
  }
}
