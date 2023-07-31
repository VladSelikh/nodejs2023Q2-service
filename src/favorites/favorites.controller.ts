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
import {
  FavoritesResponse,
  ModifyFavoritesResponse,
} from './dto/favorites.response.dto';
import { FavoritesService } from './favorites.service';
import {
  ALBUM_NOT_FOUND,
  ARTIST_NOT_FOUND,
  TRACK_NOT_FOUND,
} from '../core/constants';

@Controller('favs')
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService,
    private trackService: TrackService,
    private artistService: ArtistService,
    private albumService: AlbumService,
  ) {}

  @Get()
  public async findAll(): Promise<FavoritesResponse> {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  public async addTrackById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ModifyFavoritesResponse> {
    const track = await this.trackService.findById(id);
    if (!track) {
      throw new HttpException(TRACK_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return { message: await this.favoritesService.addTrackById(id) };
  }

  @Delete('track/:id')
  @HttpCode(204)
  public async removeTrackById(@Param('id', new ParseUUIDPipe()) id: string) {
    const isFav = (await this.favoritesService.findTracks()).includes(id);
    if (!isFav) {
      throw new HttpException(
        'Track with specified id is not in favorites!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.favoritesService.removeTrackById(id);
  }

  @Post('album/:id')
  public async addAlbumById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ModifyFavoritesResponse> {
    const album = await this.albumService.findById(id);
    if (!album) {
      throw new HttpException(ALBUM_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return { message: await this.favoritesService.addAlbumById(id) };
  }

  @Delete('album/:id')
  @HttpCode(204)
  public async removeAlbumById(@Param('id', new ParseUUIDPipe()) id: string) {
    const isFav = (await this.favoritesService.findAlbums()).includes(id);
    if (!isFav) {
      throw new HttpException(
        'Album with specified id is not in favorites!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.favoritesService.removeAlbumById(id);
  }

  @Post('artist/:id')
  public async addArtistById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ModifyFavoritesResponse> {
    const artist = await this.artistService.findById(id);
    if (!artist) {
      throw new HttpException(
        ARTIST_NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return { message: await this.favoritesService.addArtistById(id) };
  }

  @Delete('artist/:id')
  @HttpCode(204)
  public async removeArtistById(@Param('id', new ParseUUIDPipe()) id: string) {
    const isFav = (await this.favoritesService.findArtists()).includes(id);
    if (!isFav) {
      throw new HttpException(
        'Artist with specified id is not in favorites!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.favoritesService.removeArtistById(id);
  }
}
