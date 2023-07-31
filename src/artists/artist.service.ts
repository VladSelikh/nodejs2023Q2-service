import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { v4 as uuid4 } from 'uuid';
import { Artist } from './interfaces/artist.interface';
import { DBService } from '../db/db.service';

@Injectable()
export class ArtistService {
  constructor(private dbService: DBService) {}

  public async findAll(): Promise<Artist[]> {
    return this.dbService.getAllArtists();
  }

  public async findById(id: string): Promise<Artist> {
    return this.dbService.getArtistById(id);
  }

  public async create(artistDto: CreateArtistDto): Promise<Artist> {
    const { name, grammy } = artistDto;

    const newArtist = {
      id: uuid4(),
      name,
      grammy,
    };

    await this.dbService.createArtist(newArtist);
    return newArtist;
  }

  public async updateById(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.dbService.getArtistById(id);

    const updatedArtist = {
      ...artist,
      grammy: updateArtistDto.grammy,
    };

    await this.dbService.updateArtistById(id, updatedArtist);

    return updatedArtist;
  }

  public async deleteById(id: string) {
    await this.dbService.deleteArtistById(id);

    const albums = await this.dbService.getAllAlbums();
    for (const album of albums) {
      if (album.artistId === id) {
        await this.dbService.updateAlbumById(album.id, {
          ...album,
          artistId: null,
        });
      }
    }

    const tracks = await this.dbService.getAllTracks();
    for (const track of tracks) {
      if (track.artistId === id) {
        await this.dbService.updateTrackById(track.id, {
          ...track,
          artistId: null,
        });
      }
    }

    const favorites = await this.dbService.getFavoriteArtists();
    const isFav = favorites.includes(id);
    if (isFav) {
      this.dbService.removeArtistFromFavoritesById(id);
    }
  }
}
