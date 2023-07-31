import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Body, Delete, HttpCode, Post, Put } from '@nestjs/common/decorators';
import { ArtistService } from '../artists/artist.service';
import { AlbumService } from './album.service';
import { TrackService } from 'src/tracks/track.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { Album } from './interfaces/album.interface';
import { ALBUM_NOT_FOUND, ARTIST_NOT_FOUND } from '../core/constants';

@Controller('album')
export class AlbumController {
  constructor(
    private albumService: AlbumService,
    private artistService: ArtistService,
    private trackService: TrackService,
  ) {}

  @Get()
  public async findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    const album = this.albumService.findById(id);
    if (!album) {
      throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return album;
  }

  @Post()
  public async create(
    @Body(ValidationPipe) createAlbumDto: CreateAlbumDto,
  ): Promise<Album> {
    if (createAlbumDto.artistId) {
      const artist = this.artistService.findById(createAlbumDto.artistId);
      if (!artist) {
        throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  public async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    if (updateAlbumDto.artistId) {
      const artist = this.artistService.findById(updateAlbumDto.artistId);
      if (!artist) {
        throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    const album = this.albumService.findById(id);
    if (!album) {
      throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.albumService.updateById(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.findById(id);
    if (!album) {
      throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    this.albumService.deleteById(id);

    const tracks = this.trackService.findAll();
    tracks.forEach((track) => {
      if (track.albumId === id) {
        this.trackService.updateById(track.id, { albumId: null });
      }
    });
  }
}
