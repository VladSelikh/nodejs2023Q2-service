import {
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from '../albums/album.service';
import { ArtistService } from '../artists/artist.service';
import { TrackService } from '../tracks/track.service';
import { FavoritesResponse } from './dto/favorites.response.dto';
import { FavoritesService } from './favorites.service';
import {
  ALBUM_NOT_FOUND,
  ARTIST_NOT_FOUND,
  TRACK_NOT_FOUND,
} from 'src/core/constants';

@Controller('favs')
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService,
    private trackService: TrackService,
    private artistService: ArtistService,
    private albumService: AlbumService,
  ) {}

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    const favIds = this.favoritesService.findAll();

    const artists = favIds.artists.map((id) => this.artistService.findById(id));
    const albums = favIds.albums.map((id) => this.albumService.findById(id));
    const tracks = favIds.tracks.map((id) => this.trackService.findById(id));

    return {
      artists,
      albums,
      tracks,
    };
  }

  @Post('track/:id')
  async addTrackById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    const track = this.trackService.findById(id);
    if (!track) {
      throw new HttpException(TRACK_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return this.favoritesService.addTrackById(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const isFav = this.favoritesService.findTracks().includes(id);
    if (!isFav) {
      throw new HttpException(
        'Track with specified id is not in favorites!',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.favoritesService.removeTrackById(id);
  }

  @Post('album/:id')
  async addAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    const album = this.albumService.findById(id);
    if (!album) {
      throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return this.favoritesService.addAlbumById(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const isFav = this.favoritesService.findAlbums().includes(id);
    if (!isFav) {
      throw new HttpException(
        'Album with specified id is not in favorites!',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.favoritesService.removeAlbumById(id);
  }

  @Post('artist/:id')
  async addArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    const artist = this.artistService.findById(id);
    if (!artist) {
      throw new HttpException(
        ARTIST_NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.favoritesService.addArtistById(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const isFav = this.favoritesService.findArtists().includes(id);
    if (!isFav) {
      throw new HttpException(
        'Artist with specified id is not in favorites!',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.favoritesService.removeArtistById(id);
  }
}
