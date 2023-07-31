import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Body, Delete, HttpCode, Post, Put } from '@nestjs/common/decorators';
import { ArtistService } from '../artists/artist.service';
import { validate } from 'uuid';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import {
  ALBUM_NOT_FOUND,
  ARTIST_NOT_FOUND,
  INVALID_BODY,
  NOT_VALID_UUID,
} from '../core/constants';

@Controller('album')
export class AlbumController {
  constructor(
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  @Get()
  public async findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  public async findOne(@Param() params): Promise<Album> {
    if (!validate(params.id)) {
      throw new HttpException(NOT_VALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const album = this.albumService.findById(params.id);
    if (!album) {
      throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return album;
  }

  @Post()
  public async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    if (
      typeof createAlbumDto.name !== 'string' ||
      typeof createAlbumDto.year !== 'number' ||
      (typeof createAlbumDto.artistId !== 'string' &&
        createAlbumDto.artistId !== null)
    ) {
      throw new HttpException(INVALID_BODY, HttpStatus.BAD_REQUEST);
    }

    if (createAlbumDto.artistId && !validate(createAlbumDto.artistId)) {
      throw new HttpException(NOT_VALID_UUID, HttpStatus.BAD_REQUEST);
    }

    if (createAlbumDto.artistId) {
      const artist = this.artistService.findById(createAlbumDto.artistId);
      if (!artist) {
        throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    const newAlbum = this.albumService.create(createAlbumDto);
    return newAlbum;
  }

  @Put(':id')
  public async updateById(
    @Param() params,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    if (!validate(params.id)) {
      throw new HttpException(NOT_VALID_UUID, HttpStatus.BAD_REQUEST);
    }

    if (updateAlbumDto.artistId && !validate(updateAlbumDto.artistId)) {
      throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    if (
      (updateAlbumDto.name && typeof updateAlbumDto.name !== 'string') ||
      (updateAlbumDto.year && typeof updateAlbumDto.year !== 'number') ||
      (Object.hasOwnProperty('artistId') &&
        typeof updateAlbumDto.artistId !== 'string' &&
        updateAlbumDto.artistId !== null)
    ) {
      throw new HttpException(INVALID_BODY, HttpStatus.BAD_REQUEST);
    }

    if (updateAlbumDto.artistId) {
      const artist = this.artistService.findById(updateAlbumDto.artistId);
      if (!artist) {
        throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    const album = this.albumService.findById(params.id);
    if (!album) {
      throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const updatedAlbum = this.albumService.updateById(
      params.id,
      updateAlbumDto,
    );
    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteById(@Param() params) {
    if (!validate(params.id)) {
      throw new HttpException(NOT_VALID_UUID, HttpStatus.BAD_REQUEST);
    }

    const album = this.albumService.findById(params.id);
    if (!album) {
      throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    this.albumService.deleteById(params.id);
    return;
  }
}
