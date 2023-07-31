import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Favorites } from './interfaces/favorites.interface';

@Injectable()
export class FavoritesService {
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  public findAll(): Favorites {
    return this.favorites;
  }

  public findTracks(): string[] {
    return this.favorites.tracks;
  }

  public findAlbums(): string[] {
    return this.favorites.albums;
  }

  public findArtists(): string[] {
    return this.favorites.artists;
  }

  public addTrackById(id: string): string {
    const track = this.favorites.tracks.find((trackId) => trackId === id);
    if (track) {
      return 'This track has already been added to favorites earlier!';
    }

    this.favorites.tracks.push(id);
    return 'Track successfully added to favorites.';
  }

  public removeTrackById(id: string) {
    const index = this.favorites.tracks.findIndex((trackId) => trackId === id);
    this.favorites.tracks.splice(index, 1);
  }

  public addArtistById(id: string) {
    const artist = this.favorites.artists.find((artistId) => artistId === id);
    if (artist) {
      return 'This artist has already been added to favorites earlier!';
    }

    this.favorites.artists.push(id);
    return 'Artist successfully added to favorites.';
  }

  public removeArtistById(id: string) {
    const index = this.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );
    this.favorites.artists.splice(index, 1);
  }

  public addAlbumById(id: string) {
    const album = this.favorites.albums.find((albumId) => albumId === id);
    if (album) {
      return 'This album has already been added to favorites earlier!';
    }

    this.favorites.albums.push(id);
    return 'Album successfully added to favorites.';
  }

  public removeAlbumById(id: string) {
    const index = this.favorites.tracks.findIndex((albumId) => albumId === id);
    this.favorites.albums.splice(index, 1);
  }
}
