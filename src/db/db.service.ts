import { Injectable } from '@nestjs/common';
import { Album } from '../albums/interfaces/album.interface';
import { Artist } from '../artists/interfaces/artist.interface';
import { Favorites } from '../favorites/interfaces/favorites.interface';
import { Track } from '../tracks/interfaces/track.interface';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class DBService {
  private readonly users: User[] = [];
  private readonly albums: Album[] = [];
  private readonly artists: Artist[] = [];
  private readonly tracks: Track[] = [];
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  public async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  public async getUserById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  public async createUser(newUser: User) {
    this.users.push(newUser);
  }

  public async updateUserById(id: string, updatedUser: User) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users[userIndex] = updatedUser;
  }

  public async deleteUserById(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users.splice(userIndex, 1);
  }

  public async getAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  public async getAlbumById(id: string): Promise<Album> {
    const album = this.albums.find((album) => album.id === id);
    return album;
  }

  public async createAlbum(newAlbum: Album) {
    this.albums.push(newAlbum);
  }

  public async updateAlbumById(id: string, updatedAlbum: Album) {
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums[index] = updatedAlbum;
  }

  public async deleteAlbumById(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(index, 1);
  }

  public async getAllArtists(): Promise<Artist[]> {
    return this.artists;
  }

  public async getArtistById(id: string): Promise<Artist> {
    const artist = this.artists.find((artist) => artist.id === id);
    return artist;
  }

  public async createArtist(newArtist: Artist) {
    this.artists.push(newArtist);
  }

  public async updateArtistById(id: string, updatedArtist: Artist) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists[index] = updatedArtist;
  }

  public async deleteArtistById(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(index, 1);
  }

  public async getAllTracks(): Promise<Track[]> {
    return this.tracks;
  }

  public async getTrackById(id: string): Promise<Track> {
    const track = this.tracks.find((track) => track.id === id);
    return track;
  }

  public async createTrack(newTrack: Track) {
    this.tracks.push(newTrack);
  }

  public async updateTrackById(id: string, updatedTrack: Track) {
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks[index] = updatedTrack;
  }

  public async deleteTrackById(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(index, 1);
  }

  public async getAllFavorites(): Promise<Favorites> {
    return this.favorites;
  }

  public async getFavoriteTracks(): Promise<string[]> {
    return this.favorites.tracks;
  }

  public async getFavoriteAlbums(): Promise<string[]> {
    return this.favorites.albums;
  }

  public async getFavoriteArtists(): Promise<string[]> {
    return this.favorites.artists;
  }

  public async addTrackToFavoritesById(id: string): Promise<string> {
    const track = this.favorites.tracks.find((trackId) => trackId === id);
    if (track) {
      return 'This track has already been added to favorites earlier!';
    }

    this.favorites.tracks.push(id);
    return 'Track successfully added to favorites!';
  }

  public async removeTrackFromFavoritesById(id: string) {
    const index = this.favorites.tracks.findIndex((trackId) => trackId === id);
    this.favorites.tracks.splice(index, 1);
  }

  public async addArtistToFavoritesById(id: string): Promise<string> {
    const artist = this.favorites.artists.find((artistId) => artistId === id);
    if (artist) {
      return 'This artist has already been added to favorites earlier!';
    }

    this.favorites.artists.push(id);
    return 'Artist successfully added to favorites!';
  }

  public async removeArtistFromFavoritesById(id: string) {
    const index = this.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );
    this.favorites.artists.splice(index, 1);
  }

  public async addAlbumToFavoritesById(id: string): Promise<string> {
    const album = this.favorites.albums.find((albumId) => albumId === id);
    if (album) {
      return 'This album has already been added to favorites earlier!';
    }

    this.favorites.albums.push(id);
    return 'Album successfully added to favorites!';
  }

  public async removeAlbumFromFavoritesById(id: string) {
    const index = this.favorites.tracks.findIndex((albumId) => albumId === id);
    this.favorites.albums.splice(index, 1);
  }
}
