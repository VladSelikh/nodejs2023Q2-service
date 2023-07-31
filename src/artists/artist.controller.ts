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
import { FavoritesService } from '../favorites/favorites.service';
import { AlbumService } from '../albums/album.service';
import { ArtistService } from './artist.service';
import { TrackService } from '../tracks/track.service';
import { Artist } from './interfaces/artist.interface';
import { ARTIST_NOT_FOUND } from '../core/constants';

@Controller('artist')
export class ArtistController {
  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
    private favoritesService: FavoritesService,
  ) {}

  @Get()
  public async findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  public async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Artist> {
    const artist = this.artistService.findById(id);
    if (!artist) {
      throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  @Post()
  async create(
    @Body(ValidationPipe) createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = this.artistService.findById(id);
    if (!artist) {
      throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.artistService.updateById(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.findById(id);
    if (!artist) {
      throw new HttpException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    this.artistService.deleteById(id);

    const albums = this.albumService.findAll();
    albums.forEach((album) => {
      if (album.artistId === id) {
        this.albumService.updateById(album.id, { artistId: null });
      }
    });

    const tracks = this.trackService.findAll();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        this.trackService.updateById(track.id, { artistId: null });
      }
    });

    const favorites = this.favoritesService.findArtists();
    const isFav = favorites.includes(id);
    if (isFav) {
      this.favoritesService.removeArtistById(id);
    }
  }
}
