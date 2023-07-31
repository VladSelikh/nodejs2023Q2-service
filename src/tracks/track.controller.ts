import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from '../albums/album.service';
import { ArtistService } from '../artists/artist.service';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';
import { Track } from './interfaces/track.interface';
import { TrackService } from './track.service';
import {
  ALBUM_NOT_FOUND,
  ARTIST_NOT_FOUND,
  TRACK_NOT_FOUND,
} from '../core/constants';

@Controller('track')
export class TrackController {
  constructor(
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  @Get()
  public async findAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  public async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Track> {
    const track = await this.trackService.findById(id);
    if (!track) {
      throw new HttpException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return track;
  }

  @Post()
  async create(
    @Body(ValidationPipe) createTrackDto: CreateTrackDto,
  ): Promise<Track> {
    if (createTrackDto.albumId) {
      const album = await this.albumService.findById(createTrackDto.albumId);
      if (!album) {
        throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    if (createTrackDto.artistId) {
      const artist = await this.artistService.findById(createTrackDto.artistId);
      if (!artist) {
        throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.trackService.findById(id);
    if (!track) {
      throw new HttpException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (updateTrackDto.albumId) {
      const album = await this.albumService.findById(updateTrackDto.albumId);
      if (!album) {
        throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    if (updateTrackDto.artistId) {
      const artist = await this.artistService.findById(updateTrackDto.artistId);
      if (!artist) {
        throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    return this.trackService.updateById(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.findById(id);
    if (!track) {
      throw new HttpException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    this.trackService.deleteById(id);
  }
}
