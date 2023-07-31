import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DBService } from '../db/db.service';
import { FavoritesResponse } from './dto/favorites.response.dto';

@Injectable()
export class FavoritesService {
  constructor(private dbService: DBService) {}

  public async findAll(): Promise<FavoritesResponse> {
    const favIds = await this.dbService.getAllFavorites();
    const artists = await Promise.all(
      favIds.artists.map(async (id) => this.dbService.getArtistById(id)),
    );
    const albums = await Promise.all(
      favIds.albums.map((id) => this.dbService.getAlbumById(id)),
    );
    const tracks = await Promise.all(
      favIds.tracks.map((id) => this.dbService.getTrackById(id)),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  public async findTracks(): Promise<string[]> {
    return this.dbService.getFavoriteTracks();
  }

  public async findAlbums(): Promise<string[]> {
    return this.dbService.getFavoriteAlbums();
  }

  public async findArtists(): Promise<string[]> {
    return this.dbService.getFavoriteArtists();
  }

  public async addTrackById(id: string): Promise<string> {
    return this.dbService.addTrackToFavoritesById(id);
  }

  public async removeTrackById(id: string) {
    await this.dbService.removeTrackFromFavoritesById(id);
  }

  public async addArtistById(id: string): Promise<string> {
    return this.dbService.addArtistToFavoritesById(id);
  }

  public async removeArtistById(id: string) {
    await this.dbService.removeArtistFromFavoritesById(id);
  }

  public async addAlbumById(id: string): Promise<string> {
    return this.dbService.addAlbumToFavoritesById(id);
  }

  public async removeAlbumById(id: string) {
    await this.dbService.removeAlbumFromFavoritesById(id);
  }
}
