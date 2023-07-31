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
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { ArtistService } from './artist.service';
import { Artist } from './interfaces/artist.interface';
import { ARTIST_NOT_FOUND } from '../core/constants';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  public async findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  public async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Artist> {
    const artist = await this.artistService.findById(id);
    if (!artist) {
      throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  @Post()
  public async create(
    @Body(ValidationPipe) createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  public async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.artistService.findById(id);
    if (!artist) {
      throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.artistService.updateById(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistService.findById(id);
    if (!artist) {
      throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.artistService.deleteById(id);
  }
}
